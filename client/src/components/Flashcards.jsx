import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "./Nav";

const CreateFlashcardPage = () => {
  const { id: deckId } = useParams();
  const [deck, setDeck] = useState(null); // Store the deck data
  const [flashcards, setFlashcards] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false); // Controls the visibility of the add flashcard form
  const [newFlashcard, setNewFlashcard] = useState({ Title: "", Content: "" });

  const navigate = useNavigate(); // Initialize useNavigate
  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const deckResponse = await axios.get(
          `http://localhost:9000/api/decks/${deckId}`,
          { withCredentials: true }
        );
        console.log("Deck Response:", deckResponse.data);
        if (deckResponse.data.deck) {
          setDeck(deckResponse.data.deck);
        } else {
          console.error("Deck not found.");
          return;
        }

        const response = await axios.get(
          `http://localhost:9000/api/cards/${deckId}`,
          { withCredentials: true }
        );
        if (Array.isArray(response.data.cards)) {
          setFlashcards(response.data.cards);
        } else {
          console.error("Expected an array but got:", response.data);
        }
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };

    if (deckId) {
      fetchFlashcards();
    }
  }, [deckId]);

  const handleNewFlashcardChange = (field, value) => {
    setNewFlashcard((prev) => ({ ...prev, [field]: value }));
  };

  const addFlashcardToBackend = async () => {
    try {
      const response = await axios.post(
        `http://localhost:9000/api/cards/${deckId}`,
        newFlashcard,
        { withCredentials: true }
      );

      setNewFlashcard({ Title: "", Content: "" });
      setShowAddForm(false); // Hide the form after adding

      // Refetch flashcards
      const updatedFlashcards = await axios.get(
        `http://localhost:9000/api/cards/${deckId}`,
        { withCredentials: true }
      );
      if (Array.isArray(updatedFlashcards.data.cards)) {
        setFlashcards(updatedFlashcards.data.cards);
      } else {
        console.error("Expected an array but got:", updatedFlashcards.data);
      }
    } catch (error) {
      console.error("Error adding flashcard:", error);
    }
  };

  const cancelAddFlashcard = () => {
    setShowAddForm(false); // Close the form without saving
    setNewFlashcard({ Title: "", Content: "" }); // Clear the input fields
  };

  // Determine the previous URL to navigate back
  const handleBack = () => {
    const previousURL = "/userflashcards"; // Default to "/explorepage" if no previous state
    navigate(previousURL);
  };


  return (
    <div>
      <Nav />

      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-24 left-4 px-4 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-700"
      >
        ← Back
      </button>

      <h2 className="mt-5 text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700 mb-5 text-center relative">
        Flashcards for Deck: {deck ? deck.deck_name : ""}
        <span className="block mt-2 h-1 w-1/6 mx-auto bg-gradient-to-r from-green-500 to-green-700 rounded-full"></span>
      </h2>

      {flashcards.length === 0 ? (
        <div className="flex justify-center items-center h-48 border-2 border-dashed border-green-500 rounded-lg text-green-500 text-xl font-semibold">
          No flashcards available. Start by adding a new flashcard!
        </div>
      ) : (
        <div className="flex overflow-x-auto space-x-4 p-4">
          {flashcards.map((flashcard) => (
            <div
              key={flashcard._id}
              className="min-w-[250px] bg-green-200 p-4 rounded-lg shadow flex-shrink-0"
            >
              <h3 className="text-lg font-bold">{flashcard.Title}</h3>
              <p className="text-sm">{flashcard.Content}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col items-center mt-5">
        {!showAddForm ? (
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-full shadow hover:bg-green-600 transition-colors"
          >
            Add Flashcard
          </button>
        ) : (
          <div className="bg-gray-50 p-4 rounded-lg shadow-lg w-full max-w-md">
            <input
              type="text"
              placeholder="Flashcard Title"
              value={newFlashcard.Title}
              onChange={(e) =>
                handleNewFlashcardChange("Title", e.target.value)
              }
              className="border border-gray-300 rounded-lg w-full p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <textarea
              placeholder="Flashcard Content"
              value={newFlashcard.Content}
              onChange={(e) =>
                handleNewFlashcardChange("Content", e.target.value)
              }
              className="border border-gray-300 rounded-lg w-full p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-green-300"
            ></textarea>
            <div className="flex justify-between">
              <button
                onClick={addFlashcardToBackend}
                className="bg-green-500 text-white px-4 py-2 rounded-full shadow hover:bg-green-600 transition-colors"
              >
                Save Flashcard
              </button>
              <button
                onClick={cancelAddFlashcard}
                className="bg-red-500 text-white px-4 py-2 rounded-full shadow hover:bg-red-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateFlashcardPage;