import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "./Nav";
   
const backendUrl = import.meta.env.VITE_API_URL;

const UpdateFlashcardPage = () => {
  const { deckId, flashcardId } = useParams();  // Get deckId and flashcardId from the URL
  const [flashcards, setFlashcards] = useState([]);  // Store all the flashcards for a specific deck
  const [updatedFlashcard, setUpdatedFlashcard] = useState({
    Title: "",
    Content: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch all cards in the deck and find the card to update
  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/cards/${deckId}`,
          { withCredentials: true }
        );
        setFlashcards(response.data.cards);  // Set the list of flashcards for the deck

        // Find the specific flashcard to update based on flashcardId
        const cardToUpdate = response.data.cards.find(
          (card) => card._id === flashcardId
        );

        // If the card is found, set the form values
        if (cardToUpdate) {
          setUpdatedFlashcard({
            Title: cardToUpdate.Title,
            Content: cardToUpdate.Content,
          });
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
        setLoading(false);
      }
    };

    if (deckId && flashcardId) {
      fetchFlashcards();
    }
  }, [deckId, flashcardId]);  // Re-run the effect if deckId or flashcardId changes

  // Handle changes in form fields
  const handleChange = (field, value) => {
    setUpdatedFlashcard((prev) => ({ ...prev, [field]: value }));
  };

  // Save the updated flashcard data to the server
  const handleSave = async () => {
    try {
      await axios.put(
        `${backendUrl}/api/cards/${deckId}/${flashcardId}`,
        updatedFlashcard,  // Send the updated flashcard data
        { withCredentials: true }
      );
      navigate(`/edit-deck/${deckId}`);  // Navigate back to the create flashcard page for the deck
    } catch (error) {
      console.error("Error updating flashcard:", error);
    }
  };

  // Cancel and navigate back to the deck page
  const handleCancel = () => {
    navigate(`/edit-deck/${deckId}`);
  };

  // Display a loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div> {/* Add a loader or spinner here */}
      </div>
    );
  }

  return (
    <div>
      <Nav />  {/* Navigation bar */}

      {/* Back Button */}
      <button
        onClick={handleCancel}
        className="absolute top-24 left-4 px-4 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-700"
      >
        ← Back
      </button>

      {/* Update Flashcard Form */}
      <div className="my-8 p-6 bg-white rounded-lg shadow-md w-full max-w-2xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-green-600 mb-4">
          Update Flashcard
        </h2>

        {/* Flashcard Title Input */}
        <input
          type="text"
          value={updatedFlashcard.Title}
          onChange={(e) => handleChange("Title", e.target.value)}
          className="border border-gray-300 rounded-lg w-full p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-300"
          placeholder="Flashcard Title"
        />

        {/* Flashcard Content Input */}
        <textarea
          value={updatedFlashcard.Content}
          onChange={(e) => handleChange("Content", e.target.value)}
          className="border border-gray-300 rounded-lg w-full p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-300"
          placeholder="Flashcard Content"
        />

        {/* Save and Cancel Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-6 py-3 rounded-full shadow hover:bg-green-600 transition-colors"
          >
            Save Changes
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-500 text-white px-6 py-3 rounded-full shadow hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateFlashcardPage;