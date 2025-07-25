import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import axios from 'axios';
import './InvestorProfile.css';

const dummyInvestors = [
  {
    id: '101',
    name: 'Ali Khan',
    email: 'ali.khan@example.com',
    role: 'Investor',
    joined: 'March 5, 2024',
  },
  {
    id: '102',
    name: 'Hamza Sheikh',
    email: 'hamza.sheikh@example.com',
    role: 'Investor',
    joined: 'April 2, 2024',
  },
  {
    id: '103',
    name: 'Fatima Qureshi',
    email: 'fatima.q@example.com',
    role: 'Investor',
    joined: 'May 10, 2024',
  },
  {
    id: '104',
    name: 'Junaid Akhtar',
    email: 'junaid.akhtar@example.com',
    role: 'Investor',
    joined: 'June 15, 2024',
  },
];

const InvestorProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const avatar = '/assets/avatar.png';

  const isOwnProfile = !id || id === user?.id;

  const selectedInvestor = id
    ? dummyInvestors.find((inv) => inv.id === id)
    : null;

  const defaultInvestor = {
    name: user?.name || 'Investor',
    email: user?.email || '',
    role: user?.role || 'Investor',
    domain: user?.domain || '',
    joined: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently',
  };

  const investor = selectedInvestor || defaultInvestor;

  const [formData, setFormData] = useState({
    name: investor.name,
    email: investor.email,
    domain: investor.domain || '',
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

  const goBack = () => navigate(-1);

  return (
    <div className="investor-profile-page">
      <div className="investor-profile-card">
        <img className="profile-avatar" src={avatar} alt="Avatar" />
        <h2 className="profile-name">
          {isOwnProfile ? (
            <input name="name" value={formData.name} onChange={handleChange} />
          ) : (
            investor.name
          )}
        </h2>
        <p className="profile-role">Role: {investor.role}</p>
        <p className="profile-email">
          Email:{' '}
          {isOwnProfile ? (
            <input name="email" value={formData.email} onChange={handleChange} />
          ) : (
            investor.email
          )}
        </p>
        {isOwnProfile && (
          <p className="profile-domain">
            Domain:{' '}
            <input
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              placeholder="Investment Domain"
            />
          </p>
        )}
        <p className="profile-joined">Joined: {investor.joined}</p>

        <div className="profile-buttons">
          {isOwnProfile ? (
            <button className="btn-primary" onClick={handleSave}>
              Save Changes
            </button>
          ) : (
            <button className="btn-primary" disabled>
              Read-Only View
            </button>
          )}
          <button className="btn-secondary" onClick={goBack}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestorProfile;
