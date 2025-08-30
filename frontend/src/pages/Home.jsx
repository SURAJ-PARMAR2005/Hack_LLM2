import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="page">
      <section className="hero">
        <div className="container">
          <div className="hero-icon">📋</div>
          <h1 className="hero-title">Medical Summarizer</h1>
          <p className="hero-subtitle">
            Get simplified and technical medical summaries instantly
          </p>
          <div className="hero-buttons">
            <Link to="/summarize" className="btn btn-primary btn-large">
              Try Demo
            </Link>
            <Link to="/summarize" className="btn btn-outline btn-large">
              Upload Q&A
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3 className="feature-title">Patient-Friendly</h3>
              <p className="feature-description">
                Simple, easy-to-understand summaries for patients and families
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👨‍⚕️</div>
              <h3 className="feature-title">Clinician-Focused</h3>
              <p className="feature-description">
                Technical, detailed summaries for healthcare professionals
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">Instant Results</h3>
              <p className="feature-description">
                AI-powered processing for quick and accurate summaries
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
