import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p>&copy; 2024 Medical Summarizer. All rights reserved.</p>
          <p>This tool is for educational purposes only and should not replace professional medical advice.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
