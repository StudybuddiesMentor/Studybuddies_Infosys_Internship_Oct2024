// src/components/explore/ExploreDeckView.jsx
import React from 'react';

const ExploreDeckView = ({ cards }) => {
  return (
    <div>
      <h2>Flashcards</h2>
      {cards.map((card, index) => (
        <div key={index} className="flashcard">
          <p>{card.content}</p> {/* Assuming each card has a 'content' property */}
        </div>
      ))}
    </div>
  );
};

export default ExploreDeckView;
