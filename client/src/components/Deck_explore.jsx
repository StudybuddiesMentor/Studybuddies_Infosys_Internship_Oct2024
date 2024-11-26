import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Deck = ({ title, description, imageUrl, deckId, tags, status, createdAt, upvotes, downvotes, setMessage  }) => {
  const defaultImageUrl =
    "https://i.pinimg.com/736x/1f/61/74/1f6174a908f416f625bc02173ee7f00a.jpg";
  const navigate = useNavigate();
  const location = useLocation();

  // States to handle votes
  const [upvoteCount, setUpvoteCount] = useState(upvotes);
  const [downvoteCount, setDownvoteCount] = useState(downvotes);
  const [loading, setLoading] = useState(false);
  const handleOpenDeck = () => {
    if (location.pathname === "/userflashcards") {
      navigate(`/CreateFlashcard/${deckId}`);
    } else {
      navigate(`/view-deck/${deckId}`);
    }
  };

  const handleVote = async (action) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:9000/api/decks/${deckId}/vote`,
        { action },
        { withCredentials: true }
      );
      if (response.data.message.includes("Upvoted")) {
        setUpvoteCount(response.data.upvotes);
        setDownvoteCount(response.data.downvotes);
        // setMessage("Successfully upvoted the deck!"); // Set success message
      } else if (response.data.message.includes("Downvoted")) {
        setUpvoteCount(response.data.upvotes);
        setDownvoteCount(response.data.downvotes);
        // setMessage("Successfully downvoted the deck!"); // Set success message
      }
    } catch (error) {
      console.error("Error in voting:", error);
      setMessage(error.response.data.message); // Set error message from the server
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105 duration-200 flex flex-col justify-between border-2 border-gray-200 w-64">
      {/* Deck Image */}
      <img
        src={imageUrl || defaultImageUrl}
        alt={title}
        className="w-full h-32 object-cover rounded-t-lg"
      />

      {/* Deck Information */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
          {title}
        </h3>
        <p className="text-sm text-gray-600 mb-3" style={{ fontFamily: "Playfair Display, serif" }}>
          {description}
        </p>
        <p className="text-xs text-gray-500 mb-3">
          Created on: {new Date(createdAt).toLocaleDateString()}
        </p>

        {/* Deck Status */}
        <div className="mb-3">
          <span
            className={`px-2 py-1 text-xs font-semibold rounded ${
              status === "Private" ? "bg-red-100 text-red-500" : "bg-green-100 text-green-500"
            }`}
          >
            {status}
          </span>
        </div>

        {/* Tags */}
        <div className="mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full mr-2"
            >
              {tag.name}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <span
            onClick={() => handleVote("upvote")}
            className={`text-sm bg-green-100 text-green-500 px-3 py-1 rounded cursor-pointer`}
          >
            👍 {upvoteCount}
          </span>
          <span
            onClick={() => handleVote("downvote")}
            className={`text-sm bg-red-100 text-red-500 px-3 py-1 rounded cursor-pointer`}
          >
            👎 {downvoteCount}
          </span>
          <button
            onClick={handleOpenDeck}
            className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
          >
            Open Deck
          </button>
        </div>
      </div>
    </div>
  );
};

export default Deck;
