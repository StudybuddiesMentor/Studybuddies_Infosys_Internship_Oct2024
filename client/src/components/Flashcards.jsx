import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "./Nav";
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
   
const backendUrl = import.meta.env.VITE_API_URL;

const CreateFlashcardPage = () => {
  const { id: deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [tagss, setTag] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFlashcard, setNewFlashcard] = useState({ Title: "", Content: "" });
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [flashcardToDelete, setFlashcardToDelete] = useState(null);
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeckAndFlashcards = async () => {
      try {
        const deckResponse = await axios.get(
          `${backendUrl}/api/decks/${deckId}`,
          { withCredentials: true }
        );
        if (deckResponse.data.deck) {
          const fetchedDeck = deckResponse.data.deck;
          setDeck(fetchedDeck);
          setTag(deckResponse.data);
  
          // Use the fetched deck data directly here
          setUpvotes(fetchedDeck.upvotes?.length || 0);
          setDownvotes(fetchedDeck.downvotes?.length || 0);
          setHasUpvoted(fetchedDeck.hasUpvoted || false);
          setHasDownvoted(fetchedDeck.hasDownvoted || false);
        }

        const flashcardsResponse = await axios.get(
          `${backendUrl}/api/cards/${deckId}`,
          { withCredentials: true }
        );
        if (Array.isArray(flashcardsResponse.data.cards)) {
          setFlashcards(flashcardsResponse.data.cards);
        }
      } catch (error) {
        console.error("Error fetching deck or flashcards:", error);
      }
    };

    if (deckId) {
      fetchDeckAndFlashcards();
    }
  }, [deckId]);

  const handleNewFlashcardChange = (field, value) => {
    setNewFlashcard((prev) => ({ ...prev, [field]: value }));
  };

  const addFlashcardToBackend = async () => {
    try {
      await axios.post(
        `${backendUrl}/api/cards/${deckId}`,
        newFlashcard,
        { withCredentials: true }
      );
      setNewFlashcard({ Title: "", Content: "" });
      setShowAddForm(false);

      const updatedFlashcards = await axios.get(
        `${backendUrl}/api/cards/${deckId}`,
        { withCredentials: true }
      );
      if (Array.isArray(updatedFlashcards.data.cards)) {
        setFlashcards(updatedFlashcards.data.cards);
      }
    } catch (error) {
      console.error("Error adding flashcard:", error);
    }
  };

  const cancelAddFlashcard = () => {
    setShowAddForm(false);
    setNewFlashcard({ Title: "", Content: "" });
  };

  const handleBack = () => {
    navigate("/userflashcards");
  };

  const handleDeleteClick = (flashcardId) => {
    setFlashcardToDelete(flashcardId);
    setShowDeletePopup(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      await axios.delete(`${backendUrl}/api/cards/${deckId}/${flashcardToDelete}`, {
        withCredentials: true,
      });

      // Remove deleted flashcard from the state
      setFlashcards((prev) =>
        prev.filter((flashcard) => flashcard._id !== flashcardToDelete)
      );

      // Close popup and reset state
      setShowDeletePopup(false);
      setFlashcardToDelete(null);
    } catch (error) {
      console.error("Error deleting flashcard:", error);
    }
  };

  const cancelDeletePopup = () => {
    setShowDeletePopup(false);
    setFlashcardToDelete(null);
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

      {/* Deck Information Section */}
      {deck && (
        <div className="my-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-center text-green-600 mb-4">
            Deck: {deck.deck_name}
          </h2>
          {deck.deck_image && deck.deck_image.url ? (
            <img
              src={deck.deck_image.url}
              alt={deck.deck_name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
          ) : (
            <div className="w-full h-48 bg-gray-300 flex items-center justify-center rounded-md mb-4">
              <span className="text-gray-600">No image available</span>
            </div>
          )}
          <p className="text-lg font-medium mb-2">Description: {deck.description}</p>
          <p className="text-lg font-medium mb-2">Status: {deck.deck_status}</p>
          <p className="text-lg font-medium mb-2">Created by: {deck.created_by.username}</p>
          <div className="flex flex-wrap mt-4">
            {tagss.tags && tagss.tags.length > 0 ? (
              tagss.tags.map((tag) => (
                <span
                  key={tag._id}
                  className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full mr-2 mb-2"
                >
                  {tag.name}
                </span>
              ))
            ) : (
              <span className="text-gray-500">No tags available</span>
            )}
          </div>
          <div className="flex space-x-4">
            <button
              className={`px-6 py-2 rounded-lg text-white ${
                hasUpvoted ? 'bg-green-500' : 'bg-gray-400'
              }`}
            >
              <AiFillLike className='text-blue-500 text-xl' /> {upvotes}
            </button>
            <button
              className={`px-6 py-2 rounded-lg text-white ${
                hasDownvoted ? 'bg-red-500' : 'bg-gray-400'
              }`}
            >
              <AiFillDislike className='text-red-500 text-xl' /> {downvotes}
            </button>
          </div>
        </div>
      )}

      {/* Flashcards Display */}
      <h3 className="text-2xl text-center text-green-700 font-bold mt-8 mb-4">
        Flashcards for Deck: {deck ? deck.deck_name : "Loading..."}
      </h3>
      {flashcards.length === 0 ? (
        <div className="flex justify-center items-center h-48 border-2 border-dashed border-green-500 rounded-lg text-green-500 text-xl font-semibold">
          No flashcards available. Start by adding a new flashcard!
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-6 p-4">
          {flashcards.map((flashcard) => (
            <div
              key={flashcard._id}
              className="w-full max-w-xs bg-green-200 p-6 rounded-lg shadow-lg relative transform transition-transform duration-300 hover:scale-105"
            >
              {/* <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => handleDeleteClick(flashcard._id)}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                >
                  <FaTrashAlt />
                </button>
                <button
                  onClick={() => navigate(`/updateflashcard/${deckId}/${flashcard._id},` )}
                  className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                >
                  <FaEdit />
                </button>
              </div> */}
              <h3 className="text-xl font-bold text-green-800">{flashcard.Title}</h3>
              <p className="text-sm text-gray-700">{flashcard.Content}</p>
              <div className="mt-4 text-xs text-gray-500">
                <p>Created: {new Date(flashcard.created_at).toLocaleString()}</p>
                <p>Updated: {new Date(flashcard.updated_at).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Flashcard Button and Form */}
      <div className="flex justify-center mt-5">
        {!showAddForm ? (
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-500 text-white px-6 py-3 rounded-full shadow hover:bg-green-600 transition-colors"
          >
            Add Flashcard
          </button>
        ) : (
          <div className="bg-gray-50 p-6 rounded-lg shadow-lg w-full max-w-md">
            <input
              type="text"
              placeholder="Flashcard Title"
              value={newFlashcard.Title}
              onChange={(e) => handleNewFlashcardChange("Title", e.target.value)}
              className="border border-gray-300 rounded-lg w-full p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <textarea
              placeholder="Flashcard Content"
              value={newFlashcard.Content}
              onChange={(e) => handleNewFlashcardChange("Content", e.target.value)}
              className="border border-gray-300 rounded-lg w-full p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <div className="flex justify-between">
              <button
                onClick={addFlashcardToBackend}
                className="bg-green-500 text-white px-6 py-3 rounded-full shadow hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={cancelAddFlashcard}
                className="bg-gray-500 text-white px-6 py-3 rounded-full shadow hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
            <p className="text-lg font-semibold mb-4">Are you sure you want to delete this flashcard?</p>
            <div className="flex justify-between">
              <button
                onClick={handleDeleteConfirmation}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDeletePopup}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateFlashcardPage;
