import { useState } from "react";
import PropTypes from 'prop-types';
// import "./DeckEditor.css";

function DeckEditor({ initialDeck, onSave }) {
  const [deckTitle, setDeckTitle] = useState(initialDeck.title);
  const [deckDescription, setDeckDescription] = useState(initialDeck.description);
  const [tags, setTags] = useState(initialDeck.tags);
  const [newTag, setNewTag] = useState("");
  const [flashcards, setFlashcards] = useState(initialDeck.flashcards);

  // Tag functionality
  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const deleteTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  // Flashcard update, delete, add
  const updateFlashcard = (index, field, value) => {
    const updatedFlashcards = [...flashcards];
    updatedFlashcards[index][field] = value;
    setFlashcards(updatedFlashcards);
  };

  const deleteFlashcard = (index) => {
    setFlashcards(flashcards.filter((_, i) => i !== index));
  };

  const addFlashcard = () => {
    setFlashcards([...flashcards, { question: "", answer: "" }]);
  };

  // Save updates
  const saveUpdates = () => {
    const updatedDeck = {
      title: deckTitle,
      description: deckDescription,
      tags: tags,
      flashcards: flashcards,
    };
    onSave(updatedDeck);
    console.log("Updated deck saved:", updatedDeck);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 bg-white shadow-md rounded-lg mt-5">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Edit Deck
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

      {/* Tags */}
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
          <button onClick={addTag} className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-md hover:bg-green-600 transition-colors">
            Add Tag
          </button>
        </div>
        <div className="flex flex-wrap">
          {tags.map((tag, index) => (
            <span key={index} className="bg-green-100 text-green-600 rounded-full px-3 py-1 mr-2 mb-2 flex items-center">
              {tag}
              <button onClick={() => deleteTag(index)} className="ml-2 text-red-600">&times;</button>
            </span>
          ))}
        </div>
      </div>

      {/* Flashcards */}
      <h3 className="text-xl font-semibold mb-4">Flashcards</h3>
      <div className="mb-6">
        {flashcards.map((card, index) => (
          <div key={index} className="flex mb-4 items-center border-b pb-4">
            <input
              type="text"
              placeholder="Enter question"
              className="border border-gray-300 rounded-lg p-3 flex-1 mr-2 shadow focus:outline-none focus:ring-2 focus:ring-green-300"
              value={card.question}
              onChange={(e) => updateFlashcard(index, "question", e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter answer"
              className="border border-gray-300 rounded-lg p-3 flex-1 mr-2 shadow focus:outline-none focus:ring-2 focus:ring-green-300"
              value={card.answer}
              onChange={(e) => updateFlashcard(index, "answer", e.target.value)}
            />
            <button onClick={() => deleteFlashcard(index)} className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-colors">
              &times;
            </button>
          </div>
        ))}
      </div>

      {/* Add Flashcard */}
      <button onClick={addFlashcard} className="bg-blue-500 text-white px-4 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-colors mb-4">
        + Add Flashcard
      </button>

      {/* Save Button */}
      <button onClick={saveUpdates} className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-colors">
        Save Changes
      </button>
    </div>
  );
}

DeckEditor.propTypes = {
  initialDeck: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    flashcards: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string,
        answer: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
};

export default DeckEditor;