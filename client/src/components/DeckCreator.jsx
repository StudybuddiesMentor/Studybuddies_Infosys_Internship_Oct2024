import React, { useState } from 'react';
import './DeckCreator.css';

function DeckCreator() {
  const [deckTitle, setDeckTitle] = useState('');
  const [deckDescription, setDeckDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [flashcards, setFlashcards] = useState([{ question: '', answer: '' }]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleTagDelete = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const updateFlashcard = (index, field, value) => {
    const updatedFlashcards = [...flashcards];
    updatedFlashcards[index][field] = value;
    setFlashcards(updatedFlashcards);
  };

  const addFlashcard = () => {
    setFlashcards([...flashcards, { question: '', answer: '' }]);
  };

  const deleteFlashcard = (index) => {
    setFlashcards(flashcards.filter((_, i) => i !== index));
  };

  const saveDeck = () => {
    const deck = {
      title: deckTitle,
      description: deckDescription,
      tags: tags,
      flashcards: flashcards,
    };
    console.log('Deck saved:', deck);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-white py-4 z-50">
        <div className="container mx-auto flex flex-wrap justify-between items-center px-6">
          {/* Logo */}
          <img
            src="https://raw.githubusercontent.com/StudybuddiesMentor/Studybuddies_Infosys_Internship_Oct2024/refs/heads/main/client/src/assets/logo.png"
            alt="Study Buddy Logo"
            className="rounded-full w-14 h-14 hover:scale-105 transition-transform duration-300"
          />

          {/* Search Bar */}
          <div className="flex-1 mx-6 order-2 lg:order-1">
            <input
              type="text"
              placeholder="Search flashcards..."
              className="border rounded-full px-4 py-2 w-full shadow-md focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 order-1 lg:order-2">
            <button className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300">
              Create Deck
            </button>

            {/* Category Dropdown */}
            <div className="relative">
              <button
                className="px-4 py-2 flex items-center bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="mr-2 text-gray-700">Categories</span>
                <img
                  src="https://icons.veryicon.com/png/o/miscellaneous/massager/drop-down-arrow-3.png"
                  alt="Dropdown Arrow"
                  className="h-5"
                />
              </button>
              {dropdownOpen && (
                <div
                  id="categoryDropdown"
                  className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10"
                >
                  {["Math", "Science", "Languages", "History"].map((category) => (
                    <a
                      href={`/category/${category.toLowerCase()}`}
                      key={category}
                      className="block px-4 py-2 text-gray-700 hover:bg-green-100 transition-colors"
                    >
                      {category}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Additional Links */}
            {["Help", "Explore"].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-gray-700 hover:text-green-500"
              >
                {item}
              </a>
            ))}

            {/* Profile Icon */}
            <a href="#">
              <img
                src="https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png"
                alt="User"
                className="rounded-full w-10 h-10 shadow-lg p-1 hover:scale-105 transition-transform duration-300"
              />
            </a>
          </div>
        </div>
      </nav>

      <div className="flashcard-deck-creator">
        <h2 className="title">Create a New Deck with Flashcards</h2>

        {/* Deck Title and Description */}
        <div className="deck-info">
          <div className="input-container">
            <input
              type="text"
              placeholder="Enter a title for your deck"
              className="input-field"
              value={deckTitle}
              onChange={(e) => setDeckTitle(e.target.value)}/>
            <label htmlFor="input-field" className="input-label">Please enter a title to create your set.</label>
            <span className="input-highlight"></span>
          </div>
          <textarea
            placeholder="Description (optional)"
            className="desc-input"
            value={deckDescription}
            onChange={(e) => setDeckDescription(e.target.value)}
          />
        </div>

        {/* Tag Input */}
        <div className="tag-section">
          <div className="tag-input-container">
            <input
              type="text"
              placeholder="Add a tag"
              className="input"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
            />
            <button onClick={addTag} className="add-tag-button">Add Tag</button>
          </div>
          <div className="tag-list">
            {tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
                <button onClick={() => handleTagDelete(index)} className="tag-delete">&times;</button>
              </span>
            ))}
          </div>
        </div>

        {/* Flashcard Input List */}
        <h3 className="subtitle">Flashcards</h3>
        <div className="flashcard-list">
          {flashcards.map((card, index) => (
            <div key={index} className="flashcard">
              <input
                type="text"
                placeholder="Enter topic"
                className="flashcard-input"
                value={card.question}
                onChange={(e) => updateFlashcard(index, 'question', e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter information"
                className="flashcard-input"
                value={card.answer}
                onChange={(e) => updateFlashcard(index, 'answer', e.target.value)}
              />
              <button onClick={() => deleteFlashcard(index)} className="delete-flashcard-button">&times;</button>
            </div>
          ))}
        </div>

        {/* Add Flashcard Button */}
        <button onClick={addFlashcard} className="add-flashcard-button">+ Add Flashcard</button>

        {/* Save Deck Button */}
        <button onClick={saveDeck} className="save-deck-button">Save Deck</button>
      </div>
    </div>
  );
}

export default DeckCreator;
