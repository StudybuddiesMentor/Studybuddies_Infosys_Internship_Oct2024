// src/components/DeckItem.jsx
import React, { useState } from 'react';

const DeckItem = ({ deck }) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg flex justify-between items-center bg-white">
      <div>
        <h3 className="text-lg font-semibold">{deck.title}</h3>
        <p className="text-gray-500">By {deck.author}</p>
        <p>{deck.cards} cards, posted on {deck.date}</p>
      </div>
      <div className="text-right">
        <p
          className={`text-red-500 cursor-pointer ${liked ? 'text-red-500' : 'text-gray-400'}`}
          onClick={toggleLike}
        >
          ❤️ {liked ? deck.likes + 1 : deck.likes}
        </p>
      </div>
    </div>
  );
};

export default DeckItem;
