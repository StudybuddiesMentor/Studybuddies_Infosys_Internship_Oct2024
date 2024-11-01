import React from 'react';
import Deck from './Deck_explore'; // Import the Deck component

const generateDecks = (num) => {
  return Array.from({ length: num }, (_, index) => ({
    id: index + 1,
    title: `Deck ${index + 1}`,
    description: `Description for Deck ${index + 1}`,
    imageUrl: `https://via.placeholder.com/150/3498db/ffffff?text=Deck+${index + 1}`, // Placeholder image URL
  }));
};

const ExplorePage = () => {
  // Simulated deck data
  const decks = generateDecks(20); // Generate 20 decks

  return (
    <div className="p-4 overflow-y-auto max-h-screen flex flex-col items-center">
      {/* Background div removed */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {decks.map(deck => (
          <Deck key={deck.id} title={deck.title} description={deck.description} imageUrl={deck.imageUrl} />
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
