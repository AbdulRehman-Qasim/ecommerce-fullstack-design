import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Simple role detection based on URL
  const role = location.pathname.includes('investor') ? 'Investor' : 'Entrepreneur';

  return (
    <header className="main-navbar">
      <div className="navbar-left">
        <h1 className="navbar-logo">Business Nexus</h1>
      </div>

      <div className="navbar-center">
        <p className="navbar-role">Logged in as <strong>{role}</strong></p>
      </div>

      <div className="navbar-right">
        <button onClick={() => navigate(`/profile/${role.toLowerCase()}/123`)}>Profile</button>
        <button onClick={() => navigate('/chat/456')}>Chat</button>
        <button className="logout" onClick={() => navigate('/')}>Logout</button>
      </div>
    </header>
  );
};

export default Navbar;
