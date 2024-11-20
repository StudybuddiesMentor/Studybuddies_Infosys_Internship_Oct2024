import React, { useEffect, useState } from 'react';// Import necessary hooks from React
import axios from 'axios';// Import Axios for HTTP requests
import Flashcard from './Flashcard';// Import the Flashcard component
import { useParams } from 'react-router-dom'; // Import useParams to extract route parameters

const ViewDeckPage = () => {
  // Extract deck ID from the URL parameters
  const { id: deckId } = useParams();
  // State variables
  const [deck, setDeck] = useState(null); // Store the deck data
  const [error, setError] = useState(''); // Store any error message
  const [loading, setLoading] = useState(true); // Track loading state
  const [liked, setLiked] = useState(false); // Track whether the deck is liked
  const [flashcards, setFlashcards] = useState([]); // Store flashcards

   // Fetch deck data when the component mounts or when deckId changes
   useEffect(() => {
    const fetchDeckAndFlashcards = async () => {
      try {
        // Fetch deck details
        const deckResponse = await axios.get(
         `http://localhost:9000/api/decks/${deckId}`,
          { withCredentials: true }
        );
  
        if (deckResponse.data.deck) {
          setDeck(deckResponse.data.deck); // Set deck data
        } else {
          setError("Deck not found.");
          return;
        }
  
        // Fetch flashcards for the deck
        const flashcardsResponse = await axios.get(
          `http://localhost:9000/api/cards/${deckId}`,
          { withCredentials: true }
        );
  
        // Handle cards response
        setFlashcards(flashcardsResponse.data.cards || []);
      } catch (err) {
        setError("Failed to fetch deck or flashcards.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDeckAndFlashcards();
  }, [deckId]);
  // Dependency array includes deckId to refetch if it changes

  // Handle the "Like" button click
  const handleLike = async () => {
    try {
      // Make a POST request to like the deck
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
   // Show a loading message while the deck data is being fetched
  if (loading) {
    return <p>Loading deck...</p>;
  }

  // Display an error message if something goes wrong
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
        {flashcards.length > 0 ? (
          flashcards.map((flashcard) => (
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