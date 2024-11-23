import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const EditDeckPage = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [deckData, setDeckData] = useState({
    title: "",
    description: "",
    status: "Public", // Default to "Public"
    tags: [],
  });
  const navigate = useNavigate();
  const [image, setImage] = useState(null); // For image uploads
  const [imagePreview, setImagePreview] = useState(""); // For previewing selected or existing image
  const [newTag, setNewTag] = useState(""); // For adding new tags
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); // To show success message
  const [newFlashcard, setNewFlashcard] = useState({ Title: "", Content: "" });
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [flashcardToDelete, setFlashcardToDelete] = useState(null);
  const [flashcards, setFlashcards] = useState([]);

  const addFlashcardToBackend = async () => {
    try {
      await axios.post(
        `http://localhost:9000/api/cards/${deckId}`,
        newFlashcard,
        { withCredentials: true }
      );
      setNewFlashcard({ Title: "", Content: "" });
      setShowAddForm(false);

      const updatedFlashcards = await axios.get(
        `http://localhost:9000/api/cards/${deckId}`,
        { withCredentials: true }
      );
      console.log(updatedFlashcards);
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
  const handleNewFlashcardChange = (field, value) => {
    setNewFlashcard((prev) => ({ ...prev, [field]: value }));
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
      await axios.delete(
        `http://localhost:9000/api/cards/${deckId}/${flashcardToDelete}`,
        {
          withCredentials: true,
        }
      );

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

  // Fetch existing deck data
  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/decks/${deckId}`,
          { withCredentials: true }
        );
        const deck = response.data.deck;
        setDeckData({
          title: deck.deck_name,
          description: deck.description,
          status: deck.deck_status,
          tags: response.data.tags || [], // Load existing tags
        });
        setDeck(response.data.deck);

        if (deck.deck_image && deck.deck_image.url) {
          setImagePreview(deck.deck_image.url);
        }
        const flashcardsResponse = await axios.get(
          `http://localhost:9000/api/cards/${deckId}`,
          { withCredentials: true }
        );
        if (Array.isArray(flashcardsResponse.data.cards)) {
          setFlashcards(flashcardsResponse.data.cards);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch deck data.");
      }
    };

    fetchDeck();
  }, [deckId]);

  // Auto-dismiss error and success messages
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(false);
      }, 3000); // Auto-dismiss after 3 seconds
      return () => clearTimeout(timer); // Cleanup timeout
    }
  }, [error, success]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeckData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image file selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file)); // Set preview URL for the selected file
  };

  // Handle tag addition
  const handleAddTag = (e) => {
    if (e.key === "Enter" && newTag.trim()) {
      e.preventDefault();
      const newTagObject = {
        id: newTag.toLowerCase().replace(/\s+/g, ""), // Simple ID generation (can be replaced with more sophisticated method)
        name: newTag.trim(),
      };
      setDeckData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTagObject], // Add the new tag object to the state
      }));
      setNewTag(""); // Clear the input field
    }
  };

  // Handle tag deletion (Backend call to remove a tag)
  const handleDeleteTag = async (tagId) => {
    // Find the tag name using the tag ID
    const tag = deckData.tags.find((t) => t._id === tagId);
    if (!tag) {
      setError("Tag not found.");
      return;
    }

    const tagName = tag.name; // Extract the tag name

    try {
      const response = await axios.delete(
        `http://localhost:9000/api/decktags/${deckId}`,
        {
          data: { tags: tagName }, // Send multiple tags for deletion
          withCredentials: true,
        }
      );

      // Update the frontend state
      setDeckData((prev) => ({
        ...prev,
        tags: prev.tags.filter((t) => t._id !== tagId),
      }));
    } catch (err) {
      console.error(err);
      setError("Failed to delete tag. Please try again.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Ensure tags are sent as lowercase strings
      const processedTags = Array.isArray(deckData.tags)
        ? deckData.tags
            .map((tag) =>
              typeof tag.name === "string" ? tag.name.toLowerCase() : ""
            )
            .filter((tag) => tag) // Remove any invalid tags (empty or non-string)
        : [];

      // Update deck details (text fields) and tags
      await axios.put(
        `http://localhost:9000/api/decks/${deckId}`,
        {
          deck_name: deckData.title,
          description: deckData.description,
          deck_status: deckData.status,
          tags: processedTags, // Directly send the tags from state
        },
        { withCredentials: true }
      );
      // Upload image if selected
      if (image) {
        const formData = new FormData();
        formData.append("deck_image", image);

        const response = await axios.put(
          `http://localhost:9000/api/decks/deckimage/${deckId}`,
          formData,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        setImagePreview(response.data.deck_image.url); // Update preview
      }

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError("Failed to update deck. Please try again.");
    } finally {
      setLoading(false);
    }
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
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Deck</h2>

        {/* Error Message Popup */}
        {error && (
          <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-lg">
            {error}
          </div>
        )}

        {/* Success Message Popup */}
        {success && (
          <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
            Deck updated successfully!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Deck Name
            </label>
            <input
              type="text"
              name="title"
              value={deckData.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Deck Description
            </label>
            <textarea
              name="description"
              value={deckData.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={deckData.status}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {deckData.tags?.map((tag) => (
                <span
                  key={tag._id}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs flex items-center gap-2"
                >
                  {tag.name}
                  <button
                    type="button"
                    onClick={() => handleDeleteTag(tag._id)}
                    className="text-red-500 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                placeholder="Add a tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleAddTag}
                className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Deck Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Deck Preview"
                className="mt-4 w-full h-48 object-cover rounded-lg shadow"
              />
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Deck"}
            </button>
          </div>
        </form>
      </div>
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
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => handleDeleteClick(flashcard._id)}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                >
                  <FaTrashAlt />
                </button>
                <button
                  onClick={() =>
                    navigate(`/updateflashcard/${deckId}/${flashcard._id},`)
                  }
                  className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                >
                  <FaEdit />
                </button>
              </div>
              <h3 className="text-xl font-bold text-green-800">
                {flashcard.Title}
              </h3>
              <p className="text-sm text-gray-700">{flashcard.Content}</p>
              <div className="mt-4 text-xs text-gray-500">
                <p>
                  Created: {new Date(flashcard.created_at).toLocaleString()}
                </p>
                <p>
                  Updated: {new Date(flashcard.updated_at).toLocaleString()}
                </p>
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
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to delete this flashcard?
            </p>
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

export default EditDeckPage;
