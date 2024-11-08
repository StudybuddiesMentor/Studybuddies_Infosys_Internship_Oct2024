import { useState, useEffect } from "react";

const DeckSample = () => {
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
    setDeckImage(e.target.files[0]); // Store the uploaded image
  };

  const saveDeck = () => {
    const formData = new FormData();
    formData.append("title", deckTitle);
    formData.append("description", deckDescription);
    formData.append("tags", JSON.stringify(tags)); // Convert tags array to JSON string
    formData.append("flashcards", JSON.stringify(flashcards)); // Convert flashcards array to JSON string
    formData.append("isPublic", isPublic);
    formData.append("createdTime", new Date().toLocaleString());
    if (deckImage) {
      formData.append("image", deckImage); // Add the image file to the FormData
    }
    const newDeck = {
      title: deckTitle,
      description: deckDescription,
      tags: tags,
      flashcards: flashcards,
      isPublic: isPublic,
      createdTime: new Date().toLocaleString(),
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
      <nav className="py-4">
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
            {/* <button className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300">
              Login/Signup
            </button> */}
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
            <label className="block text-green-600">Upload Deck Image</label>
            <input
              type="file"
              accept="image/*"
              className="border border-gray-300 rounded-full p-2 w-full shadow focus:outline-none"
              onChange={handleImageUpload}
            />
            {deckImage && (
              <img
                src={URL.createObjectURL(deckImage)}
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
              className="border border-gray-200 rounded-full p-3 flex-1 mr-3 shadow focus:outline-none focus:ring-2 focus:ring-green-200"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
            />
            <button
            onClick={addTag}
            className="bg-green-500 text-white px-4 py-2 rounded-full shadow hover:bg-green-600 transition-colors"
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
                  className="ml-2 text-green-700 hover:text-green-500 transition-colors duration-200"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>

          <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700 mb-5 text-center relative">
            Create Flashcards
            <span className="block mt-2 h-1 w-1/4 mx-auto bg-gradient-to-r from-green-500 to-green-700 rounded-full"></span>
          </h2>
          {flashcards.map((flashcard, index) => (
            <div key={index} className="mb-4 bg-green-200 p-4 rounded-lg shadow">
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
              {/* <button
                onClick={() => removeFlashcard(index)}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-colors"
              >
                Delete Flashcard
              </button> */}
              <button
                onClick={() => removeFlashcard(index)}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2 shadow hover:bg-red-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>

                <span>Delete Flashcard</span>
              </button>
            </div>
          ))}

          <div className="flex justify-between">
            <button
              onClick={addFlashcard}
              className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2 shadow hover:bg-green-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              
              <span>Add Flashcard</span>
            </button>

            <button
              onClick={saveDeck}
              className="bg-cyan-500 text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2 shadow hover:bg-cyan-800 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
              </svg>

              <span>Save Deck</span>
            </button>

          </div>

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
      ) : (
        <div className="container mx-auto py-12 px-8 bg-white shadow-xl rounded-lg mt-8 max-w-4xl">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700 mb-8 text-center">
            Flashcards sorted based on Decks
            <span className="block mt-2 h-1 w-1/2 mx-auto bg-gradient-to-r from-green-500 to-green-700 rounded-full"></span>
          </h1>


          {createdDecks.map((deck, index) => (
            <div key={index} className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {deck.title}
              </h2>
              <p className="text-gray-600 mb-4">{deck.description}</p>

              {/* Display deck image if available */}
              {deck.imageUrl && (
                <img
                  src={deck.imageUrl}
                  alt={`Image for deck ${deck.title}`}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}

              {/* Display flashcards within the deck */}
              {deck.flashcards.map((flashcard, flashcardIndex) => (
                <div
                  key={flashcardIndex}
                  className="p-4 bg-green-200 rounded-lg shadow mb-4"
                >
                  <h3 className="text-lg font-medium text-gray-700">
                    {flashcard.title}
                  </h3>
                  <p className="text-gray-600">{flashcard.content}</p>
                </div>
              ))}
            </div>
          ))}

          <button
            onClick={() => setViewMode(false)}
            className="mt-6 bg-green-700 text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2 shadow hover:bg-green-800 transition-colors w-[40%] mx-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>

            <span>Back to Create Deck</span>
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

export default DeckSample;
