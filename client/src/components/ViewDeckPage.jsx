import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Flashcard from './Flashcard';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Nav from './Nav';
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";

const ViewDeckPage = () => {
  const defaultImageUrl = 'https://i.pinimg.com/736x/1f/61/74/1f6174a908f416f625bc02173ee7f00a.jpg';
  const location = useLocation();
  const navigate = useNavigate();
  const { id: deckId } = useParams();

  const [deck, setDeck] = useState(null);
  const [tags, setTags] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [flashcards, setFlashcards] = useState([]);
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);

  useEffect(() => {
    // Ensure the page scrolls to the top whenever this component is loaded
    window.scrollTo(0, 0);
    const fetchDeckAndFlashcards = async () => {
      try {
        const deckResponse = await axios.get(
          `http://localhost:9000/api/decks/${deckId}`,
          { withCredentials: true }
        );
        console.log(deckResponse.data);
        const { tags, deck, hasUpvoted, hasDownvoted } = deckResponse.data;

        setTags(tags);
        setDeck(deck);
        setUpvotes(deck.upvotes.length);
        setDownvotes(deck.downvotes.length);
        setHasUpvoted(hasUpvoted);
        setHasDownvoted(hasDownvoted);

        const flashcardsResponse = await axios.get(
          `http://localhost:9000/api/cards/${deckId}`,
          { withCredentials: true }
        );
        setFlashcards(flashcardsResponse.data.cards || []);
      } catch (err) {
        setError('Failed to fetch deck or flashcards.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDeckAndFlashcards();
  }, [deckId]);

  const handleBack = () => {
    // Redirect based on the previous route
    if (location.state?.from === '/explore-admin') {
      navigate('/explore-admin');
    } else {
      navigate('/explore');
    }
  };
// Show a loading message while the decks are being fetched
if (loading) {
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-semibold text-gray-600">Loading decks...</p>
    </div>
  );
}

// Show an error message if there is an issue fetching decks
if (error) {
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-semibold text-red-500">
        {error}
      </p>
    </div>
  );
}

  return (
    <div className="p-6">
      <Nav />
      <button
        onClick= {handleBack}
        className="mb-6 px-4 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-700"
      >
        ← Back
      </button>

      {/* Deck Details */}
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold">{deck.deck_name}</h1>
          <p className="text-gray-600 mt-2">{deck.description}</p>
          <img
            src={deck.deck_image?.url || defaultImageUrl}
            alt={deck.description}
            className="w-full h-60 object-cover rounded-lg mt-4"
          />
        </div>

        {/* Voting and Tags */}
        <div className="flex justify-between items-center mt-6">
          <div className="flex space-x-4">
            <button
              className={`px-6 py-2 rounded-lg text-white ${
                hasUpvoted ? 'bg-green-500' : 'bg-gray-400'
              }`}
            >
              <AiFillLike className='text-blue-500 text-xl' /> {upvotes}
            </button>
            <button
              className={`px-6 py-2 rounded-lg text-white ${
                hasDownvoted ? 'bg-red-500' : 'bg-gray-400'
              }`}
            >
              <AiFillDislike className='text-red-500 text-xl' /> {downvotes}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags?.length > 0 ? (
              tags.map((tag) => (
                <span
                  key={tag._id}
                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
                >
                  #{tag.name}
                </span>
              ))
            ) : (
              <p>No tags available</p>
            )}
          </div>
        </div>
      </div>

      {/* Flashcards */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {flashcards.length > 0 ? (
          flashcards.map((flashcard) => (
            <Flashcard
              key={flashcard._id}
              question={flashcard.Title}
              answer={flashcard.Content}
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
