import React from 'react';
import FlashcardDetails from './FlashcardDetails';

function FlashcardList() {
  return (
    <div>
      <h2>Flashcards</h2>
      <FlashcardDetails title="Flashcard 1" />
      <FlashcardDetails title="Flashcard 2" />
    </div>
  );
}

export default FlashcardList;
