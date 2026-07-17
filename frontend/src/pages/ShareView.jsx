import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProject, updateProjectViews } from '../services/firestore';
import PublicPreview from '../components/editor/PublicPreview';
import { FiLock, FiAlertCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import './ShareView.css';

const ShareView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projectData, setProjectData] = useState(null);
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    loadPublicProject();
  }, [id]);

  const loadPublicProject = async () => {
    try {
      const proj = await getProject(id);
      
      if (!proj || !proj.isPublic) {
        setError('This document is not public or does not exist.');
        setLoading(false);
        return;
      }

      // Check Expiration
      if (proj.shareExpiration) {
        const expDate = new Date(proj.shareExpiration);
        if (new Date() > expDate) {
          setError('This link has expired.');
          setLoading(false);
          return;
        }
      }

      setProjectData(proj);
      
      if (!proj.sharePassword) {
        setAuthenticated(true);
        // Increment views safely (could be a firestore function or simple update)
        updateProjectViews(id).catch(() => {});
      }
      
      setLoading(false);
    } catch (err) {
      setError('Document not found');
      setLoading(false);
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === projectData.sharePassword) {
      setAuthenticated(true);
      updateProjectViews(id).catch(() => {});
    } else {
      toast.error('Incorrect password');
    }
  };

  if (loading) {
    return (
      <div className="share-view-loading">
        <div className="spinner spinner-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="share-view-error">
        <div className="error-card">
          <FiAlertCircle size={48} className="error-icon" />
          <h2>Access Denied</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="share-view-auth">
        <div className="auth-card">
          <FiLock size={48} className="auth-icon" />
          <h2>Protected Document</h2>
          <p>Please enter the password to view this document.</p>
          <form onSubmit={handlePasswordSubmit}>
            <input 
              type="password" 
              className="form-input" 
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary w-full" style={{ marginTop: '1rem' }}>
              Unlock Document
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="share-view-container">
      <PublicPreview projectData={projectData} />
    </div>
  );
};

export default ShareView;
