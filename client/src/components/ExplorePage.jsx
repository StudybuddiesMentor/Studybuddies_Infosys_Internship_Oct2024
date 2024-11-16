import  { useEffect, useState } from "react";
import axios from "axios";
import Deck from "./Deck_explore";
import { useParams } from "react-router-dom";
import Nav from "./Nav";

// Component to display and manage a collection of public decks for user exploration
const ExplorePage = () => {
  const { tag } = useParams(); // Get tag from the URL
  // State variables to store deck data, error messages, and loading status
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // useEffect hook to fetch public decks when the component mounts
  useEffect(() => {
    // Async function to retrieve deck data from the server
    const fetchPublicDecks = async () => {
      try {
        // Perform GET request to fetch deck data from the backend
        const response = await axios.get(
          "http://localhost:9000/api/decks/exploredeck",
          {
            withCredentials: true,
          }
        );

        // Accessing the decks array from the response data
        if (response.data.decks && Array.isArray(response.data.decks)) {
          const allDecks = response.data.decks;
          console.log("ALL dec:",allDecks);
          console.log("ALL dec tags:",allDecks.tags);
          // Filter decks if a tag is provided
          if (tag) {
            const filteredDecks = allDecks.filter((deck) =>
              deck.tags && deck.tags.includes(tag)
            );
            setDecks(filteredDecks);
          } else {
            setDecks(allDecks); // Show all decks when no tag is provided
          }
        } else {
          setError("Unexpected response format");
        }
      } catch (err) {
        // Error handling: show server error message if available or network error if not
        if (err.response) {
          setError(err.response.data.message || "Failed to fetch decks.");
        } else {
          setError("Network error. Please check your connection or server.");
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicDecks();
  }, [tag]); // Re-run the effect if the tag changes
// Display a loading message while the data is being retrieved
  if (loading) {
    return <p>Loading decks...</p>;
  }
// Display an error message if fetching data fails
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Nav />

      <div className="p-4 overflow-y-auto max-h-screen flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">
          {tag ? `Showing decks tagged with "${tag}"` : "Explore Decks"}
        </h1>
        {/* Display deck items in a responsive grid layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {decks.map((deck) => (
            <Deck
              key={deck._id}
              title={deck.deck_name}
              description={deck.description}
              imageUrl={deck.deck_Image || deck.defaultImageUrl}
              deckId={deck._id}
            />
          ))}
        </div>
        {decks.length === 0 && (
          <p className="text-gray-500 mt-4">
            {tag
              ? `No decks found with the tag "${tag}".`
              : "No decks available at the moment."}
          </p>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;