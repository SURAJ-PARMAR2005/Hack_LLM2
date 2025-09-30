import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Summarize.css';

const Summarize = () => {
  const [qaText, setQaText] = useState('');
  const [summaryType, setSummaryType] = useState('both');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const endpoint = 'https://hack-llm2.onrender.com/summarize';

      let response;
      if (file) {
        const form = new FormData();
        form.append('summaryType', summaryType);
        if (qaText?.trim()) form.append('userInput', qaText.trim());
        form.append('file', file);
        response = await fetch(endpoint, {
          method: 'POST',
          body: form
        });
      } else {
        response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userInput: qaText, summaryType })
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        // Navigate to results page with real API data
        navigate('/results', { 
          state: { 
            qaText, 
            summaryType,
            patientSummary: data.summaries.patientSummary,
            clinicianSummary: data.summaries.clinicianSummary,
            timestamp: data.timestamp,
            disclaimer: data.disclaimer
          }
        });
      } else {
        throw new Error(data.error || 'Failed to generate summary');
      }
    } catch (error) {
      console.error('Error calling API:', error);
      setError(error.message || 'Failed to generate summary. Check backend logs.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    const f = e.target.files[0];
    setFile(f || null);
    if (f && f.type.startsWith('text/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setQaText(event.target.result);
      };
      reader.readAsText(f);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Generate Medical Summary</h1>
          <p className="page-subtitle">
            Paste your Q&A text or upload a file to get instant medical summaries powered by AI
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="card">
            {error && (
              <div style={{ 
                backgroundColor: '#fee2e2', 
                color: '#dc2626', 
                padding: '1rem', 
                borderRadius: '0.5rem', 
                marginBottom: '1rem',
                border: '1px solid #fecaca'
              }}>
                <strong>Error:</strong> {error}
                <br />
                <small>Make sure to start the backend server with: <code>cd backend && start /B node server.js</code></small>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="qaText" className="form-label">
                  Q&A Text
                </label>
                <textarea
                  id="qaText"
                  className="form-input form-textarea"
                  placeholder="Paste your medical Q&A text here... (e.g., 'Patient has high blood pressure')"
                  value={qaText}
                  onChange={(e) => setQaText(e.target.value)}
                  required={!file}
                />
                <small style={{ color: 'var(--gray-500)', marginTop: '0.5rem', display: 'block' }}>
                  💡 <strong>Try these examples:</strong> "Patient has high blood pressure", "Patient reports headaches", "Patient has diabetes type 2"
                </small>
              </div>

              <div className="form-group">
                <label className="form-label">File Upload</label>
                <input
                  type="file"
                  accept=".pdf,.txt"
                  onChange={handleFileUpload}
                  className="form-input"
                />
                <small style={{ color: 'var(--gray-500)', marginTop: '0.5rem', display: 'block' }}>
                  Supported formats: PDF, TXT
                </small>
              </div>

              <div className="form-group">
                <label className="form-label">Summary Type</label>
                <div className="form-radio-group">
                  <label className="form-radio">
                    <input
                      type="radio"
                      name="summaryType"
                      value="patient"
                      checked={summaryType === 'patient'}
                      onChange={(e) => setSummaryType(e.target.value)}
                    />
                    Patient-friendly only
                  </label>
                  <label className="form-radio">
                    <input
                      type="radio"
                      name="summaryType"
                      value="clinician"
                      checked={summaryType === 'clinician'}
                      onChange={(e) => setSummaryType(e.target.value)}
                    />
                    Clinician-focused only
                  </label>
                  <label className="form-radio">
                    <input
                      type="radio"
                      name="summaryType"
                      value="both"
                      checked={summaryType === 'both'}
                      onChange={(e) => setSummaryType(e.target.value)}
                    />
                    Both summaries
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-large"
                disabled={isLoading || (!qaText.trim() && !file)}
                style={{ width: '100%' }}
              >
                {isLoading ? 'Generating Summary...' : 'Generate Summary'}
              </button>
            </form>

            <div style={{ 
              marginTop: '2rem', 
              padding: '1rem', 
              backgroundColor: '#f0f9ff', 
              borderRadius: '0.5rem',
              border: '1px solid #bae6fd'
            }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#0369a1' }}>🔍 How It Works</h4>
              <p style={{ margin: '0', fontSize: '0.9rem', color: '#0c4a6e' }}>
                The system analyzes your input text and matches it with our medical knowledge base to generate:
              </p>
              <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem', fontSize: '0.9rem', color: '#0c4a6e' }}>
                <li><strong>Patient-friendly summaries:</strong> Easy-to-understand explanations for patients and families</li>
                <li><strong>Clinician-focused summaries:</strong> Technical medical details for healthcare professionals</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summarize;
