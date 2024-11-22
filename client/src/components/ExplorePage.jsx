import { useEffect, useState } from "react";
import axios from "axios";
import Deck from "./Deck_explore";
import { useParams } from "react-router-dom";
import Nav from "./Nav";

// Main component for the Explore Page
const ExplorePage = () => {
  const defaultImageUrl =
    "https://i.pinimg.com/736x/1f/61/74/1f6174a908f416f625bc02173ee7f00a.jpg";
  const { tag } = useParams(); 
  const [decks, setDecks] = useState([]); 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); 

  // Fetch public decks from the server when the component is mounted or when `tag` changes
  useEffect(() => {
    // Function to retrieve public decks from the backend
    const fetchPublicDecks = async () => {
      try {
        // Send a GET request to the backend to fetch decks
        const response = await axios.get(
          "http://localhost:9000/api/decks/exploredeck",
          { withCredentials: true } 
        );

        // Check if the response contains a valid array of decks
        const allDecks = response.data.decks || [];
        if (tag) {
          // If a tag is specified, filter the decks based on the tag
          const filteredDecks = allDecks.filter(
            (deck) => deck.tags && deck.tags.includes(tag)
          );
          setDecks(filteredDecks);
        } else {
          setDecks(allDecks); 
        }
      } catch (err) {
        // Handle any errors during the API call
        const errorMessage =
          err.response?.data?.message || "Failed to fetch decks. Please try again.";
        setError(errorMessage);
        console.error("Error fetching decks:", err); 
      } finally {
        setLoading(false);
      }
    };

    fetchPublicDecks(); 
  }, [tag]); 

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
      {/* Navigation bar component */}
      <Nav />

      <div className="p-4 max-h-screen flex flex-col items-center">
        {/* Header text, dynamically showing tag-based results or general decks */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {tag ? `Decks tagged "${tag}"` : "Explore Decks"}
        </h1>

        {/* Display the list of decks in a responsive grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {decks.map((deck) => (
            <Deck
              key={deck._id} 
              title={deck.deck_name || "Untitled Deck"} 
              description={deck.description || "No description available"} 
              imageUrl={deck.deck_image?.url || defaultImageUrl} 
              deckId={deck._id} 
              // tags={deck.tags} 
              status={deck.deck_status} 
              createdAt={deck.created_at}

            />
          ))}
        </div>

        {/* Message for when no decks are available */}
        {decks.length === 0 && (
          <p className="text-gray-500 mt-6 text-center">
            {tag
              ? `No decks found with the tag "${tag}".` 
              : "No decks available at the moment. Please check back later."}
          </p>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
