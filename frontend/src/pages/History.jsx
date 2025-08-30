import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './History.css';

const History = () => {
  const navigate = useNavigate();
  
  // Real examples from backend mock data
  const [historyItems] = useState([
    {
      id: 1,
      title: "High Blood Pressure Management",
      date: "2024-01-15",
      summaryType: "both",
      qaText: "Patient has high blood pressure",
      backendData: {
        patientSummary: "Your blood pressure is higher than normal. This means your heart is working harder than it should to pump blood through your body. It's important to follow up with your doctor to discuss lifestyle changes and possibly medication. Reduce salt intake, exercise regularly, and manage stress.",
        clinicianSummary: "Patient presents with elevated blood pressure. Monitor BP readings regularly and consider lifestyle modifications including DASH diet, aerobic exercise, and stress management. Evaluate for secondary causes and adjust antihypertensive therapy as needed based on risk factors and comorbidities."
      }
    },
    {
      id: 2,
      title: "Headache Symptoms Assessment",
      date: "2024-01-14",
      summaryType: "both",
      qaText: "Patient reports headaches",
      backendData: {
        patientSummary: "You're experiencing headaches. These can be caused by many things like stress, lack of sleep, dehydration, or eye strain. Try to stay hydrated, get enough rest, and reduce screen time. If headaches persist or become severe, consult your doctor immediately.",
        clinicianSummary: "Patient reports headache symptoms. Consider differential diagnosis including tension headaches, migraines, cluster headaches, or secondary causes. Assess for red flags: sudden onset, fever, neurological symptoms, or trauma. Recommend appropriate imaging if indicated."
      }
    },
    {
      id: 3,
      title: "Type 2 Diabetes Management",
      date: "2024-01-13",
      summaryType: "both",
      qaText: "Patient has diabetes type 2",
      backendData: {
        patientSummary: "You have type 2 diabetes, which means your body doesn't use insulin properly. Work with your healthcare team to monitor blood sugar, eat a balanced diet, exercise regularly, and take medications as prescribed. Regular check-ups are important.",
        clinicianSummary: "Patient diagnosed with Type 2 Diabetes Mellitus. Implement comprehensive diabetes management including glycemic control targets (HbA1c <7%), blood pressure control (<130/80), and lipid management. Consider metformin as first-line therapy and assess for complications."
      }
    },
    {
      id: 4,
      title: "Chest Pain Evaluation",
      date: "2024-01-12",
      summaryType: "both",
      qaText: "Patient experiencing chest pain",
      backendData: {
        patientSummary: "Chest pain is a serious symptom that requires immediate medical attention. Don't ignore it - call emergency services right away. This could be related to your heart, lungs, or other important organs. Better safe than sorry.",
        clinicianSummary: "Patient reports chest pain - this is a medical emergency requiring immediate evaluation. Assess for cardiac ischemia, pulmonary embolism, aortic dissection, or other life-threatening conditions. Order ECG, cardiac enzymes, and consider urgent cardiac catheterization if STEMI criteria met."
      }
    }
  ]);

  const handleViewDetails = (item) => {
    // Navigate to results page with the real backend data
    navigate('/results', {
      state: {
        qaText: item.qaText,
        summaryType: item.summaryType,
        patientSummary: item.backendData.patientSummary,
        clinicianSummary: item.backendData.clinicianSummary,
        timestamp: new Date(item.date).toISOString(),
        disclaimer: "This is an AI-generated summary for educational purposes only. Always consult with qualified healthcare professionals for medical advice."
      }
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getSummaryTypeLabel = (type) => {
    switch(type) {
      case 'patient':
        return 'Patient-Friendly';
      case 'clinician':
        return 'Clinician-Focused';
      case 'both':
        return 'Both Summaries';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Summary History</h1>
          <p className="page-subtitle">
            View your previously generated medical summaries and test backend integration
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          {/* Backend Integration Test Section */}
          <div className="card" style={{ marginBottom: '2rem', backgroundColor: '#f0f9ff', border: '1px solid #bae6fd' }}>
            <h3 style={{ color: '#0369a1', marginBottom: '1rem' }}>🧪 Test Backend Integration</h3>
            <p style={{ color: '#0c4a6e', marginBottom: '1rem' }}>
              These are real examples from our backend mock data. Click "View Details" to see how the AI generates patient-friendly and clinician-focused summaries.
            </p>
            <div style={{ 
              padding: '1rem', 
              backgroundColor: '#ffffff', 
              borderRadius: '0.5rem',
              border: '1px solid #e2e8f0'
            }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>Available Medical Scenarios:</h4>
              <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem', color: '#475569' }}>
                <li>High blood pressure management</li>
                <li>Headache symptoms assessment</li>
                <li>Type 2 diabetes management</li>
                <li>Chest pain evaluation</li>
                <li>Asthma symptoms</li>
                <li>Fatigue and weakness</li>
                <li>Joint pain and stiffness</li>
                <li>Sleep problems</li>
                <li>Skin rash</li>
                <li>Digestive issues</li>
              </ul>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#64748b' }}>
                <strong>Note:</strong> You can also test with your own text by going to the Summarize page and entering any medical scenario.
              </p>
            </div>
          </div>

          {historyItems.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <h3 style={{ color: 'var(--gray-600)', marginBottom: '1rem' }}>No summaries yet</h3>
              <p style={{ color: 'var(--gray-500)', marginBottom: '2rem' }}>
                Generate your first medical summary to see it here
              </p>
              <button 
                onClick={() => navigate('/summarize')}
                className="btn btn-primary"
              >
                Create Summary
              </button>
            </div>
          ) : (
            <div className="history-grid">
              {historyItems.map((item) => (
                <div key={item.id} className="history-card">
                  <div className="history-card-header">
                    <h3 className="history-card-title">{item.title}</h3>
                    <span className="history-card-date">{formatDate(item.date)}</span>
                  </div>
                  <div className="history-card-content">
                    <p className="history-card-text">{item.qaText}</p>
                    <div className="history-card-meta">
                      <span className="history-card-type">{getSummaryTypeLabel(item.summaryType)}</span>
                      <span style={{ 
                        fontSize: '0.8rem', 
                        color: '#059669', 
                        backgroundColor: '#d1fae5',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.25rem',
                        marginLeft: '0.5rem'
                      }}>
                        ✅ Backend Data
                      </span>
                    </div>
                  </div>
                  <div className="history-card-actions">
                    <button 
                      onClick={() => handleViewDetails(item)}
                      className="btn btn-outline btn-small"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Test Section */}
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button 
              onClick={() => navigate('/summarize')}
              className="btn btn-primary btn-large"
            >
              Generate New Summary
            </button>
            <p style={{ marginTop: '1rem', color: 'var(--gray-600)', fontSize: '0.9rem' }}>
              Try entering medical scenarios like "Patient has asthma symptoms" or "Patient reports fatigue"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
