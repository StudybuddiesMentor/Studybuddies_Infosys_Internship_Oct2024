import React, { useEffect, useState } from "react";
import axios from "axios";
import Deck from "./Deck_explore";
import { useParams } from "react-router-dom";
import Nav from "./Nav";

// Component to display and manage a collection of public decks for user exploration
const ExplorePage = () => {
  const { tag } = useParams();
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
          setDecks(response.data.decks); // Set the decks state with the array
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
  }, []);
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
      </div>
    </div>
  );
};

export default ExplorePage;
