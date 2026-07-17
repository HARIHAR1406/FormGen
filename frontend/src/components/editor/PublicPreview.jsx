import { useEffect } from 'react';
import useFormStore from '../../store/useFormStore';
import LivePreview from './LivePreview';

const PublicPreview = ({ projectData }) => {
  const { setFormData, setSelectedTemplate, setCustomization, setDocType } = useFormStore();

  useEffect(() => {
    if (projectData) {
      setDocType(projectData.type);
      setFormData(projectData.formData || {});
      setSelectedTemplate(projectData.templateId || 'classic-floral');
      setCustomization(projectData.customization || {});
    }
  }, [projectData]);

  if (!projectData) return null;

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <LivePreview />
    </div>
  );
};

export default PublicPreview;
