import useFormStore from '../../store/useFormStore';

// Biodata templates
import ClassicFloral from '../templates/biodata/ClassicFloral';
import ModernMinimal from '../templates/biodata/ModernMinimal';
import ElegantPremium from '../templates/biodata/ElegantPremium';
import RoyalMandala from '../templates/biodata/RoyalMandala';
import PastelSoft from '../templates/biodata/PastelSoft';
import BoldModern from '../templates/biodata/BoldModern';
import TraditionalRed from '../templates/biodata/TraditionalRed';
import MinimalistWhite from '../templates/biodata/MinimalistWhite';
import OceanBlue from '../templates/biodata/OceanBlue';
import WarmEarthy from '../templates/biodata/WarmEarthy';

// Resume templates
import ModernTwoColumn from '../templates/resume/ModernTwoColumn';
import ClassicSingleColumn from '../templates/resume/ClassicSingleColumn';
import CreativeSidebar from '../templates/resume/CreativeSidebar';
import ExecutiveDark from '../templates/resume/ExecutiveDark';
import TechMinimal from '../templates/resume/TechMinimal';
import CompactPro from '../templates/resume/CompactPro';
import FreshGraduate from '../templates/resume/FreshGraduate';
import CorporateBlue from '../templates/resume/CorporateBlue';
import BoldCreative from '../templates/resume/BoldCreative';

import './LivePreview.css';

const TEMPLATES = {
  biodata: {
    'classic-floral':   ClassicFloral,
    'modern-minimal':   ModernMinimal,
    'elegant-premium':  ElegantPremium,
    'royal-mandala':    RoyalMandala,
    'pastel-soft':      PastelSoft,
    'bold-modern':      BoldModern,
    'traditional-red':  TraditionalRed,
    'minimalist-white': MinimalistWhite,
    'ocean-blue':       OceanBlue,
    'warm-earthy':      WarmEarthy,
  },
  resume: {
    'modern-two-column':     ModernTwoColumn,
    'classic-single-column': ClassicSingleColumn,
    'creative-sidebar':      CreativeSidebar,
    'executive-dark':        ExecutiveDark,
    'tech-minimal':          TechMinimal,
    'compact-pro':           CompactPro,
    'fresh-graduate':        FreshGraduate,
    'corporate-blue':        CorporateBlue,
    'bold-creative':         BoldCreative,
  },
};

const LivePreview = () => {
  const { formData, selectedTemplate, customization, docType } = useFormStore();

  const templates = TEMPLATES[docType] || TEMPLATES.biodata;
  const TemplateComponent = templates[selectedTemplate] || Object.values(templates)[0];

  return (
    <div className="live-preview-wrapper">
      <div
        id="live-preview-content"
        className="live-preview-page"
        style={{
          fontFamily: customization?.fontFamily || 'Inter',
          fontSize: `${customization?.fontSize || 14}px`,
          backgroundColor: customization?.bgColor || '#ffffff',
          color: customization?.textColor || '#1A1A2E',
        }}
      >
        {TemplateComponent ? (
          <TemplateComponent
            data={formData}
            customization={customization}
          />
        ) : (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
            <p>No template selected</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LivePreview;
