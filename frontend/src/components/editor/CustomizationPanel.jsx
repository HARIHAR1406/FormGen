import { useState } from 'react';
import useFormStore from '../../store/useFormStore';
import './CustomizationPanel.css';

const FONT_FAMILIES = ['Inter', 'Poppins', 'Playfair Display', 'Georgia', 'Times New Roman', 'Arial', 'Roboto'];
const FONT_SIZES = ['12', '13', '14', '15', '16'];
const SPACINGS = ['compact', 'normal', 'relaxed'];
const LAYOUTS = ['standard', 'centered', 'wide'];

const ColorSwatch = ({ label, colorKey, value }) => {
  const { updateCustomization } = useFormStore();
  return (
    <div className="color-swatch-group">
      <label className="form-label">{label}</label>
      <div className="color-input-row">
        <input
          type="color"
          className="color-picker"
          value={value}
          onChange={(e) => updateCustomization(colorKey, e.target.value)}
          id={`color-${colorKey}`}
        />
        <input
          type="text"
          className="form-input color-hex-input"
          value={value}
          onChange={(e) => updateCustomization(colorKey, e.target.value)}
          maxLength={7}
        />
      </div>
    </div>
  );
};

const PRESET_THEMES = [
  { name: 'Violet Dream', primary: '#7C3AED', secondary: '#06B6D4', bg: '#FFFFFF', text: '#1A1A2E' },
  { name: 'Rose Gold', primary: '#E11D48', secondary: '#F59E0B', bg: '#FFFBF5', text: '#1C1917' },
  { name: 'Ocean Blue', primary: '#0284C7', secondary: '#10B981', bg: '#F0F9FF', text: '#0C1A2E' },
  { name: 'Emerald', primary: '#059669', secondary: '#0D9488', bg: '#F0FDF4', text: '#14532D' },
  { name: 'Slate Dark', primary: '#475569', secondary: '#64748B', bg: '#F8FAFC', text: '#0F172A' },
  { name: 'Royal Gold', primary: '#B45309', secondary: '#D97706', bg: '#FFFBEB', text: '#1C1917' },
];

const CustomizationPanel = () => {
  const { customization, updateCustomization, setCustomization } = useFormStore();
  const [activeTab, setActiveTab] = useState('theme');

  const applyPreset = (preset) => {
    setCustomization({
      ...customization,
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      bgColor: preset.bg,
      textColor: preset.text,
      accentColor: preset.primary,
    });
  };

  return (
    <div className="customization-panel">
      <div className="cp-header">
        <h3>Customize</h3>
        <p>Personalize your document's appearance</p>
      </div>

      <div className="cp-tabs">
        {['theme', 'typography', 'layout'].map(tab => (
          <button
            key={tab}
            className={`cp-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="cp-body">
        {activeTab === 'theme' && (
          <div className="cp-section">
            {/* Preset Themes */}
            <p className="cp-section-title">Quick Themes</p>
            <div className="preset-grid">
              {PRESET_THEMES.map((preset) => (
                <button
                  key={preset.name}
                  className="preset-card"
                  onClick={() => applyPreset(preset)}
                  title={preset.name}
                >
                  <div className="preset-preview">
                    <div className="preset-color" style={{ background: preset.primary }} />
                    <div className="preset-color" style={{ background: preset.secondary }} />
                    <div className="preset-color" style={{ background: preset.bg, border: '1px solid #ddd' }} />
                  </div>
                  <p className="preset-name">{preset.name}</p>
                </button>
              ))}
            </div>

            {/* Custom Colors */}
            <p className="cp-section-title" style={{ marginTop: '1.25rem' }}>Custom Colors</p>
            <div className="color-grid">
              <ColorSwatch label="Primary Color" colorKey="primaryColor" value={customization?.primaryColor || '#7C3AED'} />
              <ColorSwatch label="Secondary Color" colorKey="secondaryColor" value={customization?.secondaryColor || '#06B6D4'} />
              <ColorSwatch label="Background" colorKey="bgColor" value={customization?.bgColor || '#FFFFFF'} />
              <ColorSwatch label="Text Color" colorKey="textColor" value={customization?.textColor || '#1A1A2E'} />
              <ColorSwatch label="Accent Color" colorKey="accentColor" value={customization?.accentColor || '#7C3AED'} />
            </div>
          </div>
        )}

        {activeTab === 'typography' && (
          <div className="cp-section">
            <div className="form-group">
              <label className="form-label">Font Family</label>
              <select
                className="form-input"
                value={customization?.fontFamily || 'Inter'}
                onChange={(e) => updateCustomization('fontFamily', e.target.value)}
              >
                {FONT_FAMILIES.map(f => (
                  <option key={f} style={{ fontFamily: f }}>{f}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Font Size: {customization?.fontSize || 14}px</label>
              <input
                type="range"
                className="range-slider"
                min="12"
                max="16"
                step="1"
                value={customization?.fontSize || 14}
                onChange={(e) => updateCustomization('fontSize', e.target.value)}
              />
              <div className="range-labels">
                <span>Small</span>
                <span>Normal</span>
                <span>Large</span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Font Weight</label>
              <div className="btn-group">
                {[['300', 'Light'], ['400', 'Regular'], ['600', 'Semi-Bold'], ['700', 'Bold']].map(([val, label]) => (
                  <button
                    key={val}
                    className={`btn-group-item ${customization?.fontWeight === val ? 'active' : ''}`}
                    onClick={() => updateCustomization('fontWeight', val)}
                    style={{ fontWeight: val }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Preview */}
            <div className="font-preview" style={{
              fontFamily: customization?.fontFamily || 'Inter',
              fontSize: `${customization?.fontSize || 14}px`,
              fontWeight: customization?.fontWeight || '400',
            }}>
              <p className="font-preview-heading">Aarav Kumar</p>
              <p className="font-preview-body">Software Engineer at Tech Corp. Passionate about building elegant solutions.</p>
              <p className="font-preview-small">contact@example.com | +91 9876543210</p>
            </div>
          </div>
        )}

        {activeTab === 'layout' && (
          <div className="cp-section">
            <div className="form-group">
              <label className="form-label">Document Spacing</label>
              <div className="option-cards">
                {SPACINGS.map(sp => (
                  <button
                    key={sp}
                    className={`option-card ${customization?.spacing === sp ? 'active' : ''}`}
                    onClick={() => updateCustomization('spacing', sp)}
                  >
                    <div className={`spacing-preview spacing-${sp}`}>
                      <div className="sp-line" />
                      <div className="sp-line" />
                      <div className="sp-line" />
                    </div>
                    <span>{sp.charAt(0).toUpperCase() + sp.slice(1)}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Layout Style</label>
              <div className="option-cards">
                {LAYOUTS.map(lay => (
                  <button
                    key={lay}
                    className={`option-card ${customization?.layout === lay ? 'active' : ''}`}
                    onClick={() => updateCustomization('layout', lay)}
                  >
                    <div className={`layout-preview layout-${lay}`}>
                      <div className="lay-block" />
                      <div className="lay-block" />
                    </div>
                    <span>{lay.charAt(0).toUpperCase() + lay.slice(1)}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Profile Image Position</label>
              <div className="btn-group">
                {['left', 'center', 'right'].map(pos => (
                  <button
                    key={pos}
                    className={`btn-group-item ${customization?.imagePosition === pos ? 'active' : ''}`}
                    onClick={() => updateCustomization('imagePosition', pos)}
                  >
                    {pos.charAt(0).toUpperCase() + pos.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomizationPanel;
