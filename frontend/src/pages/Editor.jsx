import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProject, updateProject, logActivity } from '../services/firestore';
import useFormStore from '../store/useFormStore';
import Sidebar from '../components/layout/Sidebar';
import BiodataForm from '../components/editor/BiodataFormFields';
import ResumeForm from '../components/editor/ResumeFormFields';
import LivePreview from '../components/editor/LivePreview';
import CustomizationPanel from '../components/editor/CustomizationPanel';
import TemplateSelector from '../components/editor/TemplateSelector';
import AIToolsPanel from '../components/editor/AIToolsPanel';
import { exportToPDF, exportToPNG, exportToJPEG, exportToDOCX, printDocument } from '../utils/exportUtils';
import ShareModal from '../components/editor/ShareModal';
import toast from 'react-hot-toast';
import { FiSave, FiDownload, FiPrinter, FiEye, FiSettings, FiLayout, FiArrowLeft, FiChevronDown, FiImage, FiFileText, FiShare2, FiCpu } from 'react-icons/fi';
import { HiOutlineDocumentText } from 'react-icons/hi';
import './Editor.css';

const PANEL = { FORM: 'form', TEMPLATES: 'templates', CUSTOMIZE: 'customize', AI: 'ai' };

const Editor = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    formData, setFormData, selectedTemplate, setSelectedTemplate,
    customization, setCustomization, currentProject, setCurrentProject, docType, setDocType
  } = useFormStore();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [panel, setPanel] = useState(PANEL.FORM);
  const [previewMode, setPreviewMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [exportDropdownOpen, setExportDropdownOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [docTitle, setDocTitle] = useState('');
  const autoSaveRef = useRef(null);
  const lastSavedDataRef = useRef({});

  useEffect(() => {
    loadProject();
    return () => clearTimeout(autoSaveRef.current);
  }, [id]);

  // Debounced Auto-save (5 seconds)
  useEffect(() => {
    if (!currentProject || !formData || Object.keys(formData).length === 0) return;

    // Check deep equality (simple JSON stringify) to avoid unnecessary saves
    const currentDataString = JSON.stringify({ formData, selectedTemplate, customization });
    if (currentDataString === lastSavedDataRef.current) return;

    clearTimeout(autoSaveRef.current);
    
    autoSaveRef.current = setTimeout(async () => {
      // Check offline status
      if (!navigator.onLine) {
        toast.error('Offline: Auto-save paused', { id: 'offline-toast' });
        return;
      }
      await autoSave();
      lastSavedDataRef.current = currentDataString;
    }, 5000);

    return () => clearTimeout(autoSaveRef.current);
  }, [formData, selectedTemplate, customization, currentProject]);

  const loadProject = async () => {
    try {
      const project = await getProject(id);
      setCurrentProject(project);
      setDocType(project.type);
      setFormData(project.formData || {});
      setSelectedTemplate(project.templateId || 'classic-floral');
      setCustomization(project.customization || {});
      
      const defaultTitle = project.type === 'biodata' ? 'My Biodata' : 'My Resume';
      setDocTitle(project.documentName || project.title || defaultTitle);
    } catch (err) {
      toast.error('Failed to load project');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const autoSave = async () => {
    try {
      await updateProject(id, { formData, templateId: selectedTemplate, customization });
    } catch (err) {
      console.error('Auto-save failed:', err);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const defaultTitle = docType === 'biodata' ? 'My Biodata' : 'My Resume';
      const finalTitle = docTitle.trim() || defaultTitle;

      await updateProject(id, {
        formData,
        templateId: selectedTemplate,
        customization,
        title: finalTitle,
        documentName: finalTitle,
      });
      // Update local state so toolbar shows new title immediately
      setCurrentProject(prev => ({ ...prev, title: finalTitle, documentName: finalTitle }));
      setDocTitle(finalTitle);
      await logActivity(user.uid, 'saved', id);
      toast.success('Document saved! ✅');
    } catch (err) {
      console.error('Save error:', err);
      toast.error('Save failed. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleExport = async (format) => {
    setExportDropdownOpen(false);
    const filename = `${currentProject?.title || 'document'}`;
    
    try {
      if (format === 'pdf') {
        await exportToPDF('live-preview-content', `${filename}.pdf`);
      } else if (format === 'png') {
        await exportToPNG('live-preview-content', `${filename}.png`);
      } else if (format === 'jpeg') {
        await exportToJPEG('live-preview-content', `${filename}.jpg`);
      } else if (format === 'docx') {
        await exportToDOCX('live-preview-content', `${filename}.docx`);
      }
      await logActivity(user.uid, `exported as ${format.toUpperCase()}`, id);
    } catch (err) {
      console.error('Export error:', err);
    }
  };

  const handlePrint = () => {
    printDocument('live-preview-content');
  };

  if (loading) {
    return (
      <div className="loading-page">
        <div className="spinner spinner-lg" />
        <p className="text-muted">Loading editor...</p>
      </div>
    );
  }

  return (
    <div className="editor-shell">
      <Sidebar onCollapse={setSidebarCollapsed} />

      <div className={`editor-layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Editor Toolbar */}
        <div className="editor-toolbar">
          <div className="toolbar-left">
            <button 
              onClick={() => navigate(-1)} 
              className="btn btn-ghost btn-icon" 
              style={{ marginRight: '0.25rem', padding: '0.25rem' }} 
              title="Go Back"
            >
              <FiArrowLeft size={18} />
            </button>
            <HiOutlineDocumentText size={18} className="toolbar-doc-icon" />
            <input 
              type="text" 
              value={docTitle} 
              onChange={(e) => setDocTitle(e.target.value)} 
              onBlur={() => {
                if(!docTitle.trim()) setDocTitle(currentProject?.documentName || currentProject?.title || 'Untitled Document');
              }}
              className="toolbar-title-input" 
              placeholder="Document Name"
            />
            <span className="toolbar-type-badge">
              {docType === 'biodata' ? '💍 Biodata' : '💼 Resume'}
            </span>
          </div>

          {/* Panel Tabs */}
          <div className="toolbar-panels">
            <button
              className={`panel-tab ${panel === PANEL.FORM ? 'active' : ''}`}
              onClick={() => setPanel(PANEL.FORM)}
            >
              <HiOutlineDocumentText size={16} />
              Form
            </button>
            <button
              className={`panel-tab ${panel === PANEL.TEMPLATES ? 'active' : ''}`}
              onClick={() => setPanel(PANEL.TEMPLATES)}
            >
              <FiLayout size={16} />
              Templates
            </button>
            <button
              className={`panel-tab ${panel === PANEL.CUSTOMIZE ? 'active' : ''}`}
              onClick={() => setPanel(PANEL.CUSTOMIZE)}
            >
              <FiSettings size={16} />
              Customize
            </button>
            <button
              className={`panel-tab ${panel === PANEL.AI ? 'active' : ''}`}
              onClick={() => setPanel(PANEL.AI)}
              style={{ color: panel === PANEL.AI ? '#8B5CF6' : '' }}
            >
              <FiCpu size={16} />
              AI Tools
            </button>
          </div>

          <div className="toolbar-actions">
            <button
              className={`btn btn-ghost btn-sm ${previewMode ? 'active-preview' : ''}`}
              onClick={() => setPreviewMode(!previewMode)}
            >
              <FiEye size={15} />
              {previewMode ? 'Edit' : 'Preview'}
            </button>
            <button onClick={handleSave} className="btn btn-secondary btn-sm" disabled={saving}>
              <FiSave size={15} />
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button onClick={handlePrint} className="btn btn-secondary btn-sm">
              <FiPrinter size={15} />
              Print
            </button>
            <button onClick={() => setShareModalOpen(true)} className="btn btn-secondary btn-sm" data-tooltip="Share Document">
              <FiShare2 size={15} />
              Share
            </button>
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setExportDropdownOpen(!exportDropdownOpen)} 
                className="btn btn-primary btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <FiDownload size={15} />
                Export
                <FiChevronDown size={14} style={{ marginLeft: '2px' }} />
              </button>
              
              {exportDropdownOpen && (
                <div className="export-dropdown" style={{
                  position: 'absolute', top: 'calc(100% + 4px)', right: 0,
                  background: 'var(--bg-secondary)', border: '1px solid var(--border-secondary)',
                  borderRadius: '8px', padding: '4px', minWidth: '160px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 100,
                  display: 'flex', flexDirection: 'column', gap: '2px'
                }}>
                  <button onClick={() => handleExport('pdf')} className="btn btn-ghost btn-sm" style={{ justifyContent: 'flex-start' }}>
                    <FiFileText size={14} /> PDF Document
                  </button>
                  <button onClick={() => handleExport('docx')} className="btn btn-ghost btn-sm" style={{ justifyContent: 'flex-start' }}>
                    <FiFileText size={14} /> Word (DOCX)
                  </button>
                  <button onClick={() => handleExport('png')} className="btn btn-ghost btn-sm" style={{ justifyContent: 'flex-start' }}>
                    <FiImage size={14} /> PNG Image
                  </button>
                  <button onClick={() => handleExport('jpeg')} className="btn btn-ghost btn-sm" style={{ justifyContent: 'flex-start' }}>
                    <FiImage size={14} /> JPEG Image
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Editor Body */}
        <div 
          className={`editor-body ${previewMode ? 'preview-only' : ''}`}
          onClick={() => { if (exportDropdownOpen) setExportDropdownOpen(false) }}
        >
          {/* Left Panel */}
          {!previewMode && (
            <div className="editor-panel">
              {panel === PANEL.FORM && (
                docType === 'biodata'
                  ? <BiodataForm />
                  : <ResumeForm />
              )}
              {panel === PANEL.TEMPLATES && (
                <TemplateSelector docType={docType} />
              )}
              {panel === PANEL.CUSTOMIZE && (
                <CustomizationPanel />
              )}
              {panel === PANEL.AI && (
                <AIToolsPanel />
              )}
            </div>
          )}

          {/* Right: Live Preview */}
          <div className={`editor-preview-area ${previewMode ? 'preview-full' : ''}`}>
            <div className="preview-header">
              <span className="preview-label">
                <FiEye size={14} />
                Live Preview
              </span>
              <span className="preview-template-info">{selectedTemplate}</span>
            </div>
            <div className="preview-scroll">
              <LivePreview />
            </div>
          </div>
        </div>
      </div>

      <ShareModal 
        isOpen={shareModalOpen} 
        onClose={() => setShareModalOpen(false)} 
        project={currentProject} 
        projectId={id} 
      />
    </div>
  );
};

export default Editor;
