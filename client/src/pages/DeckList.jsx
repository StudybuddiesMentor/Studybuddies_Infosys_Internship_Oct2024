import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import DeckFilter from '../components/DeckFilter';

const DeckList = () => {
  const savedDecks = JSON.parse(localStorage.getItem('decks')) || [];
  const userId = localStorage.getItem('userId') || 'user1'; // Simulate logged-in user
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const [decks, setDecks] = useState(savedDecks);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newDeck, setNewDeck] = useState({
    title: '',
    author: '',
    cards: 1, // Default value for the card count
    date: new Date().toLocaleDateString(),
    likes: 0,
    creatorId: userId,
  });

  const [editingDeck, setEditingDeck] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('decks', JSON.stringify(decks));
  }, [decks]);

  const handleCreateDeck = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newCardCount = newDeck.cards; // Use the user-provided card count
    setDecks([...decks, { ...newDeck, cards: newCardCount, id: decks.length + 1 }]);
    setNewDeck({ title: '', author: '', cards: newCardCount, date: new Date().toLocaleDateString(), likes: 0, creatorId: userId });
    setShowForm(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleLikeClick = (id) => {
    setDecks(decks.map(deck => {
      if (deck.id === id) {
        const userLikes = JSON.parse(localStorage.getItem('userLikes')) || {};
        const userLikedDecks = userLikes[userId] || [];
        const isLiked = userLikedDecks.includes(id);

        let updatedDeck;
        if (isLiked) {
          updatedDeck = { ...deck, likes: Math.max(deck.likes - 1, 0) };
          const updatedUserLikedDecks = userLikedDecks.filter(deckId => deckId !== id);
          userLikes[userId] = updatedUserLikedDecks;
        } else {
          updatedDeck = { ...deck, likes: deck.likes + 1 };
          userLikes[userId] = [...userLikedDecks, id];
        }
        localStorage.setItem('userLikes', JSON.stringify(userLikes));
        return updatedDeck;
      }
      return deck;
    }));
  };

  const handleEditClick = (deck) => {
    setEditingDeck(deck);
    setShowModal(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setDecks(decks.map(deck => {
      if (deck.id === editingDeck.id) {
        return { ...editingDeck };
      }
      return deck;
    }));
    setShowModal(false);
    setEditingDeck(null);
  };

  const handleDeleteClick = (deckId) => {
    setDecks(decks.filter(deck => deck.id !== deckId));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingDeck(null);
  };

  const filteredDecks = decks.filter(deck => deck.title.toLowerCase().includes(searchTerm));

  const handleBackToHome = () => {
    navigate('/main-page'); // Navigate back to the home page
  };

  return (
    <div className="flex flex-col min-h-screen bg-white relative">
      {/* Back to Home button in top-left corner */}
      <button 
        onClick={handleBackToHome} 
        className="absolute top-4 left-4 bg-teal-600 text-white p-2 text-sm rounded-md"
      >
        ⬅️ Back to Home
      </button>

      <div className="flex flex-col md:flex-row p-6 flex-grow">
        {/* Adjusted Deck Filter positioning and size */}
        <div className="flex flex-col gap-4 mt-20 md:mt-0 w-full md:w-1/4"> {/* Responsive width and margin */}
          <DeckFilter />
        </div>

        <div className="flex-grow mt-6 md:mt-0 px-6">
          <div className="flex items-center gap-2 mb-4">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search decks..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="flex-grow p-2 border-2 border-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full shadow-lg"
            />
            <button className="bg-indigo-600 text-white p-2 rounded-md">🔍</button>
          </div>
          <button onClick={handleCreateDeck} className="bg-green-500 text-white p-2 rounded-md mb-4">
            Create a Deck
          </button>

          {showForm && (
            <form onSubmit={handleFormSubmit} className="space-y-4 mb-6">
              <div>
                <input
                  type="text"
                  placeholder="Deck Title"
                  value={newDeck.title}
                  onChange={(e) => setNewDeck({ ...newDeck, title: e.target.value })}
                  required
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Author"
                  value={newDeck.author}
                  onChange={(e) => setNewDeck({ ...newDeck, author: e.target.value })}
                  required
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Number of Cards"
                  value={newDeck.cards}
                  onChange={(e) => setNewDeck({ ...newDeck, cards: parseInt(e.target.value, 10) })}
                  min="1"
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                Save Deck
              </button>
            </form>
          )}

          <div className="space-y-4">
            {filteredDecks.length === 0 ? (
              <p className="text-gray-500">No decks found. Please create a new deck or adjust your search.</p>
            ) : (
              filteredDecks.map((deck) => (
                <div key={deck.id} className="bg-aqua-100 p-4 md:p-6 rounded-lg shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl hover:rotate-8 flex flex-col md:flex-row justify-between items-center">
                  <div className="flex-grow text-center md:text-left">
                    <h3 className="text-xl font-semibold">{deck.title}</h3>
                    <p className="text-gray-500">By <span className="text-blue-500">{deck.author}</span></p> {/* "By" in grey and author name in blue */}
                    <p className="text-gray-500">Cards Created: {deck.cards}</p>
                    <p className="text-gray-400">Created on: {deck.date}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <span className="text-gray-700">{deck.likes} Likes</span>
                    <button onClick={() => handleLikeClick(deck.id)} className="focus:outline-none">
                      {JSON.parse(localStorage.getItem('userLikes'))?.[userId]?.includes(deck.id) ? '❤️' : '🤍'}
                    </button>
                    <button onClick={() => handleEditClick(deck)} className="focus:outline-none">
                      ✏️
                    </button>
                    <button onClick={() => handleDeleteClick(deck.id)} className="focus:outline-none text-red-500">
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-11/12 md:w-1/2 max-w-lg">
            <h3 className="text-xl font-semibold mb-4">Edit Deck</h3>
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={editingDeck.title}
                  onChange={(e) => setEditingDeck({ ...editingDeck, title: e.target.value })}
                  className="p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  value={editingDeck.author}
                  onChange={(e) => setEditingDeck({ ...editingDeck, author: e.target.value })}
                  className="p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
              <div>
                <input
                  type="number"
                  value={editingDeck.cards}
                  onChange={(e) => setEditingDeck({ ...editingDeck, cards: parseInt(e.target.value, 10) })}
                  min="1"
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="flex justify-between">
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                  Save Changes
                </button>
                <button onClick={handleCloseModal} className="bg-gray-500 text-white p-2 rounded-md ml-2">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeckList;
