// src/components/explore/ExploreDecks.jsx
import React, { useEffect, useState } from 'react';
import ExploreDeckItem from './ExploreDeckItem';
import { useNavigate } from 'react-router-dom';

const ExploreDecks = () => {
  const [decks, setDecks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const response = await fetch('/api/decks'); // Your actual API endpoint
        const data = await response.json();
        setDecks(data);
      } catch (error) {
        console.error('Error fetching decks:', error);
      }
    };

    fetchDecks();
  }, []);

  return (
    <div>
      <h1>Explore Public Decks</h1>
      <div>
        {decks.map(deck => (
          <ExploreDeckItem key={deck.id} deck={deck} navigate={navigate} />
        ))}
      </div>
    </div>
  );
};

export default ExploreDecks;
