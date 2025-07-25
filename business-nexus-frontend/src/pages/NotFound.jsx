import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="notfound-page">
      <div className="notfound-card">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-subtitle">Oops! Page not found.</p>
        <p className="notfound-text">The page you are looking for doesn't exist or has been moved.</p>
        <button className="notfound-button" onClick={goHome}>
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
