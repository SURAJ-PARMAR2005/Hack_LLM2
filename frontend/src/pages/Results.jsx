import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Results.css';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  
  // Get data from navigation state or use default values
  const {
    qaText = "Sample Q&A text for demonstration purposes.",
    summaryType = 'both',
    patientSummary = "This is a patient-friendly summary of the medical information. It explains the condition in simple terms that patients and families can easily understand.",
    clinicianSummary = "This is a technical, detailed summary for healthcare professionals. It includes medical terminology, diagnostic criteria, and treatment protocols.",
    timestamp = new Date().toISOString(),
    disclaimer = "This is an AI-generated summary for educational purposes only. Always consult with qualified healthcare professionals for medical advice."
  } = location.state || {};

  const handleNewSummary = () => {
    navigate('/summarize');
  };

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const formatTimestamp = (timestamp) => {
    try {
      return new Date(timestamp).toLocaleString();
    } catch {
      return 'Unknown time';
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Your Medical Summary</h1>
          <p className="page-subtitle">
            AI-generated summaries based on your input
          </p>
          {timestamp && (
            <p style={{ 
              color: 'var(--gray-600)', 
              fontSize: '0.9rem', 
              marginTop: '0.5rem',
              fontStyle: 'italic'
            }}>
              Generated on: {formatTimestamp(timestamp)}
            </p>
          )}
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="results-container">
            {(summaryType === 'patient' || summaryType === 'both') && (
              <div className="results-card patient">
                <h2 className="results-title patient">
                  <span>👥</span>
                  Patient-Friendly Summary
                </h2>
                <div className="card-content">
                  <p style={{ lineHeight: '1.6', fontSize: '1rem' }}>{patientSummary}</p>
                </div>
                <div style={{ 
                  marginTop: '1rem', 
                  padding: '0.75rem', 
                  backgroundColor: '#f0fdf4', 
                  borderRadius: '0.5rem',
                  border: '1px solid #bbf7d0'
                }}>
                  <small style={{ color: '#166534', fontWeight: '500' }}>
                    💡 <strong>For Patients:</strong> This summary is written in simple language to help you understand your medical condition.
                  </small>
                </div>
              </div>
            )}

            {(summaryType === 'clinician' || summaryType === 'both') && (
              <div className="results-card clinician">
                <h2 className="results-title clinician">
                  <span>👨‍⚕️</span>
                  Clinician-Focused Summary
                </h2>
                <div className="card-content">
                  <p style={{ lineHeight: '1.6', fontSize: '1rem' }}>{clinicianSummary}</p>
                </div>
                <div style={{ 
                  marginTop: '1rem', 
                  padding: '0.75rem', 
                  backgroundColor: '#eff6ff', 
                  borderRadius: '0.5rem',
                  border: '1px solid #bfdbfe'
                }}>
                  <small style={{ color: '#1e40af', fontWeight: '500' }}>
                    🔬 <strong>For Healthcare Professionals:</strong> This summary contains technical medical information and clinical guidance.
                  </small>
                </div>
              </div>
            )}
          </div>

          <div className="accordion">
            <div className="accordion-header" onClick={toggleAccordion}>
              <span className="accordion-title">View Original Input (Provenance)</span>
              <span className={`accordion-icon ${isAccordionOpen ? 'open' : ''}`}>
                ▼
              </span>
            </div>
            {isAccordionOpen && (
              <div className="accordion-content">
                <div style={{ 
                  backgroundColor: '#f8fafc', 
                  padding: '1rem', 
                  borderRadius: '0.5rem',
                  border: '1px solid #e2e8f0'
                }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--gray-700)' }}>Your Input:</h4>
                  <p style={{ 
                    whiteSpace: 'pre-wrap', 
                    margin: 0, 
                    lineHeight: '1.5',
                    fontFamily: 'monospace',
                    fontSize: '0.9rem'
                  }}>
                    {qaText}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="disclaimer">
            <span className="disclaimer-icon">⚠️</span>
            <div className="disclaimer-content">
              <span className="disclaimer-text">
                {disclaimer}
              </span>
              <small style={{ 
                display: 'block', 
                marginTop: '0.5rem', 
                opacity: 0.8,
                fontSize: '0.85rem'
              }}>
                This summary is generated by AI and should not replace professional medical consultation, diagnosis, or treatment.
              </small>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button onClick={handleNewSummary} className="btn btn-primary btn-large">
              Generate New Summary
            </button>
          </div>

          <div style={{ 
            marginTop: '2rem', 
            padding: '1rem', 
            backgroundColor: '#fef3c7', 
            borderRadius: '0.5rem',
            border: '1px solid #fbbf24'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#92400e' }}>🔍 Summary Generation Details</h4>
            <p style={{ margin: '0', fontSize: '0.9rem', color: '#78350f' }}>
              <strong>Input Analysis:</strong> The system analyzed your text and matched it with our medical knowledge base to generate relevant summaries.
            </p>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#78350f' }}>
              <strong>AI Processing:</strong> Using intelligent text matching algorithms to provide accurate, context-aware medical summaries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
