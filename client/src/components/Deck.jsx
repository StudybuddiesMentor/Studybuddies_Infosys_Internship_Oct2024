import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TagSelector from "./TagSelector";
import Alert from "./Alert";
import Nav from "./Nav";

const Deck = () => {
  const [deckTitle, setDeckTitle] = useState("");
  const [deckid, setdeckid] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const [tags, setTags] = useState([]);;
  // const [lastCreatedTime, setLastCreatedTime] = useState(null);
  const [isPublic, setIsPublic] = useState(false);
  const [deckImage, setDeckImage] = useState("");
  const [deckImageName, setDeckImageName] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const [alert, setAlert] = useState({ visible: false, message: "", type: "" });
  const navigate = useNavigate();    
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    try {
      const formData = new FormData();
      formData.append("deck_image", file);

      const response = await axios.post(
        "http://localhost:9000/api/decks/deckimage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      const { imageUrl, fileName } = response.data;
      setDeckImage(imageUrl);
      setDeckImageName(fileName);
      setImage(imageUrl);
    } catch (err) {
      setError("Error uploading image: ", err.message);
    }
  };

  const saveDeck = async () => {
    try {
      const newDeck = {
        deck_name: deckTitle,
        description: deckDescription,
        tags: tags,
        fileName: deckImageName,
        deck_status: String(isPublic ? "Public" : "Private"),
        imageUrl: deckImage,
      };

      // Attempt to post the new deck to the API
      const response = await axios.post(
        "http://localhost:9000/api/decks",
        newDeck,
        { withCredentials: true }
      );
      if (response.data.newDeck) {
        const { _id  } = response.data.newDeck;
        setdeckid(_id ); // Get deckId from response
      } else {
        console.error('Deck creation failed:', response.data.message);
      }

      // Show success alert if the request was successful
      setAlert({
        visible: true,
        message: "Deck saved successfully!",
        type: "success",
      });

      // Clear the form and update the created decks
      setDeckTitle("");
      setDeckDescription("");
      setTags([]);
      setDeckImage("");
      setDeckImageName("");
      setImage("");

      // Auto-hide the alert after 3 seconds
      setTimeout(() => {
        setAlert((prevAlert) => ({ ...prevAlert, visible: false }));
      }, 3000);
    } catch (error) {
      console.error("Failed to save deck:", error);

      // Show error alert if the request failed
      if (error.response) {
        console.error("Server responded with error:", error.response.data);
        setAlert({
          visible: true,
          message:
            error.response.data.message ||
            "Failed to save deck. Please try again.",
          type: "error",
        });
      } else {
        setAlert({
          visible: true,
          message: "Network error. Please check your connection.",
          type: "error",
        });
      }

      // Auto-hide the alert after 3 seconds
      setTimeout(() => {
        setAlert({ visible: false, message: "", type: "" });
      }, 3000);
    }
  };

  const closeAlert = () => {
    setAlert({ visible: false, message: "", type: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 flex flex-col">
      {/* Navbar */}
      <Nav />

      {/* Main Content Section */}
      <div className="flex-grow container mx-auto py-12 px-8 bg-white shadow-lg rounded-lg mt-8 max-w-3xl">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700 mb-8 text-center relative">
          Create a Flashcard Deck
          <span className="block mt-2 h-1 w-1/2 mx-auto bg-gradient-to-r from-green-500 to-green-700 rounded-full"></span>
        </h1>

        <input
          type="text"
          placeholder="Enter Deck Title"
          className="border border-gray-300 rounded-lg w-full p-4 mb-5 shadow focus:outline-none focus:ring-2 focus:ring-green-300"
          value={deckTitle}
          onChange={(e) => setDeckTitle(e.target.value)}
        />
        <textarea
          placeholder="Deck Description"
          className="border border-gray-300 rounded-lg w-full p-4 mb-5 shadow focus:outline-none focus:ring-2 focus:ring-green-300"
          value={deckDescription}
          onChange={(e) => setDeckDescription(e.target.value)}
          rows="3"
        />

        {/* Image Upload Section */}
        <div className="mb-5">
          <label className="block text-gray-700">Upload Deck Image</label>
          <input
            type="file"
            accept="image/*"
            className="border border-gray-300 rounded-lg p-2 w-full shadow focus:outline-none active:scale-95"
            onChange={handleImageUpload}
          />

          {deckImage && (
            <img
              src={image}
              alt="Deck Preview"
              className="mt-4 w-full h-48 object-cover rounded-lg shadow"
            />
          )}
        </div>

        {/* Making deck public/ private */}
        <div className="mb-6 flex items-center">
          <label
            htmlFor="publicStatus"
            className="text-gray-800 font-medium mr-4"
          >
            Make Deck:
          </label>
          <div className="relative">
            <select
              id="publicStatus"
              className="appearance-none h-10 w-44 pl-3 pr-10 bg-white border border-gray-300 rounded-md text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 ease-in-out"
              value={isPublic ? "public" : "private"}
              onChange={(e) => setIsPublic(e.target.value === "public")}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        <div>
          {/* Input fields for adding tags */}
          <TagSelector tags={tags} setTags={setTags} />

          {/* Display added tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="bg-green-100 text-green-700 rounded-full px-4 py-2 flex items-center space-x-2 shadow-md"
              >
                <span className="font-medium">{tag}</span>
                <button
                  onClick={() => {
                    const updatedTags = tags.filter((_, i) => i !== index);
                    setTags(updatedTags);
                  }}
                  className="text-green-700 hover:text-green-500 focus:outline-none transition-colors duration-200"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 justify-center">
          <button
            onClick={saveDeck}
            className="bg-cyan-500 text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2 shadow hover:bg-cyan-800 transition-colors w-[40%] mx-auto "
          >
            <span className="active:scale-95 focus:outline-none transition-transform duration-200">
              Save Deck
            </span>
          </button>

          {/* Render the Alert component if alert is visible */}
          {alert.visible && (
            <Alert
              message={alert.message}
              type={alert.type}
              onClose={closeAlert}
            />
          )}

          {/* Create Flashcards Button */}
          <button
            onClick={() =>
              navigate("/userflashcards", {
                state: { deckId: deckid },
              })
            }
            className="mt-6 bg-blue-700 text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2 shadow hover:bg-blue-800 transition-colors w-[40%] mx-auto"
          >
            <span className="active:scale-95 focus:outline-none transition-transform duration-200">
              Create Flashcards
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Deck;