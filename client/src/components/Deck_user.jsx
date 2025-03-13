import axios from "axios";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
   
const backendUrl = import.meta.env.VITE_API_URL;

const DeckUser = ({ title, description, imageUrl, deckId, tags, status, createdAt, onDeleteDeck, onSuccess, onError, refreshDecks, }) => {
  const [showPopup, setShowPopup] = useState(false);
  
  const defaultImageUrl =
    "https://i.pinimg.com/736x/1f/61/74/1f6174a908f416f625bc02173ee7f00a.jpg";
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenDeck = () => {
    // Navigate to the appropriate page based on the current location
    if (location.pathname === "/userflashcards") {
      navigate(`/CreateFlashcard/${deckId}`);
    } else {
      navigate(`/view-deck/${deckId}`);
    }
  };

  const handleEditDeck = () => {
    navigate(`/edit-deck/${deckId}`); // Redirect to an edit page for the deck
  };

  const handleDeleteDeck = async () => {
      try {
        await axios.delete(`${backendUrl}/api/decks/${deckId}`, {
          withCredentials: true, // Ensure cookies (auth token) are sent
        });
        if (onDeleteDeck) onDeleteDeck(deckId); // Notify parent component about the deletion
        if (onSuccess) onSuccess(`Deck ${title} deleted successfully!`);
        setShowPopup(false);
        refreshDecks();
      } catch (error) {
        console.error("Error deleting deck:", error);
        if (onError) onError(`Failed to delete the deck ${title}. Please try again.`);
      }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105 duration-200 flex flex-col justify-between border-2 border-gray-200 w-64">

      {/* Dustbin Icon for Deletion */}
      <button
        onClick={() => setShowPopup(true)}
        className="absolute top-2 right-2 bg-gray-200 p-1 rounded-full hover:bg-red-100 transition"
        title="Delete Deck"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
          alt="Delete Icon"
          className="w-5 h-5"
        />
      </button>
      
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
        <div className="flex justify-between">
          <button
            onClick={handleOpenDeck}
            className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
          >
            Open Deck
          </button>
          <button
            onClick={handleEditDeck}
            className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition duration-200"
          >
            Edit Deck
          </button>
        </div>
      </div>
      
      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold mb-4">Delete Deck</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete the <strong>{title}</strong> deck? This action cannot be undone.
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteDeck}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeckUser;
