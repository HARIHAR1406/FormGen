import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { FiX, FiCopy, FiCheck, FiGlobe, FiLock, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { updateProject } from '../../services/firestore';
import './ShareModal.css';

const ShareModal = ({ isOpen, onClose, project, projectId }) => {
  const [isPublic, setIsPublic] = useState(project?.isPublic || false);
  const [sharePassword, setSharePassword] = useState(project?.sharePassword || '');
  const [shareExpiration, setShareExpiration] = useState(project?.shareExpiration || '');
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = `${window.location.origin}/share/${projectId}`;

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProject(projectId, {
        isPublic,
        sharePassword: sharePassword || null,
        shareExpiration: shareExpiration || null
      });
      toast.success('Sharing settings updated!');
      // Update local state by forcing a reload or just rely on passing it up if needed.
      // Easiest is just to close.
      onClose();
    } catch (err) {
      toast.error('Failed to update sharing settings');
    } finally {
      setSaving(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content share-modal">
        <div className="modal-header">
          <h3>Share Document</h3>
          <button className="btn btn-ghost btn-icon" onClick={onClose}>
            <FiX size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="share-toggle-group">
            <label className="share-toggle-label">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {isPublic ? <FiGlobe className="text-success" /> : <FiEyeOff className="text-muted" />}
                <div>
                  <strong>Public Access</strong>
                  <p className="text-sm text-muted">Anyone with the link can view this document</p>
                </div>
              </div>
              <div className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={isPublic} 
                  onChange={(e) => setIsPublic(e.target.checked)} 
                />
                <span className="slider round"></span>
              </div>
            </label>
          </div>

          {isPublic && (
            <div className="share-options-expanded">
              <div className="share-url-box">
                <input type="text" value={shareUrl} readOnly className="form-input" />
                <button className="btn btn-secondary" onClick={handleCopyLink}>
                  {copied ? <FiCheck /> : <FiCopy />} Copy
                </button>
              </div>

              <div className="qr-code-container">
                <QRCodeSVG value={shareUrl} size={120} level={"L"} includeMargin={true} />
                <p className="text-sm text-muted">Scan to view on mobile</p>
              </div>

              <div className="form-row" style={{ marginTop: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">
                    <FiLock size={14} style={{ marginRight: '4px' }} />
                    Password Protect (Optional)
                  </label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Set a password..."
                    value={sharePassword}
                    onChange={(e) => setSharePassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Expiration Date (Optional)</label>
                  <input 
                    type="date" 
                    className="form-input" 
                    value={shareExpiration}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setShareExpiration(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
