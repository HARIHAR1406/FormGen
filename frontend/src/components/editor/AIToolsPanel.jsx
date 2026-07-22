import React, { useState } from 'react';
import { FiCheckCircle, FiAlertCircle, FiCpu, FiStar, FiFileText, FiMessageSquare } from 'react-icons/fi';
import toast from 'react-hot-toast';
import useFormStore from '../../store/useFormStore';
import InterviewPrepModal from './InterviewPrepModal';
import './AIToolsPanel.css';

const AIToolsPanel = () => {
  const { formData, docType } = useFormStore();
  
  const [jobDescription, setJobDescription] = useState('');
  const [loadingScore, setLoadingScore] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [showInterviewModal, setShowInterviewModal] = useState(false);

  const handleAnalyze = async () => {
    setLoadingScore(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/ai/analyze-resume`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resumeData: formData, jobDescription: jobDescription.trim() }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze');
      }

      setAnalysisResult(data);
      toast.success('Analysis complete!');
    } catch (error) {
      toast.error(error.message || 'Error communicating with AI service');
    } finally {
      setLoadingScore(false);
    }
  };

  return (
    <div className="ai-tools-panel">
      <div className="panel-header">
        <h2><FiCpu size={20} /> AI Intelligence Center</h2>
        <p>Leverage Gemini AI to optimize your document.</p>
      </div>

      <div className="ai-tool-section">
        <h3><FiStar size={16} /> ATS Checker & Job Match</h3>
        <p className="text-muted text-sm" style={{ marginBottom: '1rem' }}>
          Paste a Job Description below to see how well your {docType} matches the requirements, or leave it blank for a general ATS format check.
        </p>

        <textarea
          className="form-input"
          placeholder="Paste Job Description here..."
          rows={5}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        
        <button 
          className="btn btn-primary w-full" 
          onClick={handleAnalyze} 
          disabled={loadingScore}
          style={{ marginTop: '1rem' }}
        >
          {loadingScore ? 'Analyzing...' : 'Run Analysis'}
        </button>
      </div>

      {analysisResult && (
        <div className="ai-results-section">
          <div className="score-card">
            <div className="score-circle">
              <span className="score-number">{analysisResult.score || analysisResult.matchPercentage || 0}</span>
              <span className="score-label">Score</span>
            </div>
          </div>
          
          {analysisResult.keywordCoverage?.length > 0 && (
            <div className="result-group">
              <h4 className="text-success"><FiCheckCircle /> Matched Keywords</h4>
              <div className="keyword-badges">
                {analysisResult.keywordCoverage.map((kw, i) => (
                  <span key={i} className="badge badge-success">{kw}</span>
                ))}
              </div>
            </div>
          )}

          {analysisResult.missingKeywords?.length > 0 && (
            <div className="result-group">
              <h4 className="text-danger"><FiAlertCircle /> Missing Keywords</h4>
              <div className="keyword-badges">
                {analysisResult.missingKeywords.map((kw, i) => (
                  <span key={i} className="badge badge-danger">{kw}</span>
                ))}
              </div>
            </div>
          )}

          {analysisResult.feedback?.length > 0 && (
            <div className="result-group">
              <h4><FiFileText /> Expert Feedback</h4>
              <ul className="feedback-list">
                {analysisResult.feedback.map((fb, i) => (
                  <li key={i}>{fb}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <hr style={{ margin: '2rem 0', borderColor: 'var(--border-secondary)' }} />

      <div className="ai-tool-section">
        <h3><FiMessageSquare size={16} /> Interview Coach</h3>
        <p className="text-muted text-sm" style={{ marginBottom: '1rem' }}>
          Generate custom interview questions based precisely on the projects and skills listed in your {docType}.
        </p>
        <button 
          className="btn btn-secondary w-full" 
          onClick={() => setShowInterviewModal(true)}
        >
          Practice Interview
        </button>
      </div>

      {showInterviewModal && <InterviewPrepModal onClose={() => setShowInterviewModal(false)} />}
    </div>
  );
};

export default AIToolsPanel;
