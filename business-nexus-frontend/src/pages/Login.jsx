import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService'; // ✅ API call
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, role } = formData;

    if (!email || !password || !role) {
      setError('All fields are required');
      return;
    }

    try {
      setError('');
      console.log('🔐 Logging in with:', { email, password });

      // ✅ Call backend
      const data = await login({ email, password });

      // ✅ Check user role
      if (data.user.role !== role) {
        setError('Selected role does not match registered user.');
        return;
      }

      // ✅ Redirect
      if (data.user.role === 'Investor') {
        navigate('/dashboard/investor');
      } else {
        navigate('/dashboard/entrepreneur');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Login to Business Nexus</h2>
        {error && <p className="login-error">{error}</p>}

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Login as...</option>
            <option value="Investor">Investor</option>
            <option value="Entrepreneur">Entrepreneur</option>
          </select>

          <button type="submit">Login</button>
        </form>

        <p className="login-footer">
          Don’t have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
