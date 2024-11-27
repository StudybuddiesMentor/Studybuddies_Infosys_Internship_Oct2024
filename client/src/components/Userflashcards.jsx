import { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav"
import DeckUser from "./Deck_user";
import { useParams } from "react-router-dom";

// Component to display and manage user-created decks with filter options
const UserFlashcards = () => {
  const defaultImageUrl =
    "https://i.pinimg.com/736x/1f/61/74/1f6174a908f416f625bc02173ee7f00a.jpg";

  const [decks, setDecks] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // For success messages
  const [errorMessage, setErrorMessage] = useState(""); // For error messages
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // Default filter: Show all decks
  const [searchloading, setsearchloading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { id } = useParams();
  // Fetch user-created decks
  useEffect(() => {
    const fetchUserDecks = async () => {
      setError(""); // Clear previous errors

      // Start search loading if there's an ID or if a filter other than "all" is applied
      if (id || filter !== "all" || filter == "all") {
        setsearchloading(true);
      }

      try {
        const response = await axios.get("http://localhost:9000/api/decks", {
          withCredentials: true,
        });

        if (response.data.userDecks && Array.isArray(response.data.userDecks)) {
          const allDecks = response.data.userDecks;

          // Sort decks in descending order
          const sortedDecks = allDecks.sort(
            (a, b) => new Date(b.deck.created_at) - new Date(a.deck.created_at)
          );

          // Filter decks based on both tag and filter condition
          const filteredDecks = sortedDecks.filter((deckObj) => {
            const tags = deckObj.tags || [];
            const hasTag = id
              ? tags.some((tag) => tag.name.toLowerCase() === id.toLowerCase())
              : true;

            if (!hasTag) return false; // If the tag doesn't match, exclude this deck
            
            if (filter === "has_flashcards") {
              // Assuming you want to filter based on tags instead of flashcards
              return deckObj.cards && deckObj.cards.length > 0;
            }

            if (filter === "no_flashcards") {
              return !(deckObj.cards && deckObj.cards.length > 0);
            }

            return true; // Show all decks when no filter is applied
          });
          setDecks(filteredDecks);
        } else {
          setError("Unexpected response format");
        }
      } catch (err) {
        if (err.response) {
          setError(err.response.data.message || "Failed to fetch decks.");
        } else {
          setError("Network error. Please check your connection or server.");
        }
        console.error("Error fetching decks:", err);
      } finally {
        setLoading(false);
        
          setsearchloading(false); // End search-specific loading
       
      }
    };

    fetchUserDecks();
  }, [filter,id, refresh]); // Re-run the effect if the filter changes
  // Re-run the effect if the filter changes

  // Hide the message after 3 seconds
  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(""); // Hide message after 3 seconds
        setErrorMessage("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  // Function to toggle refresh
  const refreshDecks = () => setRefresh((prev) => !prev);

 // Show a loading message while the decks are being fetched
 if (loading) {
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-semibold text-gray-600">Loading decks...</p>
    </div>
  );
}

// Show an error message if there is an issue fetching decks
if (error) {
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-semibold text-red-500">
        {error}
      </p>
    </div>
  );
}


// Callback to remove a deck from state
const handleDeckDeletion = (deletedDeckId) => {
  setDecks((prevDecks) =>
    prevDecks.filter((deckObj) => deckObj.deck._id !== deletedDeckId)
  );
};

const handleSuccessMessage = (message) => {
  setSuccessMessage(message);
  setErrorMessage(""); // Clear error message
};

const handleErrorMessage = (message) => {
  setErrorMessage(message);
  setSuccessMessage(""); // Clear success message
};

  return (
    <div>
      <Nav/>
      <div className="p-4 overflow-y-auto max-h-screen flex flex-col items-center">

        {/* Display message at the top of the screen */}
        {(successMessage || errorMessage) && (
          <div
            className={`fixed top-20 left-0 right-0 text-center p-3 z-50 ${
              successMessage ? "bg-green-500 text-green-100" : "bg-red-500 text-red-100"
            }`}
          >
            {successMessage || errorMessage}
          </div>
        )}
        
        <h1 className="text-2xl font-bold mb-4">Your Decks</h1>

        {/* Filter options */}
        <div className="mb-4">
          <label htmlFor="deck-filter" className="mr-2 font-semibold">
            Filter decks by:
          </label>
          <select
            id="deck-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option value="all">All Decks</option>
            <option value="has_flashcards">Decks with Flashcards</option>
            <option value="no_flashcards">Decks without Flashcards</option>
          </select>
        </div>

        {/* Display user-created decks */}
        {/* Show search-specific loading if fetching based on tag */}
        {searchloading ? (
                  <div className="flex items-center justify-center h-48">
                    <p className="text-lg font-semibold text-gray-600 animate-pulse">
                      Searching decks...
                    </p>
                  </div>
        ):(
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {decks.map((deckObj) => (
           <DeckUser
           key={deckObj.deck._id}
           title={deckObj.deck.deck_name}
           description={deckObj.deck.description}
           imageUrl={deckObj.deck.deck_image?.url || defaultImageUrl}
           deckId={deckObj.deck._id}
           tags={deckObj.tags} // Pass tags
           status={deckObj.deck.deck_status} // Pass status
           createdAt={deckObj.deck.created_at} // Pass creation date
           onDeleteDeck={handleDeckDeletion}
           onSuccess={handleSuccessMessage} // Pass success callback
           onError={handleErrorMessage} // Pass error callback
           refreshDecks={refreshDecks}
         />
          ))}
        </div>
        )}
        
        {!searchloading && decks.length === 0 && (
          <p className="text-gray-500 mt-4">
            {filter === "has_flashcards"
              ? "You have no decks with flashcards."
              : filter === "no_flashcards"
              ? "You have no decks without flashcards."
              : "You have no decks created yet."}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserFlashcards;
