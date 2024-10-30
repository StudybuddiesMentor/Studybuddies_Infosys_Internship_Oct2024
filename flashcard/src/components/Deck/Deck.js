import React from 'react';

function Deck() {
  return (
    <div className="flex flex-col items-start bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-4">Decks</h2>
      <button className="bg-blue-100 p-2 rounded-md w-full text-left">Created Decks</button>
      <button className="bg-blue-100 p-2 rounded-md w-full mt-2 text-left">Decks Liked</button>
      <button className="bg-blue-100 p-2 rounded-md w-full mt-2 text-left">Favorite Decks</button>
    </div>
  );
}

export default Deck;
