import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiZap } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import './Login.css';

const Login = () => {
  const { signInWithGoogle, signInWithEmail, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch {
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Please fill in all fields'); return; }
    setLoading(true);
    try {
      await signInWithEmail(email, password);
      navigate('/dashboard');
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) { toast.error('Enter your email address first'); return; }
    setLoading(true);
    try {
      await resetPassword(email);
      setForgotMode(false);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      {/* Left Panel — Branding */}
      <div className="auth-left">
        <div className="auth-left-content">
          <Link to="/" className="auth-brand">
            <div className="auth-brand-icon"><FiZap size={22} /></div>
            <span>FormGen</span>
          </Link>
          <h1 className="auth-headline">Create stunning documents in minutes</h1>
          <p className="auth-subline">Join thousands of users building beautiful biodatas and professional resumes.</p>
          <div className="auth-features">
            {['6 premium templates', 'Live preview editor', 'PDF export', 'Cloud sync'].map(f => (
              <div key={f} className="auth-feature-item">
                <span className="auth-feature-dot" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="auth-left-glow" />
      </div>

      {/* Right Panel — Form */}
      <div className="auth-right">
        <motion.div
          className="auth-card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="auth-card-header">
            <h2>{forgotMode ? 'Reset Password' : 'Welcome back'}</h2>
            <p>{forgotMode ? 'Enter your email to receive a reset link' : 'Sign in to your account'}</p>
          </div>

          {!forgotMode ? (
            <>
              {/* Google Button */}
              <button
                className="btn-google"
                onClick={handleGoogleLogin}
                disabled={googleLoading}
              >
                <FcGoogle size={20} />
                {googleLoading ? 'Signing in...' : 'Continue with Google'}
              </button>

              <div className="auth-divider"><span>or sign in with email</span></div>

              {/* Email Form */}
              <form onSubmit={handleEmailLogin} className="auth-form">
                <div className="auth-field">
                  <label>Email Address</label>
                  <div className="auth-input-wrap">
                    <FiMail size={16} className="auth-input-icon" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="auth-field">
                  <div className="auth-field-row">
                    <label>Password</label>
                    <button type="button" className="auth-link-btn" onClick={() => setForgotMode(true)}>
                      Forgot password?
                    </button>
                  </div>
                  <div className="auth-input-wrap">
                    <FiLock size={16} className="auth-input-icon" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      autoComplete="current-password"
                    />
                    <button type="button" className="auth-eye-btn" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn-auth-primary" disabled={loading}>
                  {loading ? 'Signing in...' : <><span>Sign In</span><FiArrowRight size={16} /></>}
                </button>
              </form>

              <p className="auth-switch">
                Don't have an account? <Link to="/register">Create one free</Link>
              </p>
            </>
          ) : (
            <form onSubmit={handleForgotPassword} className="auth-form">
              <div className="auth-field">
                <label>Email Address</label>
                <div className="auth-input-wrap">
                  <FiMail size={16} className="auth-input-icon" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit" className="btn-auth-primary" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
              <button type="button" className="auth-link-btn" style={{marginTop: '0.5rem'}} onClick={() => setForgotMode(false)}>
                ← Back to Sign In
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
