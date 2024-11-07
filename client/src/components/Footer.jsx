import React from 'react';
import './Footer.css';
import studybuddylogo from './assets/temp-logo.jpg'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section contact-form">
          <h2>Contact Us</h2>
          <p>Send us a message</p>
          <form className="footer-form">
            <label htmlFor="name">Full Name</label>
            <input type="text" required id="name" name="name" />

            <label htmlFor="email">Email</label>
            <input type="email" required id="email" name="email" />

            <label htmlFor="message">Your Message</label>
            <textarea id="message" required name="message" rows="4" />
            
            <button type="submit">Submit</button>
          </form>
        </div>

        <div className="footer-section footer-sitemap">
          <h2>Sitemap</h2>
          <ul className="footer-sitemap">
            <li><a href="#home">Home</a></li>
            <li><a href="#about-us">About Us</a></li>
            <li><a href="#feature1">Feature 1</a></li>
            <li><a href="#feature2">Feature 2</a></li>
            <li><a href="#contact-us">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-section contact-info">
          <div className="footer-logo">
            <img src={studybuddylogo} alt="Study Buddies Logo" />
          </div>
          <p><i className="fas fa-phone-alt"></i> +1 (123) 456-7890</p>
          <p><i className="fas fa-envelope"></i> support@studybuddies.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div>&copy; 2024 Study Buddies. All rights reserved.</div>
        <div>
          <a href="#terms-of-service">Terms of Service</a>
          <a href="#privacy-policy">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
