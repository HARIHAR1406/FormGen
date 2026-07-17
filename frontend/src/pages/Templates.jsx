import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getTemplates } from '../services/firestore';
import { addFavorite, removeFavorite, getFavorites } from '../services/firestore';
import Sidebar from '../components/layout/Sidebar';
import toast from 'react-hot-toast';
import { FiHeart, FiFilter } from 'react-icons/fi';
import './Templates.css';

const BUILT_IN_TEMPLATES = [
  // ── BIODATA ─────────────────────────────────────────────────────
  { id: 'classic-floral',    name: 'Classic Floral',    type: 'biodata', category: 'Traditional', emoji: '🌹', desc: 'Traditional Indian design with rose accents and decorative borders' },
  { id: 'modern-minimal',    name: 'Modern Minimal',    type: 'biodata', category: 'Modern',      emoji: '✨', desc: 'Clean sidebar layout with elegant typography' },
  { id: 'elegant-premium',   name: 'Elegant Premium',   type: 'biodata', category: 'Premium',     emoji: '👑', desc: 'Dark navy with gold accents — ultra-luxurious feel' },
  { id: 'royal-mandala',     name: 'Royal Mandala',     type: 'biodata', category: 'Traditional', emoji: '🔮', desc: 'Regal mandala-inspired border with dual-border frame' },
  { id: 'pastel-soft',       name: 'Pastel Soft',       type: 'biodata', category: 'Modern',      emoji: '🌸', desc: 'Soft pink and lavender watercolor card design' },
  { id: 'bold-modern',       name: 'Bold Modern',       type: 'biodata', category: 'Modern',      emoji: '⚡', desc: 'High-contrast blue header with clean card grid' },
  { id: 'traditional-red',   name: 'Traditional Red',   type: 'biodata', category: 'Traditional', emoji: '🪔', desc: 'Red and gold Indian style with Hindi section labels' },
  { id: 'minimalist-white',  name: 'Minimalist White',  type: 'biodata', category: 'Minimal',     emoji: '🤍', desc: 'Ultra-clean all-white typographic layout' },
  { id: 'ocean-blue',        name: 'Ocean Blue',        type: 'biodata', category: 'Modern',      emoji: '🌊', desc: 'Blue gradient wave header with top-bordered cards' },
  { id: 'warm-earthy',       name: 'Warm Earthy',       type: 'biodata', category: 'Traditional', emoji: '🌿', desc: 'Terracotta and sage green — warm natural tones' },

  // ── RESUME ──────────────────────────────────────────────────────
  { id: 'modern-two-column',     name: 'Modern Two-Column',     type: 'resume', category: 'Modern',      emoji: '📊', desc: 'Professional sidebar with skill tags and clean sections' },
  { id: 'classic-single-column', name: 'Classic Single-Column', type: 'resume', category: 'Classic',     emoji: '📄', desc: 'ATS-friendly format preferred by recruiters' },
  { id: 'creative-sidebar',      name: 'Creative Sidebar',      type: 'resume', category: 'Creative',    emoji: '🎨', desc: 'Colorful gradient sidebar with timeline experience' },
  { id: 'executive-dark',        name: 'Executive Dark',        type: 'resume', category: 'Premium',     emoji: '🌑', desc: 'Dark navy with gold accents — ultra-premium executive feel' },
  { id: 'tech-minimal',          name: 'Tech Minimal',          type: 'resume', category: 'Creative',    emoji: '💻', desc: 'Terminal-inspired code aesthetic for developers' },
  { id: 'compact-pro',           name: 'Compact Pro',           type: 'resume', category: 'Professional',emoji: '📋', desc: 'Dense two-column layout maximizing information per page' },
  { id: 'fresh-graduate',        name: 'Fresh Graduate',        type: 'resume', category: 'Modern',      emoji: '🎓', desc: 'Colorful skills-focused layout for new graduates' },
  { id: 'corporate-blue',        name: 'Corporate Blue',        type: 'resume', category: 'Classic',     emoji: '🏢', desc: 'Traditional corporate navy style trusted by corporates' },
  { id: 'bold-creative',         name: 'Bold Creative',         type: 'resume', category: 'Creative',    emoji: '🚀', desc: 'Giant name hero section with vibrant amber accents' },
];

