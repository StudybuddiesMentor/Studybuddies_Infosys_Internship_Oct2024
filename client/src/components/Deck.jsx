import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Deck = () => {
  const [deckTitle, setDeckTitle] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [flashcards, setFlashcards] = useState([{ title: "", content: "" }]);
  const [createdDecks, setCreatedDecks] = useState([]);
  const [lastCreatedTime, setLastCreatedTime] = useState(null);
  const [isPublic, setIsPublic] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [deckImage, setDeckImage] = useState(null);
  const navigate = useNavigate();

  // Predefined tags
  const predefinedTags = ["Maths", "Science", "Language", "History"];

  useEffect(() => {
    const savedDecks = localStorage.getItem("decks");
    if (savedDecks) {
      setCreatedDecks(JSON.parse(savedDecks));
    }

    const savedTime = localStorage.getItem("lastCreatedTime");
    if (savedTime) {
      setLastCreatedTime(savedTime);
    }
  }, []);

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
  const addTag = () => {
    if (selectedTag && !tags.includes(selectedTag)) {
      setTags([...tags, selectedTag]);
      setSelectedTag(""); // Clear selected tag after adding
    } else if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag(""); // Clear new tag input after adding
    }
  };

  // Delete tag function
  const deleteTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setDeckImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const saveDeck = () => {
    try{
      alert("Deck saved successfully!");
      const newDeck = {
        title: deckTitle,
        description: deckDescription,
        tags,
        flashcards,
        isPublic,
        createdTime: new Date().toLocaleString(),
        image: deckImage,
      };

      const storedDecks = JSON.parse(localStorage.getItem("decks")) || [];
      storedDecks.push(newDeck);
      localStorage.setItem("decks", JSON.stringify(storedDecks));
      setLastCreatedTime(newDeck.createdTime);

      // Reset form fields and state
      setDeckTitle("");
      setDeckDescription("");
      setTags([]);
      setFlashcards([{ title: "", content: "" }]);
      setIsPublic(false);
      setDeckImage(null);

      setCreatedDecks(storedDecks);
      setViewMode(false);
    }
    catch (error) {
      console.error("Failed to save deck:", error);
      alert("Failed to save deck. Please try again.");
    }
  };
    // Additional feature: delete a created deck
    const deleteDeck = (index) => {
      const updatedDecks = createdDecks.filter((_, i) => i !== index);
      setCreatedDecks(updatedDecks);
      localStorage.setItem("decks", JSON.stringify(updatedDecks));
    };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-lg py-4 sticky top-0 z-50">
        <div className="container mx-auto flex flex-wrap justify-between items-center px-6">
          {/* Logo */}
          <Link to="/main-page">
          <img
            src="https://raw.githubusercontent.com/StudybuddiesMentor/Studybuddies_Infosys_Internship_Oct2024/refs/heads/main/client/src/assets/logo.png"
            alt="Study Buddy Logo"
            className="rounded-full w-14 h-14 hover:scale-105 transition-transform duration-300"
          />
          </Link>

          {/* Search Bar */}
          <div className="flex-1 mx-6 order-2 lg:order-1">
            <input
              type="text"
              placeholder="Search flashcards..."
              className="border rounded-full px-4 py-2 w-full shadow-md focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 order-1 lg:order-2">
            <button className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300" onClick={() => Navigate("/deck")}>
              Create Deck
            </button>
          

            {/* Category Dropdown */}
            <div className="relative">
              <button
                className="px-4 py-2 flex items-center bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="mr-2 text-gray-700">Categories</span>
                <img
                  src="https://icons.veryicon.com/png/o/miscellaneous/massager/drop-down-arrow-3.png"
                  alt="Dropdown Arrow"
                  className="h-5"
                />
              </button>
              {dropdownOpen && (
                <div
                  id="categoryDropdown"
                  className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10"
                >
                  {["Math", "Science", "Languages", "History"].map((category) => (
                    <a
                      href={`/category/${category.toLowerCase()}`}
                      key={category}
                      className="block px-4 py-2 text-gray-700 hover:bg-green-100 transition-colors"
                    >
                      {category}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Additional Links */}
            {["Help", "Explore"].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-gray-700 hover:text-green-500"
              >
                {item}
              </a>
            ))}

            {/* Profile Icon */}
            <a href="/UserPage">
              <img
                src="https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png"
                alt="User"
                className="rounded-full w-10 h-10 shadow-lg p-1 hover:scale-105 transition-transform duration-300"
              />
            </a>

            {/* Login/Signup Button */}
            <button className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300">
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Section */}
      {!viewMode ? (
        <div className="flex-grow container mx-auto py-12 px-8 bg-white shadow-lg rounded-lg mt-8 max-w-3xl">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700 mb-8 text-center relative">
          Create a Flashcard Deck
          <span className="block mt-2 h-1 w-1/2 mx-auto bg-gradient-to-r from-green-500 to-green-700 rounded-full"></span>
        </h1>

        <div className="text-gray-500 text-center mb-6">
          {lastCreatedTime && `Last Created: ${lastCreatedTime}`}
        </div>

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
              className="border border-gray-300 rounded-lg p-2 w-full shadow focus:outline-none"
              onChange={handleImageUpload}
            />
            {deckImage && (
              <img
                src={deckImage}
                alt="Deck Preview"
                className="mt-4 w-full h-48 object-cover rounded-lg shadow"
              />
            )}
          </div>
          <div className="mb-5 flex items-center">
            <input
              type="checkbox"
              className="form-checkbox text-green-600 h-5 w-5"
              checked={isPublic}
              onChange={() => setIsPublic(!isPublic)}
            />
            <span className="ml-2 text-gray-700">Make Deck Public</span>
          </div>

          <div>
            {/* Input fields for adding tags */}
            <div className="flex mb-4">
              {/* Dropdown for selecting a predefined tag */}
              <select
                className="border border-gray-300 rounded-full p-4 flex-1 mr-3 shadow focus:outline-none focus:ring-2 focus:ring-green-300"
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
              >
                <option value="">Select a tag</option>
                {predefinedTags.map((tag, index) => (
                  <option key={index} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>

              {/* Input field for entering a new tag */}
              <input
                type="text"
                placeholder="Or create a new tag"
                className="border border-gray-300 rounded-full p-4 flex-1 mr-3 shadow focus:outline-none focus:ring-2 focus:ring-green-300"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
              />

              {/* Button to add the tag */}
              <button
              onClick={addTag}
              className="bg-green-500 text-white px-4 py-2 rounded-full shadow hover:bg-green-600 transition-colors"
              >
                Add Tag
              </button>
            </div>

            {/* Display added tags */}
            <div className="flex mb-6">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="bg-green-200 text-green-700 rounded-full px-4 py-2 mr-2 mb-2 flex items-center"
                >
                  {tag}
                  <button
                    onClick={() => deleteTag(index)}
                    className="ml-2 text-green-700 hover:text-green-500 transition-colors duration-200"
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
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              
              <span>Add Flashcard</span>
            </button>

          <div className="mt-8 justify-center">
            <button
              onClick={saveDeck}
              className="bg-cyan-500 text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2 shadow hover:bg-cyan-800 transition-colors w-[40%] mx-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
              </svg>
              <span>Save Deck</span>
            </button>
           
            {/* View Flashcards Button */}
            <button
            onClick={() => setViewMode(true)}
            className="mt-6 bg-green-700 text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2 shadow hover:bg-green-800 transition-colors w-[40%] mx-auto"
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
            </svg>
            <span>View Flashcards</span>
          </button>
          </div>
          
        </div>
        

      ) : (
        <div className="flex-grow container mx-auto py-12 px-8 bg-white shadow-lg rounded-lg mt-8 max-w-3xl">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700 mb-8 text-center">
          View Created Decks
          <span className="block mt-2 h-1 w-1/2 mx-auto bg-gradient-to-r from-green-500 to-green-700 rounded-full"></span>
        </h1>

        {createdDecks.length === 0 ? (
          <p className="text-center text-gray-500">No decks created yet.</p>
        ) : (
          <div>
            {createdDecks.map((deck, index) => (
              <div
                key={index}
                className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg shadow"
              >
                {deck.image && (
                  <img
                    src={deck.image}
                    alt="Deck"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h2 className="text-3xl font-bold text-green-700 mb-4">
                  {deck.title}
                </h2>
                <p className="text-gray-600 mb-4">{deck.description}</p>
                <div className="flex flex-wrap mb-4">
                  {deck.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-green-200 text-green-700 rounded-full px-4 py-2 mr-2 mb-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-semibold text-green-600 mb-4">
                  Flashcards
                </h3>
                {deck.flashcards.map((flashcard, index) => (
                  <div
                    key={index}
                    className="mb-4 p-4 bg-white border border-gray-300 rounded-lg shadow"
                  >
                    <h4 className="text-xl font-bold text-gray-700 mb-2">
                      {flashcard.title}
                    </h4>
                    <p className="text-gray-600">{flashcard.content}</p>
                  </div>
                ))}

                {/* Delete Deck Button */}
                <button
                onClick={() => deleteDeck(index)}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2 shadow hover:bg-red-600 transition-colors w-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                  <span>Delete Deck</span>
                </button>
              </div>
            ))}
          </div>
        )}
        {/* Create New Deck Button */}
        <button
          onClick={saveDeck}
          className="mt-6 bg-green-700 text-white px-6 py-2 rounded-full shadow hover:bg-green-800 transition-colors w-full flex items-center justify-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <span>Create New Deck</span>
        </button>

      </div>
      
      )}
    </div>
  );
};

export default Deck;