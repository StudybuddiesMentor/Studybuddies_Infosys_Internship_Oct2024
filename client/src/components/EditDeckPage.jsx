import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditDeckPage = () => {
  const { deckId } = useParams();
  const navigate = useNavigate();

  const [deckData, setDeckData] = useState({
    title: "",
    description: "",
    status: "Public", // Default to "Public"
    tags: [],
  });

  const [image, setImage] = useState(null); // For image uploads
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch existing deck data
  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const response = await axios.get(`/api/decks/${deckId}`, {
          withCredentials: true, // Include cookies for authentication
        });
        setDeckData({
          title: response.data.title,
          description: response.data.description,
          status: response.data.status,
          tags: response.data.tags || [],
        });
      } catch (err) {
        console.error(err);
        setError("Failed to fetch deck data.");
      }
    };
    fetchDeck();
  }, [deckId]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeckData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle tag addition
  const handleAddTag = () => {
    const newTag = prompt("Enter a new tag:");
    if (newTag) {
      setDeckData((prev) => ({
        ...prev,
        tags: [...prev.tags, { name: newTag }],
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Update deck details
      await axios.put(
        `/api/decks/${deckId}`,
        { title: deckData.title, description: deckData.description, status: deckData.status, tags: deckData.tags },
        { withCredentials: true }
      );

      // Upload image if selected
      if (image) {
        const formData = new FormData();
        formData.append("deck_image", image);
        await axios.put(`/api/decks/deckimage/${deckId}`, formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      alert("Deck updated successfully!");
      navigate(`/view-deck/${deckId}`);
    } catch (err) {
      console.error(err);
      setError("Failed to update deck. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Deck</h2>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
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
          <label className="block text-sm font-medium text-gray-700">Description</label>
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
          <label className="block text-sm font-medium text-gray-700">Status</label>
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
          <label className="block text-sm font-medium text-gray-700">Tags</label>
          <div className="flex flex-wrap gap-2">
            {deckData.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
              >
                {tag.name}
              </span>
            ))}
            <button
              type="button"
              onClick={handleAddTag}
              className="text-blue-500 text-xs underline"
            >
              + Add Tag
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Deck Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full"
          />
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
  );
};

export default EditDeckPage;