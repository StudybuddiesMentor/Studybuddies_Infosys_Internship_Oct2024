import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MainDeck = ({ title, imageUrl, deckId, upvotes, downvotes }) => {

  // Default image URL for decks without an image
  const defaultImageUrl =
    "https://i.pinimg.com/736x/1f/61/74/1f6174a908f416f625bc02173ee7f00a.jpg";
  const navigate = useNavigate();

  const handleOpenDeck = () => {
    navigate(`/view-deck/${deckId}`); // Navigate to ViewDeckPage with deck ID
  };

  return (
    <div className="overflow-hidden h-full rounded-lg bg-gray-100 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 p-4 transition-all duration-500 relative">
      <img
        src={imageUrl || defaultImageUrl} // Use the provided imageUrl or the default image
        alt={title}
        className="absolute inset-0 h-full w-full object-cover rounded-lg opacity-50 group-hover:opacity-70 transition-opacity duration-500"
      />
      <div className="relative z-10 flex flex-col h-full">
        <h4 className="font-bold text-xl mb-2 pt-36 text-gray-800 group-hover:text-white">
          {title}
        </h4>
        {/* Action Buttons */}
        <div className="flex justify-evenly ">
          <span
            className={`text-lg bg-green-100 text-green-500 px-3 py-1 rounded cursor-pointer`}
          >
            👍 {upvotes}
          </span>
          <span
            className={`text-lg bg-red-100 text-red-500 px-3 py-1 rounded cursor-pointer`}
          >
            👎 {downvotes}
          </span>
          <button
          className="bg-gradient-to-r from-white to-green-300  px-9 py-2 rounded-full shadow-md hover:bg-gradient-to-r hover:from-white hover:to-green-200 transition-colors duration-300 "
          onClick={handleOpenDeck}
        >
          Open Deck
        </button>
        </div>
        
      </div>
    </div>
  );
};

export default MainDeck;
