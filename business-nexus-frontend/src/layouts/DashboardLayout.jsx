import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;
  const role = currentPath.includes('investor') ? 'Investor' : 'Entrepreneur';

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Business Nexus</h2>
        </div>
        <nav className="sidebar-nav">
          <button onClick={() => navigate(`/dashboard/${role.toLowerCase()}`)}>
            Dashboard
          </button>
          <button onClick={() => navigate(`/profile/${role.toLowerCase()}/123`)}>
            Profile
          </button>
          <button onClick={() => navigate(`/chat/456`)}>
            Chat
          </button>
          <button className="logout-btn" onClick={() => navigate('/')}>
            Logout
          </button>
        </nav>
      </aside>

      {/* Main content area */}
      <div className="dashboard-main">
        {/* Topbar */}
        <header className="dashboard-navbar">
          <p>Logged in as <strong>{role}</strong></p>
        </header>

        {/* Dynamic route content */}
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
