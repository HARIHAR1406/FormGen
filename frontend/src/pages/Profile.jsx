import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { uploadProfilePhoto, deleteFile } from '../services/storage';
import { auth, db } from '../firebase';
import { deleteUser } from 'firebase/auth';
import { doc, deleteDoc } from 'firebase/firestore';
import { getProjects, deleteProject } from '../services/firestore';
import Sidebar from '../components/layout/Sidebar';
import toast from 'react-hot-toast';
import { FiUser, FiMail, FiPhone, FiCamera, FiSave, FiShield, FiActivity, FiTrash2 } from 'react-icons/fi';
import { HiOutlineDocumentText } from 'react-icons/hi';
import ImageCropModal from '../components/common/ImageCropModal';
import './Profile.css';

const Profile = () => {
  const { user, userProfile, updateUserProfile } = useAuth();
  const [form, setForm] = useState({
    name: user?.displayName || '',
    phone: user?.phoneNumber || userProfile?.phone || '',
    bio: userProfile?.bio || '',
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const fileRef = useRef();

  const initials = (user?.displayName || user?.email || 'U')
    .split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateUserProfile(form);
    } catch { }
    finally { setSaving(false); }
  };

  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error('Max file size is 5MB'); return; }
    
    const reader = new FileReader();
    reader.onload = () => {
      setTempImageSrc(reader.result);
      setCropModalOpen(true);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleCropComplete = async (croppedBlob) => {
    setUploading(true);
    setUploadProgress(0);
    try {
      const fileExt = tempImageSrc?.split(';')[0]?.match(/jpeg|png|gif/)?.[0] || 'jpg';
      const file = new File([croppedBlob], `profile.${fileExt}`, { type: croppedBlob.type });

      // If updating existing photo, delete old one first
      if (user.photoURL && user.photoURL !== tempImageSrc) {
        await deleteFile(user.photoURL);
      }

      const url = await uploadProfilePhoto(user.uid, file, setUploadProgress);
      await updateUserProfile({ photoURL: url });
      toast.success('Profile photo updated!');
    } catch (err) {
      if (err.message === 'BUCKET_NOT_FOUND') {
        toast.error('Supabase Error: Please create a public bucket named "uploads" in your dashboard.', { duration: 6000 });
      } else {
        toast.error('Upload failed: ' + err.message);
      }
    } finally { 
      setUploading(false); 
      setCropModalOpen(false);
      setTempImageSrc(null);
    }
  };

  const handleDeletePhoto = async () => {
    if (!user.photoURL) return;
    if (!window.confirm('Are you sure you want to remove your profile photo?')) return;
    
    setUploading(true);
    try {
      await deleteFile(user.photoURL);
      await updateUserProfile({ photoURL: null });
      toast.success('Profile photo removed!');
    } catch (err) {
      toast.error('Failed to remove photo');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you absolutely sure? This will permanently delete your account, all your documents, and all associated data. This action CANNOT be undone.')) return;
    
    setSaving(true);
    try {
      const userProjects = await getProjects(user.uid);
      for (const proj of userProjects) {
        await deleteProject(proj.id);
      }
      
      await deleteDoc(doc(db, 'users', user.uid));
      
      if (auth.currentUser) {
        await deleteUser(auth.currentUser);
      }
      
      toast.success('Account deleted successfully.');
    } catch (err) {
      if (err.code === 'auth/requires-recent-login') {
        toast.error('Security verification failed. Please sign out and sign in again before deleting your account.', { duration: 6000 });
      } else {
        toast.error('Failed to delete account: ' + err.message);
      }
    } finally {
      setSaving(false);
    }
  };

  const accountInfo = [
    { icon: FiMail, label: 'Email', value: user?.email || '—' },
    { icon: FiPhone, label: 'Phone', value: user?.phoneNumber || userProfile?.phone || '—' },
    { icon: FiActivity, label: 'Member Since', value: user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString('en-IN') : '—' },
    { icon: HiOutlineDocumentText, label: 'Sign-in Provider', value: user?.providerData?.[0]?.providerId || '—' },
  ];

  return (
    <div className="dashboard-shell">
      <Sidebar onCollapse={setSidebarCollapsed} />
      <main className={`dashboard-content ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="page-header">
          <div>
            <h1 className="heading-md">My Profile</h1>
            <p className="text-secondary">Manage your account settings and preferences</p>
          </div>
        </div>

        <div className="page-body">
          <div className="profile-grid">
            {/* Left: Photo + Account Info */}
            <div className="profile-left">
              {/* Avatar Section */}
              <div className="profile-avatar-card card">
                <div className="profile-avatar-wrap">
                  {user?.photoURL ? (
                    <>
                      <img src={user.photoURL} alt="Profile" className="profile-avatar-img" />
                      <div className="profile-avatar-actions" style={{ position: 'absolute', bottom: '0px', display: 'flex', gap: '8px', justifyContent: 'center', width: '100%' }}>
                        <button
                          className="profile-camera-btn"
                          style={{ position: 'relative', bottom: 0, right: 0 }}
                          onClick={() => {
                            setTempImageSrc(user.photoURL);
                            setCropModalOpen(true);
                          }}
                          disabled={uploading}
                          aria-label="Edit profile photo"
                        >
                          <FiCamera size={14} />
                        </button>
                        <button
                          className="profile-camera-btn"
                          style={{ position: 'relative', bottom: 0, right: 0, background: 'var(--error)' }}
                          onClick={handleDeletePhoto}
                          disabled={uploading}
                          aria-label="Delete profile photo"
                        >
                          <FiTrash2 size={14} color="white" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="profile-avatar-placeholder">{initials}</div>
                      <button
                        className="profile-camera-btn"
                        onClick={() => fileRef.current?.click()}
                        disabled={uploading}
                        aria-label="Change profile photo"
                      >
                        <FiCamera size={14} />
                      </button>
                    </>
                  )}
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleFileSelect} hidden />
                </div>

                {uploading && (
                  <div className="upload-progress">
                    <div className="upload-progress-bar" style={{ width: `${uploadProgress}%` }} />
                    <p>{Math.round(uploadProgress)}%</p>
                  </div>
                )}

                <h2 className="profile-name">{user?.displayName || 'User'}</h2>
                <p className="profile-email">{user?.email || user?.phoneNumber || ''}</p>
              </div>

              {/* Account Info */}
              <div className="card" style={{ marginTop: '1.25rem' }}>
                <h3 className="profile-section-title">Account Information</h3>
                <div className="account-info-list">
                  {accountInfo.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="account-info-row">
                      <div className="account-info-icon"><Icon size={15} /></div>
                      <div>
                        <p className="account-info-label">{label}</p>
                        <p className="account-info-value">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Edit Form */}
            <div className="profile-right">
              <div className="card">
                <h3 className="profile-section-title">Edit Profile</h3>
                <form onSubmit={handleSave} className="profile-form">
                  <div className="form-group">
                    <label className="form-label">
                      <FiUser size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                      Full Name
                    </label>
                    <input
                      className="form-input"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      id="profile-name"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <FiPhone size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                      Phone Number
                    </label>
                    <input
                      className="form-input"
                      placeholder="+91 9876543210"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      id="profile-phone"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Bio</label>
                    <textarea
                      className="form-input"
                      rows={4}
                      placeholder="Tell us a little about yourself..."
                      value={form.bio}
                      onChange={e => setForm({ ...form, bio: e.target.value })}
                      id="profile-bio"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={saving}
                    id="profile-save-btn"
                  >
                    <FiSave size={15} />
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              </div>

              {/* Danger Zone */}
              <div className="card danger-zone" style={{ marginTop: '1.25rem' }}>
                <h3 className="profile-section-title" style={{ color: 'var(--error)' }}>⚠️ Danger Zone</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Once you delete your account, all your data will be permanently removed. This action cannot be undone.
                </p>
                <button className="btn btn-danger btn-sm" onClick={handleDeleteAccount} disabled={saving}>
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ImageCropModal 
        isOpen={cropModalOpen}
        onClose={() => setCropModalOpen(false)}
        imageSrc={tempImageSrc}
        onCropComplete={handleCropComplete}
        aspect={1} 
      />
    </div>
  );
};

export default Profile;
