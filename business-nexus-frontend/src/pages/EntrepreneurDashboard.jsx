import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './EntrepreneurDashboard.css';

const EntrepreneurDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const stats = {
    postedIdeas: 3,
    interestedInvestors: 7,
    pendingResponses: 2,
  };

  const investorRequests = [
    {
      id: '101',
      name: 'Ali Khan',
      domain: 'FinTech',
      message: 'I’m interested in discussing a seed round.',
    },
    {
      id: '102',
      name: 'Hamza Sheikh',
      domain: 'HealthTech',
      message: 'Can we set up a meeting for investment options?',
    },
    {
      id: '103',
      name: 'Fatima Qureshi',
      domain: 'Clean Energy',
      message: 'Excited to collaborate on sustainable tech.',
    },
    {
      id: '104',
      name: 'Junaid Akhtar',
      domain: 'EdTech',
      message: 'Looking for your pitch deck!',
    },
    {
      id: '105',
      name: 'Nida Rehman',
      domain: 'AgriTech',
      message: 'Interested in funding precision farming solutions.',
    },
  ];

  return (
    <div className="entrepreneur-dashboard-page">
      <h1 className="dashboard-title">
        Welcome, {user?.name || 'Entrepreneur'} 🚀
      </h1>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Posted Ideas</h3>
          <p>{stats.postedIdeas}</p>
        </div>
        <div className="stat-card">
          <h3>Interested Investors</h3>
          <p>{stats.interestedInvestors}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Responses</h3>
          <p>{stats.pendingResponses}</p>
        </div>
      </div>

      <div className="requests-section">
        <h2>Investor Requests</h2>
        <div className="request-list">
          {investorRequests.map((inv) => (
            <div key={inv.id} className="request-card">
              <h3>{inv.name}</h3>
              <p><strong>Domain:</strong> {inv.domain}</p>
              <p><strong>Message:</strong> {inv.message}</p>
              <div className="card-buttons">
                <button
                  onClick={() => navigate(`/profile/investor/${inv.id}`)}
                >
                  View Investor
                </button>
                <button className="secondary">Respond</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EntrepreneurDashboard;
