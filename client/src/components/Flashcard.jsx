import { useState, useEffect } from "react";
import "./Flashcard.css";

const Flashcard = () => {
  const [cards, setCards] = useState([{ title: "", content: "" }]);
  const [createdFlashcards, setCreatedFlashcards] = useState([]);
  const [lastCreatedTime, setLastCreatedTime] = useState(null);

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
    setCards([...cards, { title: "", content: "" }]);
  };

  // Update card title or content
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
    const formattedTime = `${currentTime.toLocaleDateString()} ${currentTime.toLocaleTimeString(
      [],
      { hour: "2-digit", minute: "2-digit" }
    )}`;

    setLastCreatedTime(formattedTime);

    // Save flashcards and the creation time to localStorage
    localStorage.setItem("flashcards", JSON.stringify(updatedFlashcards));
    localStorage.setItem("lastCreatedTime", formattedTime);

    // Reset the cards to a single empty card after creation
    setCards([{ title: "", content: "" }]);
  };

  // Delete a flashcard and update localStorage
  const deleteFlashcard = (index) => {
    const newFlashcards = createdFlashcards.filter((_, i) => i !== index);
    setCreatedFlashcards(newFlashcards);
    localStorage.setItem("flashcards", JSON.stringify(newFlashcards));
  };

  // Handle input in editable divs
  const handleDivInput = (e, index, field) => {
    updateCard(index, field, e.target.innerText);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-200">
      {/* Navbar */}
      <nav className="bg-white shadow-lg py-4 sticky top-0 z-50">
        <div className="container mx-auto flex flex-wrap justify-between items-center px-6">
          <img
            src="https://raw.githubusercontent.com/StudybuddiesMentor/Studybuddies_Infosys_Internship_Oct2024/refs/heads/main/client/src/assets/logo.png"
            alt="Study Buddy Logo"
            className="rounded-full w-14 h-14 hover:scale-105 transition-transform duration-300"
          />
          <div className="flex-1 mx-6 order-2 lg:order-1">
            <input
              type="text"
              placeholder="Search flashcards..."
              className="border border-gray-300 rounded-full px-4 py-2 w-full shadow-md focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
            />
          </div>
          <div className="flex items-center space-x-4 order-1 lg:order-2">
            <button className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300">
              Create Deck
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300">
              Create Flashcard
            </button>
            <div className="relative">
              <button className="px-4 py-2 flex items-center bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                <span className="mr-2 text-gray-700">Categories</span>
                <img
                  src="https://icons.veryicon.com/png/o/miscellaneous/massager/drop-down-arrow-3.png"
                  alt="Dropdown Arrow"
                  className="h-5"
                />
              </button>
            </div>
            <a href="/help" className="text-gray-700 hover:text-green-500">
              Help
            </a>
            <a href="/explore" className="text-gray-700 hover:text-green-500">
              Explore
            </a>
            <a href="#">
              <img
                src="https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png"
                alt="User"
                className="rounded-full w-10 h-10 shadow-lg p-1 hover:scale-105 transition-transform duration-300"
              />
            </a>
            <button className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300">
              Login/Signup
            </button>
          </div>
        </div>
      </nav>

      {/* Flashcard Creation */}
      <div className="container mx-auto py-10 px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-700 mb-6">
            Create a New Flashcard Set
          </h1>
          <div className="text-gray-500 mb-4">
            {lastCreatedTime && `Last Created: ${lastCreatedTime}`}
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <div
            className="border-b-2 border-gray-300 w-full md:w-1/2 lg:w-1/3 text-center py-2"
            contentEditable="true"
            data-placeholder="Enter a Title"
            style={{ border: "1px solid #D1D5DB" }} // Added border
          ></div>
        </div>

        <div className="flex justify-center mb-6">
          <div
            className="border-b-2 border-gray-300 w-full md:w-1/2 lg:w-1/3 text-center py-2"
            contentEditable="true"
            data-placeholder="Enter a Description"
            style={{ border: "1px solid #D1D5DB" }} // Added border
          ></div>
        </div>

        <div className="space-y-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-green-600">
                  Card {index + 1}
                </span>
                <button
                  onClick={() => removeCard(index)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  Remove
                </button>
              </div>

              <div className="mt-4 space-y-4">
                <div
                  className="border-b-2 border-gray-300 py-2"
                  contentEditable="true"
                  data-placeholder="Enter title"
                  onInput={(e) => handleDivInput(e, index, "title")}
                  style={{ border: "1px solid #D1D5DB" }} // Added border
                  onFocus={(e) => e.target.classList.add("no-placeholder")} // Hide placeholder on focus
                  onBlur={(e) =>
                    e.target.classList.toggle(
                      "no-placeholder",
                      !!e.target.innerText.trim()
                    )
                  } // Show placeholder if empty on blur
                ></div>

                <div
                  className="border-b-2 border-gray-300 py-2"
                  contentEditable="true"
                  data-placeholder="Enter content"
                  onInput={(e) => handleDivInput(e, index, "content")}
                  style={{ border: "1px solid #D1D5DB" }} // Added border
                  onFocus={(e) => e.target.classList.add("no-placeholder")}
                  onBlur={(e) =>
                    e.target.classList.toggle(
                      "no-placeholder",
                      !!e.target.innerText.trim()
                    )
                  }
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center my-8">
          <button
            onClick={addCard}
            className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300"
          >
            ADD CARD
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={createFlashcards}
            className="bg-blue-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300"
          >
            CREATE
          </button>
        </div>
      </div>

      {/* Created Flashcards */}
      <div className="container mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-green-700 mb-6">
          Created Flashcards
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {createdFlashcards.map((flashcard, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-green-600">
                  Flashcard {index + 1}
                </span>
                <button
                  onClick={() => deleteFlashcard(index)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  Delete
                </button>
              </div>

              <div className="mt-4">
                <h3 className="text-green-700 font-semibold">title:</h3>
                <p>{flashcard.title}</p>
              </div>

              <div className="mt-4">
                <h3 className="text-green-700 font-semibold">content:</h3>
                <p>{flashcard.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
