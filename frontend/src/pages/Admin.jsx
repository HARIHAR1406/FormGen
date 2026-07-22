import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiUsers, FiFileText, FiShield, FiTrash2, FiZap } from 'react-icons/fi';
import { HiOutlineDocumentText } from 'react-icons/hi';
import './Admin.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Admin = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('stats');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const getAuthHeader = async () => {
    const token = await user.getIdToken();
    return { Authorization: `Bearer ${token}` };
  };

  const loadData = async () => {
    try {
      const headers = await getAuthHeader();
      const [statsRes, usersRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/api/admin/stats`, { headers }),
        axios.get(`${BACKEND_URL}/api/admin/users`, { headers }),
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data.users);
    } catch (err) {
      toast.error('Failed to load admin data. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (uid) => {
    if (!confirm('Permanently delete this user and all their data?')) return;
    try {
      const headers = await getAuthHeader();
      await axios.delete(`${BACKEND_URL}/api/admin/users/${uid}`, { headers });
      setUsers(prev => prev.filter(u => u.uid !== uid));
      toast.success('User deleted');
    } catch { toast.error('Delete failed'); }
  };

  const handleGrantAdmin = async (uid) => {
    try {
      const headers = await getAuthHeader();
      await axios.post(`${BACKEND_URL}/api/admin/set-admin/${uid}`, {}, { headers });
      toast.success('Admin role granted');
      loadData();
    } catch { toast.error('Failed to grant admin'); }
  };

  const statCards = stats ? [
    { label: 'Total Users', value: stats.totalUsers, icon: FiUsers, color: '#7C3AED' },
    { label: 'Total Projects', value: stats.totalProjects, icon: HiOutlineDocumentText, color: '#06B6D4' },
    { label: 'Biodatas', value: stats.biodataCount, icon: FiFileText, color: '#F59E0B' },
    { label: 'Resumes', value: stats.resumeCount, icon: FiFileText, color: '#10B981' },
  ] : [];

  return (
    <div className="dashboard-shell">
      <Sidebar onCollapse={setSidebarCollapsed} />
      <main className={`dashboard-content ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="page-header">
          <div>
            <h1 className="heading-md">⚡ Admin Panel</h1>
            <p className="text-secondary">Platform management and analytics</p>
          </div>
        </div>

        <div className="page-body">
          {/* Admin Tabs */}
          <div className="tabs" style={{ maxWidth: '360px', marginBottom: '2rem' }}>
            {[['stats', '📊 Statistics'], ['users', '👥 Users']].map(([v, l]) => (
              <button key={v} className={`tab-btn ${activeTab === v ? 'active' : ''}`} onClick={() => setActiveTab(v)}>{l}</button>
            ))}
          </div>

          {loading ? (
            <div className="stats-grid">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="skeleton" style={{ height: 100, borderRadius: 16 }} />
              ))}
            </div>
          ) : (
            <>
              {activeTab === 'stats' && (
                <>
                  <div className="stats-grid" style={{ marginBottom: '2rem' }}>
                    {statCards.map((card, i) => (
                      <motion.div
                        key={card.label}
                        className="stat-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                      >
                        <div className="stat-card-icon" style={{ background: `${card.color}20`, color: card.color }}>
                          <card.icon size={22} />
                        </div>
                        <div>
                          <p className="stat-card-value">{card.value ?? '—'}</p>
                          <p className="stat-card-label">{card.label}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="card">
                    <p className="text-muted" style={{ textAlign: 'center', padding: '1rem' }}>
                      Last updated: {new Date(stats?.timestamp || Date.now()).toLocaleString()}
                    </p>
                  </div>
                </>
              )}

              {activeTab === 'users' && (
                <div className="admin-users-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Email / Phone</th>
                        <th>Role</th>
                        <th>Created</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(u => (
                        <tr key={u.uid}>
                          <td>
                            <div className="admin-user-cell">
                              {u.photoURL ? (
                                <img src={u.photoURL} alt="" className="avatar avatar-sm" />
                              ) : (
                                <div className="avatar avatar-sm">
                                  {(u.displayName || u.email || 'U')[0].toUpperCase()}
                                </div>
                              )}
                              <span>{u.displayName || '—'}</span>
                            </div>
                          </td>
                          <td>{u.email || u.phoneNumber || '—'}</td>
                          <td>
                            <span className={`badge ${u.customClaims?.admin ? 'badge-primary' : ''}`} style={{ fontSize: '0.7rem' }}>
                              {u.customClaims?.admin ? '⚡ Admin' : 'User'}
                            </span>
                          </td>
                          <td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}</td>
                          <td>
                            <div style={{ display: 'flex', gap: '0.375rem' }}>
                              {!u.customClaims?.admin && (
                                <button
                                  onClick={() => handleGrantAdmin(u.uid)}
                                  className="btn btn-secondary btn-sm"
                                  title="Grant Admin"
                                >
                                  <FiShield size={13} />
                                </button>
                              )}
                              {u.uid !== user.uid && (
                                <button
                                  onClick={() => handleDeleteUser(u.uid)}
                                  className="btn btn-ghost btn-sm"
                                  style={{ color: 'var(--error)' }}
                                  title="Delete User"
                                >
                                  <FiTrash2 size={13} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
