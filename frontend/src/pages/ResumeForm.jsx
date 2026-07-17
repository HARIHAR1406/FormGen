import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createProject, logActivity } from '../services/firestore';
import useFormStore from '../store/useFormStore';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Sidebar from '../components/layout/Sidebar';

const ResumeForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { setDocType, resetForm } = useFormStore();

  useEffect(() => {
    const init = async () => {
      resetForm();
      setDocType('resume');
      try {
        const projectId = await createProject(user.uid, {
          type: 'resume',
          title: 'My Resume',
          formData: {},
          templateId: 'modern-two-column',
          customization: { fontFamily: 'Inter', fontSize: '14', primaryColor: '#7C3AED', bgColor: '#FFFFFF', textColor: '#1A1A2E' },
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
      <LoadingSpinner fullPage text="Creating your Resume..." />
    </div>
  );
};

export default ResumeForm;
