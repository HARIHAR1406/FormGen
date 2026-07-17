import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getProjects, deleteProject, duplicateProject, logActivity, toggleProjectFavorite } from '../services/firestore';
import Sidebar from '../components/layout/Sidebar';
import toast from 'react-hot-toast';
import { FiEdit, FiTrash2, FiCopy, FiPlus, FiClock, FiFileText, FiSearch, FiHeart } from 'react-icons/fi';
import './RecentWorks.css';

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

const RecentWorks = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState('updatedAt');

  useEffect(() => {
    if (user) loadProjects();
  }, [user]);

  useEffect(() => {
    const handleFocus = () => { if (user) loadProjects(); };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [user]);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await getProjects(user.uid);
      setProjects(data);
    } catch (err) {
      console.error('Load projects error:', err);
      toast.error('Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this document permanently?')) return;
    try {
      await deleteProject(id);
      await logActivity(user.uid, 'deleted', id);
      setProjects(p => p.filter(proj => proj.id !== id));
      toast.success('Document deleted');
    } catch { toast.error('Delete failed'); }
  };

  const handleDuplicate = async (id) => {
    try {
      await duplicateProject(user.uid, id);
      await logActivity(user.uid, 'duplicated', id);
      toast.success('Document duplicated!');
      loadProjects();
    } catch { toast.error('Duplicate failed'); }
  };

  const handleToggleFavorite = async (e, id, currentStatus) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await toggleProjectFavorite(id, currentStatus);
      setProjects(p => p.map(proj => proj.id === id ? { ...proj, isFavorite: !currentStatus } : proj));
      if (!currentStatus) toast.success('Added to Favorites ❤️');
      else toast.success('Removed from Favorites');
    } catch (err) {
      toast.error('Failed to update favorite status');
    }
  };

  const formatDate = (ts) => {
    if (!ts) return '';
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const formatTime = (ts) => {
    if (!ts) return '';
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };

  const filteredProjects = useMemo(() => {
    let result = [...projects];

    if (filterType !== 'all') {
      result = result.filter(p => p.type === filterType);
    }

    if (showFavoritesOnly) {
      result = result.filter(p => p.isFavorite);
    }

    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(p => (p.title || 'Untitled Document').toLowerCase().includes(lowerSearch));
    }

    result.sort((a, b) => {
      if (sortBy === 'title') {
        const titleA = (a.title || 'Untitled Document').toLowerCase();
        const titleB = (b.title || 'Untitled Document').toLowerCase();
        return titleA.localeCompare(titleB);
      }
      const timeA = a[sortBy]?.toMillis?.() ?? 0;
      const timeB = b[sortBy]?.toMillis?.() ?? 0;
      return timeB - timeA;
    });

    return result;
  }, [projects, searchTerm, filterType, showFavoritesOnly, sortBy]);

  return (
    <div className="dashboard-shell">
      <Sidebar onCollapse={setSidebarCollapsed} />
      <main className={`dashboard-content ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="page-header">
          <div>
            <h1 className="heading-md">Recent Works</h1>
            <p className="text-secondary">{projects.length} document{projects.length !== 1 ? 's' : ''} total</p>
          </div>
          <Link to="/create" className="btn btn-primary btn-sm">
            <FiPlus size={15} /> Create New
          </Link>
        </div>

        <div className="page-body">
          {/* Search and Filters */}
          <div className="dash-filters" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div className="search-input-wrapper" style={{ position: 'relative' }}>
              <FiSearch size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
              <input 
                type="text" 
                placeholder="Search documents..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '6px 12px 6px 32px', borderRadius: '6px', border: '1px solid var(--border-secondary)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', fontSize: '13px', width: '250px' }}
              />
            </div>

            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)}
              style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border-secondary)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', fontSize: '13px' }}
            >
              <option value="all">All Types</option>
              <option value="biodata">💍 Biodatas</option>
              <option value="resume">💼 Resumes</option>
            </select>

            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border-secondary)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', fontSize: '13px' }}
            >
              <option value="updatedAt">Last Modified</option>
              <option value="createdAt">Creation Date</option>
              <option value="title">Alphabetical (A-Z)</option>
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

          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="skeleton" style={{ height: 80, borderRadius: 12 }} />
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon"><FiFileText size={48} /></div>
              <h3>No Documents Found</h3>
              <p>{searchTerm || showFavoritesOnly ? 'Try adjusting your search or filters.' : 'Start creating your first document!'}</p>
              {!searchTerm && !showFavoritesOnly && (
                <Link to="/create" className="btn btn-primary">
                  <FiPlus size={16} /> Create Document
                </Link>
              )}
            </div>
          ) : (
            <div className="recent-list">
              <AnimatePresence>
                {filteredProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    layout
                    className="recent-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <div className="recent-item-icon" style={{ background: project.type === 'biodata' ? 'rgba(155,35,53,0.12)' : 'rgba(124,58,237,0.12)' }}>
                      {project.type === 'biodata' ? '💍' : '💼'}
                    </div>

                    <div className="recent-item-info">
                      <h3 className="recent-item-title">
                        <Highlight text={project.title || 'Untitled'} highlight={searchTerm} />
                        {project.isFavorite && <FiHeart size={14} fill="#EF4444" color="#EF4444" style={{ marginLeft: '8px' }} />}
                      </h3>
                      <div className="recent-item-meta">
                        <span className={`template-type-badge ${project.type}`}>{project.type === 'biodata' ? 'Biodata' : 'Resume'}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          <FiClock size={12} /> {formatDate(project[sortBy === 'createdAt' ? 'createdAt' : 'updatedAt'])} at {formatTime(project[sortBy === 'createdAt' ? 'createdAt' : 'updatedAt'])}
                        </span>
                      </div>
                    </div>

                    <div className="recent-item-actions">
                      <button onClick={(e) => handleToggleFavorite(e, project.id, project.isFavorite)} className="btn btn-ghost btn-sm" title={project.isFavorite ? "Unfavorite" : "Favorite"}>
                        <FiHeart size={16} fill={project.isFavorite ? "#EF4444" : "none"} color={project.isFavorite ? "#EF4444" : "currentColor"} />
                      </button>
                      <Link to={`/editor/${project.id}`} className="btn btn-secondary btn-sm">
                        <FiEdit size={14} /> Edit
                      </Link>
                      <button onClick={() => handleDuplicate(project.id)} className="btn btn-ghost btn-sm" title="Duplicate">
                        <FiCopy size={14} />
                      </button>
                      <button onClick={() => handleDelete(project.id)} className="btn btn-ghost btn-sm danger-btn" title="Delete">
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RecentWorks;
