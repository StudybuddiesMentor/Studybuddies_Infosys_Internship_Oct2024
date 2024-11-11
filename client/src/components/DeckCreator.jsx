import React, { useState } from "react";
import "./DeckCreator.css";

function DeckCreator() {
  const [deckTitle, setDeckTitle] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [flashcards, setFlashcards] = useState([{ question: "", answer: "" }]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
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
    setFlashcards([...flashcards, { question: "", answer: "" }]);
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
    console.log("Deck saved:", deck);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-lg py-4 z-50">
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
                  {["Math", "Science", "Languages", "History"].map(
                    (category) => (
                      <a
                        href={`/category/${category.toLowerCase()}`}
                        key={category}
                        className="block px-4 py-2 text-gray-700 hover:bg-green-100 transition-colors"
                      >
                        {category}
                      </a>
                    )
                  )}
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

      <div className="max-w-3xl mx-auto py-10 px-4 bg-white shadow-md rounded-lg mt-5">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create a New Deck with Flashcards
        </h2>

        {/* Deck Title and Description */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Enter a title for your deck"
            className="border border-gray-300 rounded-lg w-full p-4 mb-2 shadow focus:outline-none focus:ring-2 focus:ring-green-300"
            value={deckTitle}
            onChange={(e) => setDeckTitle(e.target.value)}
          />
          <textarea
            placeholder="Description (optional)"
            className="border border-gray-300 rounded-lg w-full p-4 shadow focus:outline-none focus:ring-2 focus:ring-green-300"
            value={deckDescription}
            onChange={(e) => setDeckDescription(e.target.value)}
            rows="3"
          />
        </div>

        {/* Tag Input */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Tags</h3>
          <div className="flex mb-2">
            <input
              type="text"
              placeholder="Add a tag"
              className="border border-gray-300 rounded-lg p-4 flex-1 mr-2 shadow focus:outline-none focus:ring-2 focus:ring-green-300"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
            />
            <button
              onClick={addTag}
              className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-md hover:bg-green-600 transition-colors"
            >
              Add Tag
            </button>
          </div>
          <div className="flex flex-wrap">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-green-100 text-green-600 rounded-full px-3 py-1 mr-2 mb-2 flex items-center"
              >
                {tag}
                <button
                  onClick={() => handleTagDelete(index)}
                  className="ml-2 text-red-600"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Flashcard Input List */}
        <h3 className="text-xl font-semibold mb-4">Flashcards</h3>
        <div className="mb-6">
          {flashcards.map((card, index) => (
            <div key={index} className="flex mb-4 items-center border-b pb-4">
              <input
                type="text"
                placeholder="Enter topic"
                className="border border-gray-300 rounded-lg p-3 flex-1 mr-2 shadow focus:outline-none focus:ring-2 focus:ring-green-300"
                value={card.question}
                onChange={(e) =>
                  updateFlashcard(index, "question", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Enter information"
                className="border border-gray-300 rounded-lg p-3 flex-1 mr-2 shadow focus:outline-none focus:ring-2 focus:ring-green-300"
                value={card.answer}
                onChange={(e) =>
                  updateFlashcard(index, "answer", e.target.value)
                }
              />
              <button
                onClick={() => deleteFlashcard(index)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-colors"
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        {/* Add Flashcard Button */}
        <button
          onClick={addFlashcard}
          className="bg-blue-500 text-white px-4 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-colors mb-4"
        >
          + Add Flashcard
        </button>

        {/* Save Deck Button */}
        <button
          onClick={saveDeck}
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-colors"
        >
          Save Deck
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-white py-4 shadow-lg mt-10">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">
            © 2024 Study Buddies. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="/privacy" className="text-gray-600 hover:text-green-500">
              Privacy Policy
            </a>
            <a href="/terms" className="text-gray-600 hover:text-green-500">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default DeckCreator;
