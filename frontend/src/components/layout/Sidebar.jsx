import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HiOutlineHome, HiOutlineDocumentAdd, HiOutlineTemplate,
  HiOutlineHeart, HiOutlineClock, HiOutlineUser, HiOutlineLogout,
  HiOutlineShieldCheck, HiChevronLeft, HiChevronRight
} from 'react-icons/hi';
import { FiZap, FiSun, FiMoon } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';
import './Sidebar.css';

const navItems = [
  { to: '/dashboard', icon: HiOutlineHome, label: 'Dashboard' },
  { to: '/create', icon: HiOutlineDocumentAdd, label: 'Create' },
  { to: '/templates', icon: HiOutlineTemplate, label: 'Templates' },
  { to: '/favorites', icon: HiOutlineHeart, label: 'Favorites' },
  { to: '/recent', icon: HiOutlineClock, label: 'Recent Works' },
  { to: '/profile', icon: HiOutlineUser, label: 'Profile' },
];

const Sidebar = ({ onCollapse }) => {
  const { user, userProfile, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  const handleCollapse = () => {
    const nextState = !collapsed;
    setCollapsed(nextState);
    if (onCollapse) onCollapse(nextState);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const initials = (user?.displayName || user?.email || 'U')
    .split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <aside className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Header */}
      <div className="sidebar-header">
        <Link to="/dashboard" className="sidebar-logo">
          <div className="logo-icon">
            <FiZap size={16} />
          </div>
          {!collapsed && <span className="logo-text">FormGen</span>}
        </Link>
        <button
          className="sidebar-collapse-btn"
          onClick={handleCollapse}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <HiChevronRight size={16} /> : <HiChevronLeft size={16} />}
        </button>
      </div>

      {/* User Info */}
      {!collapsed && (
        <div className="sidebar-user">
          {user?.photoURL ? (
            <img src={user.photoURL} alt="Avatar" className="avatar avatar-md" />
          ) : (
            <div className="avatar avatar-md">{initials}</div>
          )}
          <div className="sidebar-user-info">
            <p className="sidebar-user-name">{user?.displayName || 'User'}</p>
            {userProfile?.role === 'admin' && (
              <p className="sidebar-user-role">⚡ Admin</p>
            )}
          </div>
        </div>
      )}

      {/* Nav Items */}
      <nav className="sidebar-nav">
        <p className={`sidebar-section-label ${collapsed ? 'hidden' : ''}`}>Menu</p>
        {navItems.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className={`sidebar-item ${isActive(to) ? 'sidebar-item-active' : ''}`}
            data-tooltip={collapsed ? t(label) : undefined}
          >
            <Icon size={20} className="sidebar-icon" />
            {!collapsed && <span>{t(label)}</span>}
            {!collapsed && isActive(to) && <div className="active-indicator" />}
          </Link>
        ))}

        {userProfile?.role === 'admin' && (
          <Link
            to="/admin"
            className={`sidebar-item ${isActive('/admin') ? 'sidebar-item-active' : ''}`}
            data-tooltip={collapsed ? 'Admin' : undefined}
          >
            <HiOutlineShieldCheck size={20} className="sidebar-icon" />
            {!collapsed && <span>Admin</span>}
          </Link>
        )}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        
        <button
          className="sidebar-item"
          onClick={toggleTheme}
          data-tooltip={collapsed ? (theme === 'dark' ? t('Light Mode') : t('Dark Mode')) : undefined}
        >
          {theme === 'dark' ? <FiSun size={20} className="sidebar-icon" /> : <FiMoon size={20} className="sidebar-icon" />}
          {!collapsed && <span>{theme === 'dark' ? t('Light Mode') : t('Dark Mode')}</span>}
        </button>

        <button
          className="sidebar-item sidebar-logout"
          onClick={handleLogout}
          data-tooltip={collapsed ? t('Log Out') : undefined}
        >
          <HiOutlineLogout size={20} className="sidebar-icon" />
          {!collapsed && <span>{t('Log Out')}</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
