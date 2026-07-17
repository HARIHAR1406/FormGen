import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getFavorites, removeFavorite } from '../services/firestore';
import Sidebar from '../components/layout/Sidebar';
import toast from 'react-hot-toast';
import { FiHeart, FiArrowRight, FiTrash2 } from 'react-icons/fi';
import './Favorites.css';

const TEMPLATE_INFO = {
  'classic-floral':      { name: 'Classic Floral',       type: 'biodata', emoji: '🌹', color: 'linear-gradient(135deg, #9B2335, #C8956C)' },
  'modern-minimal':      { name: 'Modern Minimal',        type: 'biodata', emoji: '✨', color: 'linear-gradient(135deg, #7C3AED, #06B6D4)' },
  'elegant-premium':     { name: 'Elegant Premium',       type: 'biodata', emoji: '👑', color: 'linear-gradient(135deg, #1E2A4A, #C9A84C)' },
  'modern-two-column':   { name: 'Modern Two-Column',     type: 'resume',  emoji: '📊', color: 'linear-gradient(135deg, #7C3AED, #3B82F6)' },
  'classic-single-column': { name: 'Classic Single-Column', type: 'resume', emoji: '📄', color: 'linear-gradient(135deg, #0284C7, #10B981)' },
  'creative-sidebar':    { name: 'Creative Sidebar',      type: 'resume',  emoji: '🎨', color: 'linear-gradient(135deg, #8B5CF6, #EC4899)' },
};

const Favorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (user) loadFavorites();
  }, [user]);

  const loadFavorites = async () => {
    try {
      const favs = await getFavorites(user.uid);
      setFavorites(favs);
    } catch { toast.error('Failed to load favorites'); }
    finally { setLoading(false); }
  };

  const handleRemove = async (templateId) => {
    try {
      await removeFavorite(user.uid, templateId);
      setFavorites(prev => prev.filter(f => f.templateId !== templateId));
      toast.success('Removed from favorites');
    } catch { toast.error('Failed to remove'); }
  };

  return (
    <div className="dashboard-shell">
      <Sidebar onCollapse={setSidebarCollapsed} />
      <main className={`dashboard-content ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="page-header">
          <div>
            <h1 className="heading-md">❤️ Favorite Templates</h1>
            <p className="text-secondary">Your saved template collection for quick access</p>
          </div>
          <Link to="/templates" className="btn btn-secondary btn-sm">Browse All Templates</Link>
        </div>

        <div className="page-body">
          {loading ? (
            <div className="templates-grid">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="skeleton" style={{ height: 260, borderRadius: 16 }} />
              ))}
            </div>
          ) : favorites.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon"><FiHeart size={48} /></div>
              <h3>No Favorites Yet</h3>
              <p>Browse templates and click the heart icon to add them here for quick access.</p>
              <Link to="/templates" className="btn btn-primary">
                Browse Templates <FiArrowRight size={15} />
              </Link>
            </div>
          ) : (
            <div className="templates-grid">
              {favorites.map((fav, i) => {
                const info = TEMPLATE_INFO[fav.templateId] || { name: fav.templateId, emoji: '📄', color: 'var(--brand-gradient)', type: 'resume' };
                return (
                  <motion.div
                    key={fav.id}
                    className="template-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    whileHover={{ y: -6 }}
                  >
                    <div className="template-preview" style={{ background: info.color }}>
                      <span className="template-emoji">{info.emoji}</span>
                      <div className="template-preview-lines">
                        {[70, 50, 60, 45, 55].map((w, j) => (
                          <div key={j} style={{ width: `${w}%`, height: '6px', background: 'rgba(255,255,255,0.4)', borderRadius: '3px' }} />
                        ))}
                      </div>
                      <button
                        className="tpl-fav-btn active"
                        onClick={() => handleRemove(fav.templateId)}
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                    <div className="template-info">
                      <span className={`template-type-badge ${info.type}`}>{info.type === 'biodata' ? '💍 Biodata' : '💼 Resume'}</span>
                      <h3 className="template-name" style={{ marginTop: '0.5rem' }}>{info.name}</h3>
                      <Link
                        to={info.type === 'biodata' ? '/create/biodata' : '/create/resume'}
                        className="btn btn-primary btn-sm w-full"
                        style={{ marginTop: '0.75rem' }}
                      >
                        Use Template <FiArrowRight size={13} />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Favorites;
