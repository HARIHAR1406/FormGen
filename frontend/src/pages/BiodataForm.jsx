import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createProject, logActivity } from '../services/firestore';
import useFormStore from '../store/useFormStore';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Sidebar from '../components/layout/Sidebar';

// This page acts as a direct-link entry point to create a biodata
// It immediately creates a project and redirects to the editor
const BiodataForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { setDocType, resetForm } = useFormStore();

  useEffect(() => {
    const init = async () => {
      resetForm();
      setDocType('biodata');
      try {
        const projectId = await createProject(user.uid, {
          type: 'biodata',
          title: 'My Biodata',
          formData: {},
          templateId: 'classic-floral',
          customization: { fontFamily: 'Inter', fontSize: '14', primaryColor: '#9B2335', bgColor: '#FFF9F5', textColor: '#1A1A2E' },
        });
        await logActivity(user.uid, 'created', projectId);
        navigate(`/editor/${projectId}`, { replace: true });
      } catch {
        navigate('/create', { replace: true });
      }
    };
    if (user) init();
  }, [user]);

  return (
    <div className="dashboard-shell">
      <Sidebar />
      <LoadingSpinner fullPage text="Creating your Biodata..." />
    </div>
  );
};

export default BiodataForm;
