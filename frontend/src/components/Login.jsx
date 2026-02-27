import { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';

export default function Login() {
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirectUrl = searchParams.get('redirect');

  const [form, setForm] = useState({ username: '', password: '', remember: false });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await axios.post('/api/login', form);

      if (data.success) {
        login(data.token, data.user);

        if (redirectUrl) {
          window.location.href = redirectUrl;
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pl-root">
      {/* Dark/Light mode toggle */}
      <button
        className="pl-theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

      <div className="pl-card">
        {/* Left panel */}
        <div className="pl-left-panel">
          <div className="pl-grid-bg" />
          <div className="pl-gradient-overlay" />

          <div className="pl-left-content">
            <div className="pl-icon-box">
              <span className="pl-shield-icon">🛡</span>
            </div>
            <h1 className="pl-brand">
              Pentest <span className="pl-brand-accent">Lab</span>
            </h1>
            <p className="pl-tagline">
              The elite platform for ethical hackers and IT security experts to sharpen their skills.
            </p>

            <div className="pl-status-list">
              <div className="pl-status-item">
                <span className="pl-dot pl-dot-green" />
                <span className="pl-status-text">Systems Online</span>
              </div>
              <div className="pl-status-item">
                <span className="pl-dot pl-dot-blue pl-dot-pulse" />
                <span className="pl-status-text">Encrypted Session</span>
              </div>
            </div>
          </div>

          <div className="pl-version-tag">Secure Environment v4.2.0</div>
        </div>

        {/* Right panel */}
        <div className="pl-right-panel">
          <div className="pl-form-wrap">
            <div className="pl-form-header">
              <h2 className="pl-form-title">Welcome Back</h2>
              <p className="pl-form-subtitle">Enter your credentials to access the terminal.</p>
            </div>

            {error && <div className="alert-error pl-alert">{error}</div>}

            <form onSubmit={handleSubmit} className="pl-form">
              {/* Username */}
              <div className="pl-field">
                <label className="pl-label" htmlFor="username">Username</label>
                <div className="pl-input-wrap">
                  <span className="pl-input-icon">@</span>
                  <input
                    id="username"
                    className="pl-input"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="pl-field">
                <div className="pl-label-row">
                  <label className="pl-label" htmlFor="password">Password</label>
                  <a href="#" className="pl-forgot">Forgot Password?</a>
                </div>
                <div className="pl-input-wrap">
                  <span className="pl-input-icon">🔒</span>
                  <input
                    id="password"
                    className="pl-input pl-input-pw"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="pl-pw-toggle"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="pl-check-row">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                  className="pl-checkbox"
                />
                <label htmlFor="remember" className="pl-check-label">
                  Keep my session active
                </label>
              </div>

              <button
                type="submit"
                className="pl-submit"
                disabled={loading}
              >
                {loading ? 'Signing in…' : 'Sign In to Laboratory'}
              </button>
            </form>

            <p className="pl-register-note">
              Not a member yet?{' '}
              <Link to="/register" className="pl-register-link">Register here</Link>
            </p>
          </div>

          {/* Mobile brand (shown only on small screens) */}
          <div className="pl-mobile-brand">
            <span className="pl-mobile-icon">🛡</span>
            <span className="pl-mobile-name">Pentest Lab</span>
            <span className="pl-mobile-version">Secure Terminal v4.2.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
