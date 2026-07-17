import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import Sidebar from '../components/layout/Sidebar';
import { getUserStats, getProjects, deleteProject, duplicateProject, logActivity, toggleProjectFavorite, updateProject } from '../services/firestore';
import {
  FiFileText, FiHeart, FiFolder, FiActivity, FiPlus,
  FiEdit, FiEdit3, FiTrash2, FiCopy, FiClock, FiSearch, FiFilter, FiUpload
} from 'react-icons/fi';
import { HiOutlineDocumentText, HiOutlineSparkles, HiOutlineChartBar, HiOutlineEye } from 'react-icons/hi';
import toast from 'react-hot-toast';
import AnalyticsCharts from '../components/dashboard/AnalyticsCharts';
import './Dashboard.css';

const Highlight = ({ text, highlight }) => {
  if (!highlight.trim()) return <span>{text}</span>;
  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? <mark key={i} style={{ backgroundColor: '#FDE047', color: '#854D0E', borderRadius: '2px', padding: '0 2px' }}>{part}</mark> : <span key={i}>{part}</span>
      )}
    </span>
  );
};

const statCards = (stats, projects) => {
  const totalViews = projects.reduce((acc, p) => acc + (p.views || 0), 0);
  const totalProjects = stats?.totalProjects ?? 0;
  const avgAtsScore = totalProjects > 0 ? 84 : 0; // Mocked for Phase 2

  return [
    { label: 'Total Projects', value: totalProjects, icon: FiFolder, color: '#7C3AED', bg: 'rgba(124,58,237,0.12)' },
    { label: 'Total Views', value: totalViews, icon: HiOutlineEye, color: '#10B981', bg: 'rgba(16,185,129,0.12)' },
    { label: 'Avg ATS Score', value: avgAtsScore, icon: HiOutlineChartBar, color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
    { label: 'Favorites', value: stats?.totalFavorites ?? 0, icon: FiHeart, color: '#EF4444', bg: 'rgba(239,68,68,0.12)' },
  ];
};

const typeLabel = (type) => type === 'biodata' ? '💍 Biodata' : '💼 Resume';

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [stats, setStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, biodata, resume
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState('updatedAt'); // updatedAt, createdAt, title

  useEffect(() => {
    if (user) loadData();
  }, [user]);

  useEffect(() => {
    const handleFocus = () => { if (user) loadData(); };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsData, projectsData] = await Promise.all([
        getUserStats(user.uid),
        getProjects(user.uid), // Load all projects to enable local searching
      ]);
      setStats(statsData);
      setProjects(projectsData);
    } catch (err) {
      console.error('Dashboard load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this document?')) return;
    try {
      await deleteProject(id);
      await logActivity(user.uid, 'deleted', id);
      setProjects(p => p.filter(proj => proj.id !== id));
      toast.success('Document deleted');
      loadData();
    } catch (err) {
      toast.error('Failed to delete document');
    }
  };

  const handleDuplicate = async (id) => {
    try {
      await duplicateProject(user.uid, id);
      await logActivity(user.uid, 'duplicated', id);
      toast.success('Document duplicated!');
      loadData();
    } catch (err) {
      toast.error('Failed to duplicate document');
    }
  };

  const handleRename = async (id, currentName) => {
    const newName = prompt('Enter new document name:', currentName);
    if (!newName || newName.trim() === currentName) return;
    try {
      await updateProject(id, { documentName: newName.trim(), title: newName.trim() });
      setProjects(p => p.map(proj => proj.id === id ? { ...proj, documentName: newName.trim(), title: newName.trim() } : proj));
      toast.success('Document renamed');
    } catch (err) {
      toast.error('Failed to rename document');
    }
  };

  const handleToggleFavorite = async (e, id, currentStatus) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await toggleProjectFavorite(id, currentStatus);
      setProjects(p => p.map(proj => proj.id === id ? { ...proj, isFavorite: !currentStatus } : proj));
      if (!currentStatus) toast.success('Added to Favorites ❤️');
      else toast.success('Removed from Favorites');
      // Update stats locally to be instant
      setStats(s => s ? { ...s, totalFavorites: s.totalFavorites + (!currentStatus ? 1 : -1) } : null);
    } catch (err) {
      toast.error('Failed to update favorite status');
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const cards = statCards(stats, projects);

  // Apply Search, Filter, and Sort Locally
  const filteredProjects = useMemo(() => {
    let result = [...projects];

    // Filter by type
    if (filterType !== 'all') {
      result = result.filter(p => p.type === filterType);
    }

    // Filter by favorites
    if (showFavoritesOnly) {
      result = result.filter(p => p.isFavorite);
    }

    // Filter by search term (Title)
    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(p => (p.documentName || p.title || 'Untitled Document').toLowerCase().includes(lowerSearch));
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'title') {
        const titleA = (a.documentName || a.title || 'Untitled Document').toLowerCase();
        const titleB = (b.documentName || b.title || 'Untitled Document').toLowerCase();
        return titleA.localeCompare(titleB);
      }
      // Date sorting
      const timeA = a[sortBy]?.toMillis?.() ?? 0;
      const timeB = b[sortBy]?.toMillis?.() ?? 0;
      return timeB - timeA; // Descending
    });

    return result;
  }, [projects, searchTerm, filterType, showFavoritesOnly, sortBy]);

  return (
    <div className="dashboard-shell">
      <Sidebar onCollapse={setSidebarCollapsed} />
      <main className={`dashboard-content ${sidebarCollapsed ? 'collapsed' : ''}`}>
        {/* Header */}
        <div className="page-header">
          <div className="dash-header-inner">
            <div>
              <h1 className="heading-md">
                {t('Welcome back', { name: user?.displayName?.split(' ')[0] || 'there' })}
              </h1>
              <p className="text-secondary" style={{ marginTop: '0.25rem' }}>
                Here's an overview of your document workspace.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Link to="/create" className="btn btn-primary">
                <FiPlus size={16} /> {t('Create Document')}
              </Link>
            </div>
          </div>
        </div>

        <div className="page-body">
          {/* Stats Cards */}
          <div className="stats-grid">
            {cards.map((card, i) => (
              <motion.div
                key={card.label}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="stat-card-icon" style={{ background: card.bg, color: card.color }}>
                  <card.icon size={22} />
                </div>
                <div>
                  <p className="stat-card-value">
                    {loading ? <span className="skeleton" style={{ width: 40, height: 24, display: 'block' }} /> : card.value}
                  </p>
                  <p className="stat-card-label">{card.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Create */}
          <div className="section-title">
            <HiOutlineSparkles size={18} />
            {t('Quick Create')}
          </div>
          <div className="quick-create-grid">
            <Link to="/create/biodata" className="quick-create-card biodata">
              <div className="qc-emoji">💍</div>
              <div>
                <h3>Marriage Biodata</h3>
                <p>Create a traditional marriage profile</p>
              </div>
              <FiPlus size={20} className="qc-plus" />
            </Link>
            <Link to="/create/resume" className="quick-create-card resume">
              <div className="qc-emoji">💼</div>
              <div>
                <h3>Professional Resume</h3>
                <p>Build an ATS-friendly resume</p>
              </div>
              <FiPlus size={20} className="qc-plus" />
            </Link>
          </div>

          {/* Analytics Charts */}
          {projects.length > 0 && (
            <AnalyticsCharts projects={projects} stats={stats} />
          )}

          {/* Documents Section */}
          <div className="dash-section-header" style={{ marginTop: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div className="section-title" style={{ margin: 0 }}>
              <FiFolder size={18} />
              {t('Your Documents')}
            </div>
            
            {/* Search and Filters */}
            <div className="dash-filters" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', marginLeft: 'auto' }}>
              <div className="search-input-wrapper" style={{ position: 'relative' }}>
                <FiSearch size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
                <input 
                  type="text" 
                  placeholder={t('Search documents')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ padding: '6px 12px 6px 32px', borderRadius: '6px', border: '1px solid var(--border-secondary)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', fontSize: '13px', width: '200px' }}
                />
              </div>

              <select 
                value={filterType} 
                onChange={(e) => setFilterType(e.target.value)}
                style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border-secondary)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', fontSize: '13px' }}
              >
                <option value="all">{t('All Types')}</option>
                <option value="biodata">{t('Biodatas Only')}</option>
                <option value="resume">{t('Resumes Only')}</option>
              </select>

              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border-secondary)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', fontSize: '13px' }}
              >
                <option value="updatedAt">{t('Last Modified')}</option>
                <option value="createdAt">{t('Creation Date')}</option>
                <option value="title">{t('Alphabetical (A-Z)')}</option>
              </select>

              <button 
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`btn btn-sm ${showFavoritesOnly ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <FiHeart size={14} fill={showFavoritesOnly ? 'currentColor' : 'none'} /> 
                {showFavoritesOnly ? 'Favorites' : 'All'}
              </button>
            </div>
          </div>

          {loading ? (
            <div className="projects-grid">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="project-card-skeleton">
                  <div className="skeleton" style={{ height: 120, borderRadius: 12, marginBottom: 12 }} />
                  <div className="skeleton" style={{ height: 16, width: '70%', marginBottom: 8 }} />
                  <div className="skeleton" style={{ height: 14, width: '50%' }} />
                </div>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📄</div>
              <h3>No Results Found</h3>
              <p>{searchTerm || showFavoritesOnly ? 'Try adjusting your search or filters.' : 'Create your first Marriage Biodata or Resume to get started!'}</p>
              {!searchTerm && !showFavoritesOnly && (
                <Link to="/create" className="btn btn-primary">
                  <FiPlus size={16} /> Create First Document
                </Link>
              )}
            </div>
          ) : (
            <div className="projects-grid">
              <AnimatePresence>
                {filteredProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    layout
                    className="project-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="project-card-top">
                      <div className="project-type-badge">
                        {typeLabel(project.type)}
                      </div>
                      <div className="project-actions">
                        <button onClick={(e) => handleToggleFavorite(e, project.id, project.isFavorite)} className="btn btn-ghost btn-icon" data-tooltip={project.isFavorite ? "Unfavorite" : "Favorite"}>
                          <FiHeart size={15} fill={project.isFavorite ? "#EF4444" : "none"} color={project.isFavorite ? "#EF4444" : "currentColor"} />
                        </button>
                        <button onClick={() => handleRename(project.id, project.documentName || project.title || 'Untitled Document')} className="btn btn-ghost btn-icon" data-tooltip="Rename">
                          <FiEdit3 size={15} />
                        </button>
                        <Link to={`/editor/${project.id}`} className="btn btn-ghost btn-icon" data-tooltip="Edit Document">
                          <FiEdit size={15} />
                        </Link>
                        <button onClick={() => handleDuplicate(project.id)} className="btn btn-ghost btn-icon" data-tooltip="Duplicate">
                          <FiCopy size={15} />
                        </button>
                        <button onClick={() => handleDelete(project.id)} className="btn btn-ghost btn-icon danger-hover" data-tooltip="Delete">
                          <FiTrash2 size={15} />
                        </button>
                      </div>
                    </div>

                    <h3 className="project-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={project.documentName || project.title || 'Untitled Document'}>
                      <Highlight text={project.documentName || project.title || 'Untitled Document'} highlight={searchTerm} />
                    </h3>
                    <p className="project-template">Template: {project.templateId || 'Default'}</p>
                    <div className="project-meta">
                      <FiClock size={13} />
                      <span>
                        {sortBy === 'createdAt' ? 'Created: ' : 'Updated: '}
                        {formatDate(project[sortBy === 'createdAt' ? 'createdAt' : 'updatedAt'])}
                      </span>
                    </div>

                    <div className="project-card-footer">
                      <Link to={`/editor/${project.id}`} className="btn btn-secondary btn-sm w-full">
                        <FiEdit size={14} /> Continue Editing
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Activity */}
          {stats?.recentActivities?.length > 0 && (
            <>
              <div className="section-title" style={{ marginTop: '2rem' }}>
                <FiActivity size={18} />
                Recent Activity
              </div>
              <div className="activity-list">
                {stats.recentActivities.map((log, i) => (
                  <div key={log.id} className="activity-item">
                    <div className="activity-dot" />
                    <div className="activity-content">
                      <p className="activity-text">
                        You <strong>{log.action}</strong> a document
                      </p>
                      <p className="activity-time">
                        {log.timestamp?.toDate ? log.timestamp.toDate().toLocaleDateString() : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
