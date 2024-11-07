import React from 'react';

function Flashcard() {
  return (
    <div className="flex flex-col items-start bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-4">Flashcards</h2>
      <button className="bg-blue-100 p-2 rounded-md w-full text-left">Created Flashcards</button>
      <button className="bg-blue-100 p-2 rounded-md w-full mt-2 text-left">Flashcards Liked</button>
      <button className="bg-blue-100 p-2 rounded-md w-full mt-2 text-left">Favorite Flashcards</button>
    </div>
  );
}

export default Flashcard;
