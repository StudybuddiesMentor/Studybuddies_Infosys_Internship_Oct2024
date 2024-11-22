import { useState, useEffect } from "react";
import axios from "axios";
import Deck from "./Deck_explore";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav"
import DeckUser from "./Deck_user";

// Component to display and manage user-created decks with filter options
const UserFlashcards = () => {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // Default filter: Show all decks

  // Fetch user-created decks
  useEffect(() => {
    const fetchUserDecks = async () => {
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

          // Filter decks based on filter condition
          const filteredDecks = sortedDecks.filter((deckObj) => {
            const deck = deckObj.deck;

            if (filter === "has_flashcards") {
              // Assuming you want to filter based on tags instead of flashcards
              return deckObj.tags && deckObj.tags.length > 0;
            }

            if (filter === "no_flashcards") {
              return !(deckObj.tags && deckObj.tags.length > 0);
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
      }
    };

    fetchUserDecks();
  }, [filter]); // Re-run the effect if the filter changes
  // Re-run the effect if the filter changes

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

  return (
    <div>
      <Nav/>
      <div className="p-4 overflow-y-auto max-h-screen flex flex-col items-center">
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {decks.map((deckObj) => (
           <DeckUser
           key={deckObj.deck._id}
           title={deckObj.deck.deck_name}
           description={deckObj.deck.description}
           imageUrl={deckObj.deck.deck_image?.url || deckObj.deck.defaultImageUrl}
           deckId={deckObj.deck._id}
           tags={deckObj.tags} // Pass tags
           status={deckObj.deck.deck_status} // Pass status
           createdAt={deckObj.deck.created_at} // Pass creation date
         />
          ))}
        </div>

        {decks.length === 0 && (
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