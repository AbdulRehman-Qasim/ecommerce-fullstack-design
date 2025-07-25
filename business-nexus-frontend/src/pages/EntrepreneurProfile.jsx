import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import axios from 'axios';
import './EntrepreneurProfile.css';

const dummyEntrepreneurs = [
  { id: '1', name: 'Sara Ahmed', domain: 'E-commerce', email: 'sara@startup.com', pitch: 'Scaling small businesses via e-commerce logistics.', joined: '2023-06-10' },
  { id: '2', name: 'Usman Tariq', domain: 'EdTech', email: 'usman@edlearn.com', pitch: 'Empowering students through personalized learning AI.', joined: '2023-05-14' },
  { id: '3', name: 'Zara Rehman', domain: 'FinTech', email: 'zara@finboost.com', pitch: 'Making digital banking more accessible for youth.', joined: '2023-07-01' },
  { id: '4', name: 'Bilal Qureshi', domain: 'AgriTech', email: 'bilal@agriplus.com', pitch: 'Smart irrigation for small farms in Punjab.', joined: '2024-01-15' },
  { id: '5', name: 'Hira Nadeem', domain: 'MedTech', email: 'hira@medpulse.com', pitch: 'Affordable telemedicine solutions for rural areas.', joined: '2024-02-22' },
  { id: '6', name: 'Tariq Saeed', domain: 'Logistics', email: 'tariq@fastcargo.com', pitch: 'Next-gen delivery systems using drones.', joined: '2024-03-18' },
];

const EntrepreneurProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // May be undefined
  const { user } = useAuth();
  const avatar = '/assets/avatar.png';

  const isOwnProfile = !id || id === user?.id;

  const selectedEntrepreneur = id
    ? dummyEntrepreneurs.find(ent => ent.id === id)
    : null;

  const defaultEntrepreneur = {
    name: user?.name || 'Entrepreneur',
    email: user?.email || '',
    domain: user?.domain || '',
    pitch: user?.pitch || '',
    joined: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently',
  };

  const entrepreneur = selectedEntrepreneur || defaultEntrepreneur;

  const [formData, setFormData] = useState({
    name: entrepreneur.name,
    email: entrepreneur.email,
    domain: entrepreneur.domain,
    pitch: entrepreneur.pitch,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/profile/update', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile.');
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="entrepreneur-profile-page">
      <div className="entrepreneur-profile-card">
        <img className="profile-avatar" src={avatar} alt="Profile" />
        <h2 className="profile-name">
          {isOwnProfile ? (
            <input name="name" value={formData.name} onChange={handleChange} />
          ) : (
            entrepreneur.name
          )}
        </h2>
        <p className="profile-role">
          Domain:{' '}
          {isOwnProfile ? (
            <input name="domain" value={formData.domain} onChange={handleChange} />
          ) : (
            entrepreneur.domain
          )}
        </p>
        <p className="profile-email">
          Email:{' '}
          {isOwnProfile ? (
            <input name="email" value={formData.email} onChange={handleChange} />
          ) : (
            entrepreneur.email
          )}
        </p>
        <p className="profile-joined">Joined: {entrepreneur.joined}</p>

        <div className="profile-pitch">
          <strong>Pitch:</strong>
          {isOwnProfile ? (
            <textarea name="pitch" value={formData.pitch} onChange={handleChange} />
          ) : (
            <p>{entrepreneur.pitch}</p>
          )}
        </div>

        <div className="profile-buttons">
          {isOwnProfile ? (
            <button className="btn-primary" onClick={handleSave}>Save Changes</button>
          ) : (
            <button className="btn-primary" disabled>Read-Only View</button>
          )}
          <button className="btn-secondary" onClick={goBack}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default EntrepreneurProfile;
