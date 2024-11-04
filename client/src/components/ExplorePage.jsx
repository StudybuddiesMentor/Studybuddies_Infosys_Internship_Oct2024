import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Deck from './Deck_explore'; 

const ExplorePage = () => {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicDecks = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/decks/exploredeck', {
          withCredentials: true, 
        });

        // Accessing the decks array from the response data
        if (response.data.decks && Array.isArray(response.data.decks)) {
          setDecks(response.data.decks); // Set the decks state with the array
        } else {
          setError('Unexpected response format');
        }
      } catch (err) {
        if (err.response) {
          setError(err.response.data.message || 'Failed to fetch decks.');
        } else {
          setError('Network error. Please check your connection or server.');
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicDecks();
  }, []);

  if (loading) {
    return <p>Loading decks...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-4 overflow-y-auto max-h-screen flex flex-col items-center">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {decks.map(deck => (
          <Deck
            key={deck._id}
            title={deck.deck_name} 
            description={deck.description} 
            imageUrl={deck.deck_Image || deck.defaultImageUrl} 
          />
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;

