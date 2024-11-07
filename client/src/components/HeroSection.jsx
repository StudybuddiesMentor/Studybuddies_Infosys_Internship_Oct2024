// HeroSection.js

import React from 'react';
import './HeroSection.css';  // Import CSS
import heroImage from './assets/heroSection.jpg'

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>
          Master Your <span>Knowledge</span> <br /> with Personalized Flashcards...
        </h1>
        <p>
        Organize your learning, create custom decks, and craft flashcards to capture essential notes, ideas, and insights.
        </p>
        <div className="hero-buttons">
          {/* <p><strong> "The more I learn, the more I realize how much I don't know."</strong> – Albert Einstein</p> */}
        </div>
      </div>
      <div className="hero-image">
        <img src={heroImage} alt="" />
      </div>
    </div>
  );
};

export default HeroSection;
