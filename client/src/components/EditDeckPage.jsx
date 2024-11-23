import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";

const EditDeckPage = () => {
  const { deckId } = useParams();

  const [deckData, setDeckData] = useState({
    title: "",
    description: "",
    status: "Public", // Default to "Public"
    tags: [],
  });

  const [image, setImage] = useState(null); // For image uploads
  const [imagePreview, setImagePreview] = useState(""); // For previewing selected or existing image
  const [newTag, setNewTag] = useState(""); // For adding new tags
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); // To show success message

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
        if (deck.deck_image && deck.deck_image.url) {
          setImagePreview(deck.deck_image.url);
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
    try {
      await axios.delete(`http://localhost:9000/api/tags/${deckId}`, {
        data: { tagId },
        withCredentials: true,
      });
      setDeckData((prev) => ({
        ...prev,
        tags: prev.tags.filter((tag) => tag._id !== tagId),
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
    // Update deck details (text fields) and tags
    console.log("Deck Data:", deckData);
    await axios.put(
      `http://localhost:9000/api/decks/${deckId}`,
      {
        deck_name: deckData.title,
        description: deckData.description,
        deck_status: deckData.status,
        tags: deckData.tags, // Directly send the tags from state
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
    </div>
  );
};

export default EditDeckPage;