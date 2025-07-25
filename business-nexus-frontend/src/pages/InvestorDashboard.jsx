import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './InvestorDashboard.css';

const InvestorDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const stats = {
    totalInvestments: 5,
    entrepreneursFollowed: 12,
    pendingRequests: 2,
  };

  const suggestedEntrepreneurs = [
    { id: 1, name: 'Sara Ahmed', field: 'E-commerce', location: 'Lahore' },
    { id: 2, name: 'Usman Tariq', field: 'EdTech', location: 'Karachi' },
    { id: 3, name: 'Zara Rehman', field: 'FinTech', location: 'Islamabad' },
    { id: 4, name: 'Bilal Qureshi', field: 'AgriTech', location: 'Faisalabad' },
    { id: 5, name: 'Hira Nadeem', field: 'MedTech', location: 'Peshawar' },
    { id: 6, name: 'Amna Yousaf', field: 'AI', location: 'Multan' },
    { id: 7, name: 'Tariq Saeed', field: 'Logistics', location: 'Hyderabad' },
    { id: 8, name: 'Farah Zahra', field: 'FashionTech', location: 'Rawalpindi' },
  ];

  return (
    <div className="investor-dashboard-page">
      <h1 className="dashboard-title">Welcome, {user?.name || 'Investor'} 👋</h1>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Investments</h3>
          <p>{stats.totalInvestments}</p>
        </div>
        <div className="stat-card">
          <h3>Entrepreneurs Followed</h3>
          <p>{stats.entrepreneursFollowed}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Requests</h3>
          <p>{stats.pendingRequests}</p>
        </div>
      </div>

      <div className="suggested-section">
        <h2>Suggested Entrepreneurs</h2>
        <div className="entrepreneur-list">
          {suggestedEntrepreneurs.map((ent) => (
            <div key={ent.id} className="entrepreneur-card">
              <h3>{ent.name}</h3>
              <p><strong>Field:</strong> {ent.field}</p>
              <p><strong>Location:</strong> {ent.location}</p>
              <div className="card-buttons">
                <button onClick={() => navigate(`/profile/entrepreneur/${ent.id}`)}>
                  View Profile
                </button>
                <button className="secondary">Send Request</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;
