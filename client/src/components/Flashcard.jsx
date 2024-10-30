import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import "./Flashcard.css";

const Flashcard = () => {
  const [cards, setCards] = useState([{ question: "", definition: "" }]);
  const [createdFlashcards, setCreatedFlashcards] = useState([]);
  const [lastCreatedTime, setLastCreatedTime] = useState(null); // State to hold the last created time

  // Load flashcards from localStorage on initial render
  useEffect(() => {
    const savedFlashcards = localStorage.getItem("flashcards");
    if (savedFlashcards) {
      setCreatedFlashcards(JSON.parse(savedFlashcards));
    }

    const savedTime = localStorage.getItem("lastCreatedTime");
    if (savedTime) {
      setLastCreatedTime(savedTime);
    }
  }, []);

  // Add a new empty card
  const addCard = () => {
    setCards([...cards, { question: "", definition: "" }]);
  };

  // Update card question or definition
  const updateCard = (index, field, value) => {
    const newCards = [...cards];
    newCards[index][field] = value;
    setCards(newCards);
  };

  // Remove a card from the current set
  const removeCard = (index) => {
    const newCards = cards.filter((_, i) => i !== index);
    setCards(newCards);
  };

  // Create flashcards and save them to localStorage
  const createFlashcards = () => {
    const updatedFlashcards = [...createdFlashcards, ...cards];
    setCreatedFlashcards(updatedFlashcards);

    const currentTime = new Date();
    const formattedTime = `${currentTime.toLocaleDateString()} ${currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;

    setLastCreatedTime(formattedTime);

    // Save flashcards and the creation time to localStorage
    localStorage.setItem("flashcards", JSON.stringify(updatedFlashcards));
    localStorage.setItem("lastCreatedTime", formattedTime);

    // Reset the cards to a single empty card after creation
    setCards([{ question: "", definition: "" }]);
  };

  // Delete a flashcard and update localStorage
  const deleteFlashcard = (index) => {
    const newFlashcards = createdFlashcards.filter((_, i) => i !== index);
    setCreatedFlashcards(newFlashcards);
    localStorage.setItem("flashcards", JSON.stringify(newFlashcards)); // Update localStorage
  };

  // Handle input in editable divs
  const handleDivInput = (e, index, field) => {
    updateCard(index, field, e.target.innerText);
  };

  return (
    <div className="flashcard-container">
      <div className="header">
        <h1>Create a new flashcard set</h1>
        <div className="last-created-time">{lastCreatedTime && `Last Created: ${lastCreatedTime}`}</div> {/* Display last created time */}
      </div>

      <div
        className="title-input"
        contentEditable="true"
        data-placeholder="Enter a Title"
      ></div>

      <div
        className="description-input"
        contentEditable="true"
        data-placeholder="Description..."
      ></div>

      <div className="flashcards-wrapper">
        {cards.map((card, index) => (
          <div className="flashcard" key={index}>
            <div className="card-number">{index + 1}</div>
            <div className="card-inputs">
              <div
                contentEditable="true"
                data-placeholder="Enter question"
                className="input-field question-field"
                onInput={(e) => handleDivInput(e, index, "question")}
              ></div>
              <div
                contentEditable="true"
                data-placeholder="Enter definition"
                className="input-field definition-field"
                onInput={(e) => handleDivInput(e, index, "definition")}
              ></div>
            </div>
            <button onClick={() => removeCard(index)} className="remove-button">
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      <div className="add-card-container">
        <button onClick={addCard} className="add-card-button">
          ADD CARD
        </button>
      </div>

      <div className="actions">
        <button onClick={createFlashcards} className="create-button">
          CREATE
        </button>
      </div>

      <h2>Created Flashcards</h2>
      <div className="created-flashcards">
        {createdFlashcards.map((flashcard, index) => (
          <div className="created-flashcard" key={index}>
            <div className="card-question">{flashcard.question}</div>
            <div className="card-definition">{flashcard.definition}</div>
            <button className="delete-button" onClick={() => deleteFlashcard(index)}>
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Flashcard;
