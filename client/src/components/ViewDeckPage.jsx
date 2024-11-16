import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Flashcard from './Flashcard';
import { useParams } from 'react-router-dom';

const ViewDeckPage = () => {
  const { id: deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/api/decks/${deckId}`, {
          withCredentials: true,
        });

        if (response.data.deck) {
          setDeck(response.data.deck);
        } else {
          setError('Deck not found.');
        }
      } catch (err) {
        setError('Failed to fetch the deck.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDeck();
  }, [deckId]);

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `http://localhost:9000/api/decks/like/${deckId}`,
        {},
        { withCredentials: true }
      );
      setLiked(response.data.liked); // Update liked status
    } catch (err) {
      setError('Failed to like the deck.');
      console.error(err);
    }
  };

  if (loading) {
    return <p>Loading deck...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-6 flex flex-col space-y-6">
      <h1 className="text-3xl font-bold text-left">You opened {deck.deck_name} Deck</h1>
      <p className="text-lg text-center">{deck.description}</p>
      <img
        src={deck.deck_image?.url || '/path/to/default/image.jpg'}
        alt={deck.deck_name}
        className="w-60 h-60 object-cover rounded-md"
      />

      <button
        onClick={handleLike}
        className={`px-4 py-2 mt-4 ${liked ? 'bg-blue-500' : 'bg-gray-500'} text-white rounded-lg`}
      >
        {liked ? 'Liked' : 'Like'}
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {deck.flashcards && Array.isArray(deck.flashcards) ? (
          deck.flashcards.map((flashcard) => (
            <Flashcard
              key={flashcard._id}
              question={flashcard.question}
              answer={flashcard.answer}
            />
          ))
        ) : (
          <p>No flashcards found for this deck.</p>
        )}
      </div>
    </div>
  );
};

export default ViewDeckPage;
