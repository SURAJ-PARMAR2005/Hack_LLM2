import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">About Medical Summarizer</h1>
          <p className="page-subtitle">
            Learn more about our mission and the team behind this project
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="about-grid">
            <div className="about-section">
              <h2>Our Mission</h2>
              <p>
                Medical Summarizer is designed to bridge the communication gap between healthcare 
                professionals and patients by providing clear, accurate, and accessible medical 
                information summaries. Our goal is to empower patients with knowledge while 
                supporting clinicians with comprehensive technical summaries.
              </p>
            </div>

            <div className="about-section">
              <h2>How It Works</h2>
              <p>
                Our AI-powered system analyzes medical Q&A text and generates two types of 
                summaries: patient-friendly explanations in simple language and detailed 
                technical summaries for healthcare professionals. This dual approach ensures 
                that everyone involved in patient care has access to appropriate information.
              </p>
            </div>

            <div className="about-section">
              <h2>Key Features</h2>
              <ul className="feature-list">
                <li>Instant AI-powered processing</li>
                <li>Dual summary generation (patient & clinician)</li>
                <li>File upload support for various formats</li>
                <li>Secure and private processing</li>
                <li>Responsive design for all devices</li>
                <li>Comprehensive summary history</li>
              </ul>
            </div>

            <div className="about-section">
              <h2>Technology Stack</h2>
              <div className="tech-stack">
                <div className="tech-item">
                  <span className="tech-label">Frontend:</span>
                  <span className="tech-value">React.js, HTML5, CSS3</span>
                </div>
                <div className="tech-item">
                  <span className="tech-label">Styling:</span>
                  <span className="tech-value">Custom CSS with CSS Variables</span>
                </div>
                <div className="tech-item">
                  <span className="tech-label">Routing:</span>
                  <span className="tech-value">React Router DOM</span>
                </div>
                <div className="tech-item">
                  <span className="tech-label">Build Tool:</span>
                  <span className="tech-value">Vite</span>
                </div>
              </div>
            </div>

            <div className="about-section">
              <h2>Team Credits</h2>
              <div className="team-info">
                <p>
                  This project was developed as a demonstration of modern web development 
                  practices and user experience design in the medical technology space.
                </p>
                <p>
                  <strong>Frontend Developer:</strong> React + CSS Specialist<br/>
                  <strong>UI/UX Design:</strong> Medical-themed responsive design<br/>
                  <strong>Project Management:</strong> Full-stack web application
                </p>
              </div>
            </div>

            <div className="about-section">
              <h2>Disclaimer</h2>
              <div className="disclaimer about-disclaimer">
                <span className="disclaimer-icon">⚠</span>
                <div className="disclaimer-content">
                  <p className="disclaimer-text">
                    <strong>Important:</strong> Medical Summarizer is an educational tool and 
                    should not replace professional medical advice, diagnosis, or treatment. 
                    Always consult with qualified healthcare professionals for medical decisions.
                  </p>
                  <p className="disclaimer-text">
                    The summaries generated are for informational purposes only and may not 
                    be comprehensive or up-to-date with the latest medical research.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="about-cta">
            <h3>Ready to Get Started?</h3>
            <p>Try our medical summarization tool today</p>
            <a href="/summarize" className="btn btn-primary btn-large">
              Start Summarizing
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
