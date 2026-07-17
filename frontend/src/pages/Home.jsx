import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import {
  FiZap, FiFileText, FiDownload, FiEdit, FiHeart, FiStar,
  FiArrowRight, FiCheck, FiUsers, FiTrendingUp, FiShield
} from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';
import './Home.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' }
  }),
};

const features = [
  {
    icon: FiEdit,
    title: 'Smart Form Builder',
    desc: 'Intuitive multi-step forms that guide you through every section with smart suggestions.',
    color: '#7C3AED',
  },
  {
    icon: FiStar,
    title: 'AI ATS Checker',
    desc: 'Match your resume against Job Descriptions to get a real-time ATS score and keyword gap analysis.',
    color: '#06B6D4',
  },
  {
    icon: FiUsers,
    title: 'AI Interview Coach',
    desc: 'Generate tailored technical and behavioral interview questions based strictly on your resume.',
    color: '#F59E0B',
  },
  {
    icon: FiFileText,
    title: 'Premium Templates',
    desc: 'Choose from dozens of professionally designed templates. Our AI can even recommend the best one for your profile!',
    color: '#10B981',
  },
  {
    icon: FiEdit,
    title: 'Live Preview Builder',
    desc: 'See your document update in real-time as you type — no more back-and-forth.',
    color: '#EF4444',
  },
  {
    icon: FiDownload,
    title: 'Multiple Export Options',
    desc: 'Export your finished document in high-quality PDF, Word (DOCX), PNG, or JPEG formats instantly.',
    color: '#8B5CF6',
  },
];

const steps = [
  {
    num: '01',
    title: 'Choose Document Type',
    desc: 'Select between Marriage Biodata or Professional Resume to get started.',
  },
  {
    num: '02',
    title: 'Fill in Your Details',
    desc: 'Complete our guided multi-step form — personal info, education, experience, and more.',
  },
  {
    num: '03',
    title: 'Leverage AI Tools',
    desc: 'Check your ATS score, get template recommendations, and prep for interviews using our built-in AI suite.',
  },
  {
    num: '04',
    title: 'Export & Share',
    desc: 'Download your polished document in PDF, DOCX, or Image formats, or share a live web link directly.',
  },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'HR Manager',
    text: 'The resume builder is incredibly intuitive. My resume looked completely professional in under 10 minutes!',
    avatar: 'PS',
    rating: 5,
  },
  {
    name: 'Rahul & Anjali',
    role: 'Newly Wed Couple',
    text: 'We used the Biodata template for our marriage profile. The Classic Floral design was absolutely beautiful!',
    avatar: 'RA',
    rating: 5,
  },
  {
    name: 'Vikram Nair',
    role: 'Software Engineer',
    text: 'Clean, fast, and professional. The live preview feature alone is worth it. Highly recommended!',
    avatar: 'VN',
    rating: 5,
  },
];

