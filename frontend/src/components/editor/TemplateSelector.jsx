import React, { useState } from 'react';
import useFormStore from '../../store/useFormStore';
import { FiHeart } from 'react-icons/fi';
import './TemplateSelector.css';

const BIODATA_TEMPLATES = [
  { id: 'classic-floral', name: 'Classic Floral', desc: 'Traditional Indian design with rose accents', color: '#E11D48', preview: '🌹' },
  { id: 'modern-minimal', name: 'Modern Minimal', desc: 'Clean, professional white design', color: '#7C3AED', preview: '✨' },
  { id: 'elegant-premium', name: 'Elegant Premium', desc: 'Dark navy with gold accents', color: '#D97706', preview: '👑' },
];

const RESUME_TEMPLATES = [
  { id: 'modern-two-column', name: 'Modern Two-Column', desc: 'Clean two-column layout with sidebar', color: '#06B6D4', preview: '📊' },
  { id: 'classic-single-column', name: 'Classic Single-Column', desc: 'ATS-friendly single column', color: '#10B981', preview: '📄' },
  { id: 'creative-sidebar', name: 'Creative Sidebar', desc: 'Colorful left sidebar design', color: '#8B5CF6', preview: '🎨' },
];

const TemplateSelector = ({ docType }) => {
  const { formData, selectedTemplate, setSelectedTemplate } = useFormStore();
  const templates = docType === 'resume' ? RESUME_TEMPLATES : BIODATA_TEMPLATES;

  const [aiRec, setAiRec] = useState(null);
  const [loading, setLoading] = useState(false);

  const getRecommendation = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/ai/recommend-template`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeData: formData })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setAiRec(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="template-selector">
      <div className="ts-header">
        <h3>Choose Template</h3>
        <p>Click to switch templates instantly</p>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        {!aiRec ? (
          <button 
            className="btn btn-secondary w-full" 
            onClick={getRecommendation}
            disabled={loading}
            style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}
          >
            {loading ? 'Analyzing Profile...' : '✨ Ask AI for Recommendation'}
          </button>
        ) : (
          <div style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid #8B5CF6', padding: '1rem', borderRadius: '8px' }}>
            <h4 style={{ color: '#8B5CF6', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ✨ AI Recommendation
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              {aiRec.reason}
            </p>
          </div>
        )}
      </div>

      <div className="ts-list">
        {templates.map((tpl) => (
          <button
            key={tpl.id}
            className={`ts-card ${selectedTemplate === tpl.id ? 'ts-card-active' : ''} ${aiRec?.recommended?.includes(tpl.id) ? 'ts-card-recommended' : ''}`}
            onClick={() => setSelectedTemplate(tpl.id)}
            id={`template-${tpl.id}`}
            style={aiRec?.recommended?.includes(tpl.id) ? { borderColor: '#8B5CF6', boxShadow: '0 0 0 1px #8B5CF6' } : {}}
          >
            <div className="ts-preview" style={{ background: `${tpl.color}18`, borderColor: `${tpl.color}40` }}>
              <span className="ts-emoji">{tpl.preview}</span>
              <div
                className="ts-color-bar"
                style={{ background: tpl.color }}
              />
            </div>
            <div className="ts-info">
              <p className="ts-name">{tpl.name}</p>
              <p className="ts-desc">{tpl.desc}</p>
            </div>
            {selectedTemplate === tpl.id && (
              <div className="ts-active-badge" style={{ background: tpl.color }}>
                ✓ Active
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