const COLORS = {
  // Biodata
  'classic-floral':    'linear-gradient(135deg, #9B2335, #C8956C)',
  'modern-minimal':    'linear-gradient(135deg, #7C3AED, #06B6D4)',
  'elegant-premium':   'linear-gradient(135deg, #1E2A4A, #C9A84C)',
  'royal-mandala':     'linear-gradient(135deg, #6B21A8, #A855F7)',
  'pastel-soft':       'linear-gradient(135deg, #EC4899, #A78BFA)',
  'bold-modern':       'linear-gradient(135deg, #1D4ED8, #0EA5E9)',
  'traditional-red':   'linear-gradient(135deg, #B91C1C, #CA8A04)',
  'minimalist-white':  'linear-gradient(135deg, #18181B, #52525B)',
  'ocean-blue':        'linear-gradient(135deg, #0369A1, #06B6D4)',
  'warm-earthy':       'linear-gradient(135deg, #92400E, #4D7C0F)',
  // Resume
  'modern-two-column':     'linear-gradient(135deg, #7C3AED, #3B82F6)',
  'classic-single-column': 'linear-gradient(135deg, #0284C7, #10B981)',
  'creative-sidebar':      'linear-gradient(135deg, #8B5CF6, #EC4899)',
  'executive-dark':        'linear-gradient(135deg, #0F1117, #C9A84C)',
  'tech-minimal':          'linear-gradient(135deg, #16A34A, #1E1E1E)',
  'compact-pro':           'linear-gradient(135deg, #6366F1, #0F172A)',
  'fresh-graduate':        'linear-gradient(135deg, #7C3AED, #EC4899)',
  'corporate-blue':        'linear-gradient(135deg, #1E3A5F, #2563EB)',
  'bold-creative':         'linear-gradient(135deg, #4F46E5, #F59E0B)',
};

const Templates = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [favorites, setFavorites] = useState(new Set());
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (user) loadFavorites();
  }, [user]);

  const loadFavorites = async () => {
    try {
      const favs = await getFavorites(user.uid);
      setFavorites(new Set(favs.map(f => f.templateId)));
    } catch { }
  };

  const toggleFavorite = async (templateId) => {
    try {
      if (favorites.has(templateId)) {
        await removeFavorite(user.uid, templateId);
        setFavorites(prev => { const s = new Set(prev); s.delete(templateId); return s; });
        toast.success('Removed from favorites');
      } else {
        await addFavorite(user.uid, templateId);
        setFavorites(prev => new Set([...prev, templateId]));
        toast.success('Added to favorites ❤️');
      }
    } catch { toast.error('Failed to update favorites'); }
  };

  const filtered = filter === 'all'
    ? BUILT_IN_TEMPLATES
    : BUILT_IN_TEMPLATES.filter(t => t.type === filter);

  return (
    <div className="dashboard-shell">
      <Sidebar onCollapse={setSidebarCollapsed} />
      <main className={`dashboard-content ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="page-header">
          <div>
            <h1 className="heading-md">Templates</h1>
            <p className="text-secondary">Choose a template to start creating your document</p>
          </div>
        </div>

        <div className="page-body">
          {/* Filter Tabs */}
          <div className="tabs" style={{ maxWidth: '360px', marginBottom: '2rem' }}>
            {[['all', 'All Templates'], ['biodata', '💍 Biodata'], ['resume', '💼 Resume']].map(([val, label]) => (
              <button
                key={val}
                className={`tab-btn ${filter === val ? 'active' : ''}`}
                onClick={() => setFilter(val)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="templates-grid">
            {filtered.map((tpl, i) => (
              <motion.div
                key={tpl.id}
                className="template-card"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -6 }}
              >
                {/* Preview */}
                <div className="template-preview" style={{ background: COLORS[tpl.id] }}>
                  <span className="template-emoji">{tpl.emoji}</span>
                  <div className="template-preview-lines">
                    {[70, 50, 60, 45, 55].map((w, j) => (
                      <div key={j} style={{ width: `${w}%`, height: '6px', background: 'rgba(255,255,255,0.4)', borderRadius: '3px' }} />
                    ))}
                  </div>
                  {/* Favorite Button */}
                  <button
                    className={`tpl-fav-btn ${favorites.has(tpl.id) ? 'active' : ''}`}
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(tpl.id); }}
                    aria-label="Toggle favorite"
                  >
                    <FiHeart size={16} fill={favorites.has(tpl.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>

                <div className="template-info">
                  <div className="template-meta">
                    <span className="template-category">{tpl.category}</span>
                    <span className={`template-type-badge ${tpl.type}`}>{tpl.type === 'biodata' ? '💍 Biodata' : '💼 Resume'}</span>
                  </div>
                  <h3 className="template-name">{tpl.name}</h3>
                  <p className="template-desc">{tpl.desc}</p>
                  <Link
                    to={tpl.type === 'biodata' ? '/create/biodata' : '/create/resume'}
                    className="btn btn-primary btn-sm w-full"
                    style={{ marginTop: '0.75rem' }}
                  >
                    Use This Template
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Templates;
