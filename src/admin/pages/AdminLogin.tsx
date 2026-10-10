import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, ArrowRight } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminLogin: React.FC = () => {
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@royaltouch.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.error || 'Incorrect email or password. Please try again.');
    }
  };

  return (
    <div className="admin-login-page">
      {/* Background pattern */}
      <div className="admin-login-bg" aria-hidden="true" />

      <div className="admin-login-card">
        {/* Logo */}
        <div className="admin-login-logo">
          <img src="/logo.png" alt="Royal Touch Logo" />
          <div>
            <p className="admin-login-brand">Royal Touch</p>
            <p className="admin-login-brand-sub">Interior &amp; Architect</p>
          </div>
        </div>

        <div className="admin-login-divider" />

        <div className="admin-login-header">
          <div className="admin-login-lock-icon">
            <Lock size={20} />
          </div>
          <h1 className="admin-login-title">Admin Dashboard</h1>
          <p className="admin-login-subtitle">Enter your credentials to access the admin panel</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form" noValidate>
          <div className="admin-field">
            <label htmlFor="admin-email" className="admin-field-label">
              Email Address
            </label>
            <div className="admin-field-input-wrap">
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@royaltouch.com"
                className={`admin-field-input ${error ? 'admin-field-input--error' : ''}`}
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="admin-field">
            <label htmlFor="admin-password" className="admin-field-label">
              Password
            </label>
            <div className="admin-field-password">
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className={`admin-field-input ${error ? 'admin-field-input--error' : ''}`}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="admin-field-eye"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && <p className="admin-field-error">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading || !password || !email}
            className="admin-login-btn"
            id="admin-login-btn"
          >
            {loading ? (
              <span className="admin-login-spinner" />
            ) : (
              <>
                <span>Access Dashboard</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <p className="admin-login-hint">
          Default development credentials:<br />
          <code>admin@royaltouch.com</code> / <code>ChangeMe@123!</code>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
