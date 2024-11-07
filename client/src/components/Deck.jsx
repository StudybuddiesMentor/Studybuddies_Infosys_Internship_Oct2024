import { useState, useEffect } from "react";

const Deck = () => {
  const [deckTitle, setDeckTitle] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [flashcards, setFlashcards] = useState([{ title: "", content: "" }]);
  const [createdDecks, setCreatedDecks] = useState([]);
  const [lastCreatedTime, setLastCreatedTime] = useState(null);
  const [isPublic, setIsPublic] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [deckImage, setDeckImage] = useState(null);

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

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const deleteTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setDeckImage(reader.result); // Store the Base64 string representation of the image
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const saveDeck = () => {
    const newDeck = {
      title: deckTitle,
      description: deckDescription,
      tags: tags,
      flashcards: flashcards,
      isPublic: isPublic,
      createdTime: new Date().toLocaleString(),
      image: deckImage, // Save the Base64 string representation of the image
    };

    const updatedDecks = [...createdDecks, newDeck];
    setCreatedDecks(updatedDecks);
    localStorage.setItem("decks", JSON.stringify(updatedDecks));
    setLastCreatedTime(newDeck.createdTime);

    // Reset fields
    setDeckTitle("");
    setDeckDescription("");
    setTags([]);
    setFlashcards([{ title: "", content: "" }]);
    setIsPublic(false);
    setDeckImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 flex flex-col">
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
              className="border rounded-full px-4 py-2 w-full shadow-md focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
            />
          </div>
          <div className="flex items-center space-x-4 order-1 lg:order-2">
            <button className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300">
              Create Deck
            </button>
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
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                  {["Math", "Science", "Languages", "History"].map(
                    (category) => (
                      <a
                        href={`/category/${category.toLowerCase()}`}
                        key={category}
                        className="block px-4 py-2 text-gray-700 hover:bg-green-100 transition-colors"
                      >
                        {category}
                      </a>
                    )
                  )}
                </div>
              )}
            </div>
            {["Help", "Explore"].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-gray-700 hover:text-green-500"
              >
                {item}
              </a>
            ))}
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
      {/* ... [rest of the navbar code remains unchanged] */}

      {/* Main Content Section */}
      {!viewMode ? (
        <div className="flex-grow container mx-auto py-12 px-8 bg-white shadow-xl rounded-lg mt-8 max-w-4xl">
          <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
            Create a New Deck and Flashcards
          </h1>
          <div className="text-gray-500 text-center mb-6">
            {lastCreatedTime && `Last Created: ${lastCreatedTime}`}
          </div>

          {/* Deck Title, Description, Tags, and Flashcard Inputs */}
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

          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Add a tag"
              className="border border-gray-300 rounded-lg p-4 flex-1 mr-3 shadow focus:outline-none focus:ring-2 focus:ring-green-300"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
            />
            <button
              onClick={addTag}
              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition-colors"
            >
              Add Tag
            </button>
          </div>
          <div className="flex flex-wrap mb-5">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-green-100 text-green-700 rounded-full px-3 py-1 mr-2 mb-2 flex items-center"
              >
                {tag}
                <button
                  onClick={() => deleteTag(index)}
                  className="ml-2 text-red-600"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>

          <h2 className="text-2xl font-semibold text-gray-700 mb-5">
            Create Flashcards
          </h2>
          {flashcards.map((flashcard, index) => (
            <div key={index} className="mb-4 bg-gray-100 p-4 rounded-lg shadow">
              <input
                type="text"
                placeholder={`Flashcard ${index + 1} Title`}
                className="border border-gray-300 rounded-lg w-full p-2 mb-2 shadow focus:outline-none focus:ring-2 focus:ring-green-300"
                value={flashcard.title}
                onChange={(e) =>
                  updateFlashcard(index, "title", e.target.value)
                }
              />
              <textarea
                placeholder="Content"
                className="border border-gray-300 rounded-lg w-full p-2 shadow focus:outline-none focus:ring-2 focus:ring-green-300"
                value={flashcard.content}
                onChange={(e) =>
                  updateFlashcard(index, "content", e.target.value)
                }
                rows="3"
              />
              <button
                onClick={() => removeFlashcard(index)}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-colors"
              >
                Delete Flashcard
              </button>
            </div>
          ))}

          {/* Save Deck Button */}
          <div className="flex justify-between">
            <button
              onClick={addFlashcard}
              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition-colors"
            >
              Add Flashcard
            </button>
            <button
              onClick={saveDeck}
              className="bg-green-700 text-white px-6 py-2 rounded-lg shadow hover:bg-green-800 transition-colors"
            >
              Save Deck
            </button>
          </div>

          {/* View Flashcards Button */}
          <button
            onClick={() => setViewMode(true)}
            className="mt-6 bg-green-700 text-white px-6 py-2 rounded-lg shadow hover:bg-green-800 transition-colors w-full"
          >
            View Flashcards
          </button>
        </div>
      ) : (
        <div className="container mx-auto py-12 px-8 bg-white shadow-xl rounded-lg mt-8 max-w-4xl">
  <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
    Flashcards sorted based on Decks
  </h1>
  {createdDecks.map((deck, index) => (
    <div key={index} className="mb-10">
      <div className="border border-gray-200 rounded-lg p-6 shadow-md bg-gray-50">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          {deck.title}
        </h2>

        {/* Display deck image if available */}
        {deck.image && (
          <img
            src={deck.image}
            alt={`Image for deck ${deck.title}`}
            className="w-full h-48 object-cover rounded-lg mb-4 shadow-sm"
          />
        )}

        {/* Description */}
        <p className="text-lg text-gray-700 font-medium mb-6">
          <span className="block font-semibold text-gray-900 mb-1">Description:</span>
          {deck.description}
        </p>

        {/* Display flashcards within the deck */}
        {deck.flashcards.map((flashcard, flashcardIndex) => (
          <div
            key={flashcardIndex}
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm mb-4"
          >
            <h3 className="text-lg font-semibold text-green-700 mb-1">
              {flashcard.title}
            </h3>
            <p className="text-gray-600">{flashcard.content}</p>
          </div>
        ))}
      </div>

      <hr className="border-t-2 border-gray-300 my-10 mx-auto w-3/4 rounded-lg shadow-md" />
    </div>
  ))}

  <button
    onClick={() => setViewMode(false)}
    className="mt-6 bg-green-700 text-white px-6 py-2 rounded-lg shadow hover:bg-green-800 transition-colors w-full"
  >
    Back to Create Deck
  </button>
</div>

      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-8">
        <div className="container mx-auto text-center bg-gray-800">
          <p>&copy; 2024 Study Buddy. All Rights Reserved.</p>
          <div className="mt-2 space-x-4">
            {["Privacy Policy", "Terms of Service", "Contact Us"].map(
              (item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="hover:text-gray-400"
                >
                  {item}
                </a>
              )
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Deck;
