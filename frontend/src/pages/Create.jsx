import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { createProject, logActivity } from '../services/firestore';
import useFormStore from '../store/useFormStore';
import Sidebar from '../components/layout/Sidebar';
import { FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';
import './Create.css';

const Create = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { setDocType, resetForm } = useFormStore();
  const [loading, setLoading] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleCreate = async (type) => {
    setLoading(type);
    resetForm();
    setDocType(type);
    try {
      const projectId = await createProject(user.uid, {
        type,
        title: type === 'biodata' ? 'My Biodata' : 'My Resume',
        formData: {},
        templateId: type === 'biodata' ? 'classic-floral' : 'modern-two-column',
        customization: {
          fontFamily: 'Inter',
          fontSize: '14',
          primaryColor: '#7C3AED',
          bgColor: '#FFFFFF',
          textColor: '#1A1A2E',
        },
      });
      await logActivity(user.uid, 'created', projectId);
      navigate(`/editor/${projectId}`);
    } catch (err) {
      toast.error('Failed to create document');
      setLoading(null);
    }
  };

  const docTypes = [
    {
      type: 'biodata',
      emoji: '💍',
      title: 'Marriage Biodata',
      subtitle: 'Traditional Indian Format',
      desc: 'Create a comprehensive marriage profile with personal, family, educational, career, and partner preference details.',
      features: [
        'Personal & Family Information',
        'Educational & Career Details',
        'Religious & Lifestyle Info',
        'Partner Preferences',
        'Profile Photo Upload',
        '10+ Classic Templates',
      ],
      gradient: 'linear-gradient(135deg, #7C3AED, #C026D3)',
      badgeColor: 'rgba(124,58,237,0.15)',
      badgeText: '#7C3AED',
    },
    {
      type: 'resume',
      emoji: '💼',
      title: 'Professional Resume',
      subtitle: 'Modern ATS-Friendly Format',
      desc: 'Build a stunning, recruiter-ready resume with experience, skills, projects, certifications, and more.',
      features: [
        'Experience & Education',
        'AI ATS Match Checker',
        'AI Interview Coach',
        'Export as PDF, DOCX, or Image',
        'Social Links & References',
        '10+ Modern Templates',
      ],
      gradient: 'linear-gradient(135deg, #06B6D4, #0284C7)',
      badgeColor: 'rgba(6,182,212,0.15)',
      badgeText: '#06B6D4',
    },
  ];

  return (
    <div className="dashboard-shell">
      <Sidebar onCollapse={setSidebarCollapsed} />
      <main className={`dashboard-content ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="page-header">
          <h1 className="heading-md">Create Document</h1>
          <p className="text-secondary">Choose what type of document you want to create</p>
        </div>

        <div className="page-body">
          <div className="create-grid">
            {docTypes.map((dt, i) => (
              <motion.div
                key={dt.type}
                className="create-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="create-card-header" style={{ background: dt.gradient }}>
                  <div className="create-emoji">{dt.emoji}</div>
                  <div>
                    <h2>{dt.title}</h2>
                    <p className="create-subtitle">{dt.subtitle}</p>
                  </div>
                </div>

                <div className="create-card-body">
                  <p className="create-desc">{dt.desc}</p>

                  <div className="create-features">
                    {dt.features.map(f => (
                      <div key={f} className="create-feature">
                        <span className="feature-dot" style={{ background: dt.gradient }} />
                        {f}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleCreate(dt.type)}
                    className="btn btn-primary w-full create-btn"
                    disabled={loading === dt.type}
                    id={`create-${dt.type}-btn`}
                  >
                    {loading === dt.type ? (
                      <>
                        <div className="spinner spinner-sm" />
                        Creating...
                      </>
                    ) : (
                      <>
                        Start Creating {dt.title}
                        <FiArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Create;
