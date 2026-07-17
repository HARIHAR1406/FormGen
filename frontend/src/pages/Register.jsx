import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiZap } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import './Login.css';

const getStrength = (p) => {
  if (!p) return 0;
  let s = 0;
  if (p.length >= 6) s++;
  if (p.length >= 10) s++;
  if (/[A-Z]/.test(p)) s++;
  if (/[^a-zA-Z0-9]/.test(p)) s++;
  return s;
};

const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const strengthClass = ['', 'weak', 'fair', 'good', 'strong'];

const Register = () => {
  const { signUpWithEmail, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const strength = getStrength(form.password);

  const handleGoogleRegister = async () => {
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch {
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error('Please enter your full name'); return; }
    if (!form.email) { toast.error('Please enter your email'); return; }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    if (form.password !== form.confirm) { toast.error('Passwords do not match'); return; }
    if (!agreed) { toast.error('Please accept the terms and conditions'); return; }

    setLoading(true);
    try {
      await signUpWithEmail(form.name.trim(), form.email, form.password);
      navigate('/dashboard');
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      {/* Left Panel */}
      <div className="auth-left">
        <div className="auth-left-content">
          <Link to="/" className="auth-brand">
            <div className="auth-brand-icon"><FiZap size={22} /></div>
            <span>FormGen</span>
          </Link>
          <h1 className="auth-headline">Build your perfect document today</h1>
          <p className="auth-subline">Create a free account and start generating professional biodatas and resumes instantly.</p>
          <div className="auth-features">
            {['Free to get started', '20 premium templates', 'PDF download', 'Auto-save drafts'].map(f => (
              <div key={f} className="auth-feature-item">
                <span className="auth-feature-dot" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="auth-left-glow" />
      </div>

      {/* Right Panel */}
      <div className="auth-right">
        <motion.div
          className="auth-card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="auth-card-header">
            <h2>Create your account</h2>
            <p>Get started for free — no credit card required</p>
          </div>

          {/* Google */}
          <button className="btn-google" onClick={handleGoogleRegister} disabled={googleLoading}>
            <FcGoogle size={20} />
            {googleLoading ? 'Connecting...' : 'Continue with Google'}
          </button>

          <div className="auth-divider"><span>or register with email</span></div>

          <form onSubmit={handleRegister} className="auth-form">
            {/* Name */}
            <div className="auth-field">
              <label>Full Name</label>
              <div className="auth-input-wrap">
                <FiUser size={16} className="auth-input-icon" />
                <input
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  autoComplete="name"
                />
              </div>
            </div>

            {/* Email */}
            <div className="auth-field">
              <label>Email Address</label>
              <div className="auth-input-wrap">
                <FiMail size={16} className="auth-input-icon" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="auth-field">
              <label>Password</label>
              <div className="auth-input-wrap">
                <FiLock size={16} className="auth-input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  autoComplete="new-password"
                />
                <button type="button" className="auth-eye-btn" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
              {form.password && (
                <>
                  <div className="password-strength">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className={`strength-bar ${i <= strength ? strengthClass[strength] : ''}`} />
                    ))}
                  </div>
                  <span className={`strength-label ${strengthClass[strength]}`}>
                    {strengthLabel[strength]} password
                  </span>
                </>
              )}
            </div>

            {/* Confirm Password */}
            <div className="auth-field">
              <label>Confirm Password</label>
              <div className="auth-input-wrap">
                <FiLock size={16} className="auth-input-icon" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Repeat your password"
                  value={form.confirm}
                  onChange={e => setForm({ ...form, confirm: e.target.value })}
                  autoComplete="new-password"
                  style={{ borderColor: form.confirm && form.confirm !== form.password ? 'var(--error)' : '' }}
                />
                <button type="button" className="auth-eye-btn" onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
              {form.confirm && form.confirm !== form.password && (
                <span className="strength-label weak">Passwords do not match</span>
              )}
            </div>

            {/* Terms */}
            <label className="auth-terms">
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
              <span>
                I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>
              </span>
            </label>

            <button type="submit" className="btn-auth-primary" disabled={loading}>
              {loading ? 'Creating account...' : <><span>Create Account</span><FiArrowRight size={16} /></>}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
