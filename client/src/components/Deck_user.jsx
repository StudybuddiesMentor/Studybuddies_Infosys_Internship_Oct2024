import { useNavigate, useLocation } from "react-router-dom";

const DeckUser = ({ title, description, imageUrl, deckId, tags, status, createdAt }) => {
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
    </div>
  );
};

export default DeckUser;