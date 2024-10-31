// src/components/explore/ExploreDeckItem.jsx
import React from 'react';

const ExploreDeckItem = ({ deck, navigate }) => {
  const handleViewDeck = () => {
    navigate(`/decks/${deck.id}`); // Navigate to deck details
  };

  return (
    <div className="deck-item">
      <h2>{deck.title}</h2>
      <p>{deck.description}</p>
      <button onClick={handleViewDeck}>View Deck</button>
    </div>
  );
};

export default ExploreDeckItem;
