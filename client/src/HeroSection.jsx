// HeroSection.js

import React from 'react';
import './HeroSection.css';
import heroImage from '../assets/heroSection.jpg'; 

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-text">
        <h1>Create flashcards</h1>
        <h2>
          Share with friends, <br /> <br />
          and explore study decks!
        </h2>
        <br />
        <button className="hero-button">Create <span>&#43;</span></button> 
      </div>
      <div className="hero-image">
        <img src={heroImage} alt="People collaborating" />
      </div>
    </div>
  );
};

export default HeroSection;
