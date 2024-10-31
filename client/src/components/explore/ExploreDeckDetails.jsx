// src/components/explore/ExploreDeckDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ExploreDeckView from './ExploreDeckView';

const ExploreDeckDetails = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);

  useEffect(() => {
    const fetchDeckDetails = async () => {
      try {
        const response = await fetch(`/api/decks/${deckId}`); // Your actual API endpoint
        const data = await response.json();
        setDeck(data);
      } catch (error) {
        console.error('Error fetching deck details:', error);
      }
    };

    fetchDeckDetails();
  }, [deckId]);

  if (!deck) return <div>Loading...</div>;

  return (
    <div>
      <h1>{deck.title}</h1>
      <p>{deck.description}</p>
      <ExploreDeckView cards={deck.cards} />
    </div>
  );
};

export default ExploreDeckDetails;
