import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from React Router
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

        if (response.data.decks && Array.isArray(response.data.decks)) {
          setDecks(response.data.decks);
        } else {
          setError('Unexpected response format');
        }
      } catch (err) {
        setError('Failed to fetch decks.');
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
          <div key={deck._id}>
            <Deck
              title={deck.deck_name}
              description={deck.description}
              imageUrl={deck.deck_Image || deck.defaultImageUrl}
            />
            <Link to={`/view-deck/${deck._id}`} className="text-blue-500 hover:underline mt-2">
              View Deck
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
