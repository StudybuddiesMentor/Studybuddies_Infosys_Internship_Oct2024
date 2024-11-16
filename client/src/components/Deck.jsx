import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import TagSelector from "./TagSelector";
import Resizer from "react-image-file-resizer";
import Alert from "./Alert";
import Nav from "./Nav"

const Deck = () => {
  const [deckTitle, setDeckTitle] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [flashcards, setFlashcards] = useState([{ title: "", content: "" }]);
  const [createdDecks, setCreatedDecks] = useState([]);
  // const [lastCreatedTime, setLastCreatedTime] = useState(null);
  const [isPublic, setIsPublic] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [deckImage, setDeckImage] = useState("");
  const navigate = useNavigate();
  const [deckImageName, setDeckImageName] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const [alert, setAlert] = useState({ visible: false, message: "", type: "" });

  

  const addFlashcard = () => {
    setFlashcards([...flashcards, { title: "", content: "" }]);
  };

  const updateFlashcard = (index, field, value) => {
    const updatedFlashcards = [...flashcards];
    updatedFlashcards[index][field] = value;
    setFlashcards(updatedFlashcards);
  };

  const removeFlashcard = (index) => {
    setFlashcards(flashcards.filter((_, i) => i !== index));
  };

  // Add tag function (either from dropdown or new input)
  // const addTag = () => {
  //   if (selectedTag && !tags.includes(selectedTag)) {
  //     setTags([...tags, selectedTag]);
  //     setSelectedTag(""); // Clear selected tag after adding
  //   } else if (newTag && !tags.includes(newTag)) {
  //     setTags([...tags, newTag]);
  //     setNewTag(""); // Clear new tag input after adding
  //   }
  // };

  // Delete tag function
  // const deleteTag = (index) => {
  //   setTags(tags.filter((_, i) => i !== index));
  // };

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();

  //   reader.onloadend = () => {
  //     setDeckImage(reader.result);
  //   };

  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    

    try {
    
      const formData = new FormData();
      formData.append("deck_image", file);

      const response = await axios.post("http://localhost:9000/api/decks/deckimage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },withCredentials: true,
      });

      const { imageUrl, fileName } = response.data;
      console.log(response.data);
      setDeckImage(imageUrl);
      setDeckImageName(fileName);
      setImage(imageUrl)
      
    } catch (err) {
      setError("Error uploading image: " , err.message);
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
        newDeck,{ withCredentials: true }
      );

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
      setFlashcards([{ title: "", content: "" }]);
      setIsPublic(false);
      setDeckImage("");
      setDeckImageName("");
      setImage("")

      

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
          message: error.response.data.message || "Failed to save deck. Please try again.",
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

  // Additional feature: delete a created deck

  // const deleteDeck = (id) => {
  //   axios
  //     .delete("http://localhost:9000/api/decks/${id}")
  //     .then((response) => {
  //       setCreatedDecks(createdDecks.filter((deck) => deck._id !== id));
  //     })
  //     .catch((error) => {
  //       console.error("Failed to delete deck:", error);
  //       alert("Failed to delete deck. Please try again.");
  //     });
  // };

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

        {/* <div className="text-gray-500 text-center mb-6">
          {lastCreatedTime && `Last Created: ${lastCreatedTime}`}
        </div> */}

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

        {/* making deck public/ private */}
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

        <h2 className="ext-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700 mb-5 text-center relative">
          Flashcards
          <span className="block mt-2 h-1 w-1/6 mx-auto bg-gradient-to-r from-green-500 to-green-700 rounded-full"></span>
        </h2>

        {flashcards.map((flashcard, index) => (
          <div key={index} className="mb-4 bg-green-200 p-4 rounded-lg shadow">
            {/* Flashcard Container */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg relative">
              {/* Close Button (Red Cross) */}
              <span
                onClick={() => removeFlashcard(index)}
                className="absolute top-0 right-0 text-2xl text-red-600 hover:text-red-800 cursor-pointer p-3 font-semibold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </span>

              {/* Title Input */}
              <input
                type="text"
                placeholder={`Flashcard ${index + 1} Title`}
                className="border border-gray-300 rounded-lg w-full p-4 mb-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 text-lg font-semibold"
                value={flashcard.title}
                onChange={(e) =>
                  updateFlashcard(index, "title", e.target.value)
                }
              />

              {/* Content Textarea */}
              <textarea
                placeholder={`Flashcard ${index + 1} Content`}
                className="border border-gray-300 rounded-lg w-full p-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 text-sm"
                value={flashcard.content}
                onChange={(e) =>
                  updateFlashcard(index, "content", e.target.value)
                }
              />
            </div>
          </div>
        ))}

        <button
          onClick={addFlashcard}
          className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2 shadow hover:bg-green-600 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>

          <span className="active:scale-95 focus:outline-none transition-transform duration-200">
            Add Flashcard
          </span>

        </button>

        <div className="mt-8 justify-center">
          <button
            onClick={saveDeck}
            className="bg-cyan-500 text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2 shadow hover:bg-cyan-800 transition-colors w-[40%] mx-auto "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
              />
            </svg>
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
          {/* View Flashcards Button */}
          <button
            onClick={() => navigate("/UserPage")}
            className="mt-6 bg-green-700 text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2 shadow hover:bg-green-800 transition-colors w-[40%] mx-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
              />
            </svg>
            <span className="active:scale-95 focus:outline-none transition-transform duration-200">
              View Flashcards
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Deck;
