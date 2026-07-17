import React, { useState } from 'react';
import { FiX, FiMessageSquare, FiLoader, FiUser, FiCode, FiUsers, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import useFormStore from '../../store/useFormStore';
import './InterviewPrepModal.css';

const InterviewPrepModal = ({ onClose }) => {
  const { formData } = useFormStore();
  const [jobRole, setJobRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5002/api/ai/interview-prep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeData: formData, jobRole: jobRole.trim() }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate questions');
      }

      setQuestions(data);
      toast.success('Interview generated!');
    } catch (error) {
      toast.error(error.message || 'Error generating questions');
    } finally {
      setLoading(false);
    }
  };

  const renderSection = (title, items, icon) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="qa-section">
        <h4 className="qa-title">{icon} {title}</h4>
        <div className="qa-list">
          {items.map((item, i) => (
            <div key={i} className="qa-card">
              <div className="qa-question">Q: {item.question}</div>
              <div className="qa-reason">💡 Why: {item.reason}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content interview-modal">
        <div className="modal-header">
          <h3><FiMessageSquare /> AI Interview Coach</h3>
          <button className="btn-icon" onClick={onClose}><FiX size={22} color="white" strokeWidth="3" /></button>
        </div>

        <div className="modal-body">
          {!questions ? (
            <div className="interview-setup">
              <p className="text-muted">Generate tailored interview questions based on your exact resume experience.</p>
              
              <div className="form-group" style={{ marginTop: '1.5rem' }}>
                <label>Target Job Role (Optional)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Senior Frontend Developer"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                />
              </div>

              <button 
                className="btn btn-primary w-full" 
                onClick={handleGenerate}
                disabled={loading}
                style={{ marginTop: '1rem', padding: '0.75rem' }}
              >
                {loading ? <><FiLoader className="spin" /> Generating...</> : 'Generate Questions'}
              </button>
            </div>
          ) : (
            <div className="interview-results">
              <div className="success-banner">
                <FiCheckCircle className="text-success" /> Generated questions tailored to your profile!
              </div>

              {renderSection('Technical Questions', questions.technical, <FiCode />)}
              {renderSection('Behavioral Questions', questions.behavioral, <FiUsers />)}
              {renderSection('HR & General', questions.hr, <FiUser />)}
              
              <button className="btn btn-secondary w-full" onClick={() => setQuestions(null)} style={{ marginTop: '1rem' }}>
                Generate New Session
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewPrepModal;
