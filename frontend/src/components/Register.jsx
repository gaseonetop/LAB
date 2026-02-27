import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirm: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (form.password !== form.confirm) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    try {
      const { data } = await axios.post('/api/register', {
        username: form.username,
        email: form.email,
        password: form.password,
      });

      if (data.success) {
        setSuccess('Account created. Redirecting to login…');
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pl-root">
      <div className="pl-card">

        {/* LEFT PANEL — IDENTIK LOGIN */}
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
              Create your secure access to the offensive security laboratory.
            </p>
          </div>

          <div className="pl-version-tag">Secure Environment v4.2.0</div>
        </div>

        {/* RIGHT PANEL */}
        <div className="pl-right-panel">
          <div className="pl-form-wrap">

            <div className="pl-form-header">
              <h2 className="pl-form-title">Create Account</h2>
              <p className="pl-form-subtitle">
                Register to access the Pentest Laboratory.
              </p>
            </div>

            {error && <div className="alert-error pl-alert">{error}</div>}
            {success && <div className="alert-success pl-alert">{success}</div>}

            <form onSubmit={handleSubmit} className="pl-form">

              {/* Username */}
              <div className="pl-field">
                <label className="pl-label">Username</label>
                <div className="pl-input-wrap">
                  <span className="pl-input-icon">@</span>
                  <input
                    className="pl-input"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Choose a username"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="pl-field">
                <label className="pl-label">Email</label>
                <div className="pl-input-wrap">
                  <span className="pl-input-icon">✉️</span>
                  <input
                    className="pl-input"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="pl-field">
                <label className="pl-label">Password</label>
                <div className="pl-input-wrap">
                  <span className="pl-input-icon">🔒</span>
                  <input
                    className="pl-input pl-input-pw"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    className="pl-pw-toggle"
                    onClick={() => setShowPassword(v => !v)}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              {/* Confirm */}
              <div className="pl-field">
                <label className="pl-label">Confirm Password</label>
                <div className="pl-input-wrap">
                  <span className="pl-input-icon">🔒</span>
                  <input
                    className="pl-input"
                    type="password"
                    name="confirm"
                    value={form.confirm}
                    onChange={handleChange}
                    placeholder="Repeat your password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="pl-submit"
                disabled={loading}
              >
                {loading ? 'Creating account…' : 'Register'}
              </button>
            </form>

            <p className="pl-register-note">
              Already have an account?{' '}
              <Link to="/login" className="pl-register-link">Sign in</Link>
            </p>

          </div>

          {/* MOBILE BRAND */}
          <div className="pl-mobile-brand">
            <span className="pl-mobile-icon">🛡</span>
            <span className="pl-mobile-name">Pentest Lab</span>
            <span className="pl-mobile-version">Secure Environment v4.2.0</span>
          </div>
        </div>

      </div>
    </div>
  );
}