const stats = [
  { label: 'Documents Created', value: '100,000+', icon: FiFileText },
  { label: 'Happy Users', value: '25,000+', icon: FiUsers },
  { label: 'Pro Templates', value: '20+', icon: FiStar },
  { label: 'AI Scans Today', value: '1,500+', icon: FiTrendingUp },
];

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <Navbar />

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-bg">
          <div className="glow-orb glow-orb-primary" style={{ top: '-100px', left: '-100px' }} />
          <div className="glow-orb glow-orb-secondary" style={{ bottom: '0', right: '-100px' }} />
          <div className="hero-grid-overlay" />
        </div>

        <div className="container hero-container">
          <motion.div
            className="hero-badge"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <HiOutlineSparkles size={14} />
            AI-Powered Document Builder — 100% Free
          </motion.div>

          <motion.h1
            className="heading-xl hero-title"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            Create Stunning{' '}
            <span className="text-gradient">AI Resumes & Biodatas</span>{' '}
            in Minutes
          </motion.h1>

          <motion.p
            className="hero-desc"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            Generate professional documents instantly with our intuitive builder, beautiful templates, check your ATS score, and prep for interviews—all in one place!
          </motion.p>

          <motion.div
            className="hero-actions"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <Link to={user ? '/create' : '/login'} className="btn btn-primary btn-lg hero-cta">
              <FiZap size={18} />
              {user ? 'Create Document' : 'Get Started Free'}
              <FiArrowRight size={16} />
            </Link>
            <Link to="/templates" className="btn btn-secondary btn-lg">
              Browse Templates
            </Link>
          </motion.div>

          <motion.div
            className="hero-pills"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
          >
            {['ATS Match Checker', 'AI Interview Coach', 'Live Preview', '20+ Templates'].map(pill => (
              <div key={pill} className="hero-pill">
                <FiCheck size={13} />
                {pill}
              </div>
            ))}
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            className="stats-bar"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={5}
          >
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="stat-item">
                <div className="stat-icon"><Icon size={20} /></div>
                <div>
                  <p className="stat-value">{value}</p>
                  <p className="stat-label">{label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <div className="scroll-dot" />
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="section features-section">
        <div className="container">
          <motion.div
            className="text-center section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label">
              <FiStar size={13} />
              Powerful Features
            </div>
            <h2 className="heading-lg">Everything You Need to Create</h2>
            <p className="section-desc">
              A complete toolkit for building professional documents that get noticed.
            </p>
          </motion.div>

          <div className="features-grid">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="feature-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div
                  className="feature-icon-wrap"
                  style={{ background: `${feature.color}18`, border: `1px solid ${feature.color}30` }}
                >
                  <feature.icon size={24} style={{ color: feature.color }} />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section how-section">
        <div className="container">
          <motion.div
            className="text-center section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label">
              <FiZap size={13} />
              How It Works
            </div>
            <h2 className="heading-lg">Four Simple Steps</h2>
            <p className="section-desc">
              From blank slate to polished PDF in just minutes.
            </p>
          </motion.div>

          <div className="steps-grid">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                className="step-card"
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="step-num">{step.num}</div>
                <div className="step-connector" />
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DOCUMENT TYPES */}
      <section className="section doc-types-section">
        <div className="container">
          <motion.div
            className="text-center section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label">
              <FiFileText size={13} />
              Document Types
            </div>
            <h2 className="heading-lg">What Will You Create?</h2>
          </motion.div>

          <div className="doc-types-grid">
            {/* Biodata Card */}
            <motion.div
              className="doc-type-card biodata-card"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -8 }}
            >
              <div className="doc-type-emoji">💍</div>
              <h3>Marriage Biodata</h3>
              <p>Create a beautiful, traditional marriage profile with all personal, family, and preference details.</p>
              <ul className="doc-features-list">
                {['Personal & Family Info', 'Education & Career', 'Partner Preferences', 'Photo Upload', '10+ Classic Templates'].map(f => (
                  <li key={f}><FiCheck size={14} /> {f}</li>
                ))}
              </ul>
              <Link to={user ? '/create/biodata' : '/login'} className="btn btn-primary w-full">
                Create Biodata <FiArrowRight size={15} />
              </Link>
            </motion.div>

            {/* Resume Card */}
            <motion.div
              className="doc-type-card resume-card"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className="doc-type-emoji">💼</div>
              <h3>Professional Resume</h3>
              <p>Build an ATS-friendly, visually stunning resume that gets you interviews and impresses hiring managers.</p>
              <ul className="doc-features-list">
                {['Experience & Education', 'Skills & Projects', 'ATS Job Match Checker', 'AI Interview Coach Simulator', '10+ Modern Templates'].map(f => (
                  <li key={f}><FiCheck size={14} /> {f}</li>
                ))}
              </ul>
              <Link to={user ? '/create/resume' : '/login'} className="btn btn-primary w-full">
                Build Resume <FiArrowRight size={15} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section testimonials-section">
        <div className="container">
          <motion.div
            className="text-center section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label">
              <FiHeart size={13} />
              Testimonials
            </div>
            <h2 className="heading-lg">Loved by Thousands</h2>
          </motion.div>

          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                className="testimonial-card card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="testimonial-stars">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <FiStar key={i} size={14} fill="currentColor" style={{ color: '#F59E0B' }} />
                  ))}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="avatar avatar-md">{t.avatar}</div>
                  <div>
                    <p className="testimonial-name">{t.name}</p>
                    <p className="testimonial-role">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="cta-glow" />
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-lg cta-title">
              Ready to Create Your{' '}
              <span className="text-gradient">Perfect Document?</span>
            </h2>
            <p className="cta-desc">
              Join thousands of users who've created professional documents in minutes.
            </p>
            <Link to={user ? '/create' : '/login'} className="btn btn-primary btn-lg">
              <FiZap size={18} />
              {user ? 'Go to Dashboard' : 'Start for Free'}
              <FiArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
