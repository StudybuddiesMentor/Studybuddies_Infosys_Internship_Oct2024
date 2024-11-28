import { useEffect, useState } from "react";
import axios from "axios";
import Deck from "./Deck_explore_admin";
import { useParams } from "react-router-dom";
import Nav from "./Nav";

const ExplorePageadmin = () => {
  const defaultImageUrl =
    "https://i.pinimg.com/736x/1f/61/74/1f6174a908f416f625bc02173ee7f00a.jpg";
  const { id } = useParams();
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchloading, setsearchloading] = useState(false);
  const [message, setMessage] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchPublicDecks = async () => {
      setError("");
      if (id || filter !== "all") {
        setsearchloading(true);
      }

      try {
        const response = await axios.get(
          "http://localhost:9000/api/decks/adminexplore",
          { withCredentials: true }
        );
        console.log(response.data);

        if (response.data.publicDecks && Array.isArray(response.data.publicDecks)) {
          const allDecks = response.data.publicDecks;

          const sortedDecks = allDecks.sort(
            (a, b) => new Date(b.deck.created_at) - new Date(a.deck.created_at)
          );

          const filteredDecks = sortedDecks.filter((deckObj) => {
            const tags = deckObj.tags || [];
            const hasTag = id
              ? tags.some((tag) => tag.name.toLowerCase() === id.toLowerCase())
              : true;

            if (!hasTag) return false;

            if (filter === "with_upvotes") {
              return deckObj.deck.upvotes && deckObj.deck.upvotes.length > 0 &&
              (!deckObj.deck.downvotes || deckObj.deck.downvotes.length === 0);
            }

            if (filter === "with_downvotes") {
              return deckObj.deck.downvotes && deckObj.deck.downvotes.length > 0 &&
              (!deckObj.deck.upvotes || deckObj.deck.upvotes.length === 0);
            }

            return true;
          });

          setDecks(filteredDecks);
        } else {
          setError("Unexpected response format");
        }
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || "Failed to fetch decks. Please try again.";
        setError(errorMessage);
        console.error("Error fetching decks:", err);
      } finally {
        setLoading(false);
        setsearchloading(false);
      }
    };

    fetchPublicDecks();
  }, [filter, id, refresh]);

  // Function to toggle refresh
    const refreshDecks = () => setRefresh((prev) => !prev);
  
  // Hide the message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(""); // Hide message after 3 seconds
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading decks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <Nav />

      <div className="p-4 max-h-screen flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">

          {/* Display message at the top of the screen */}
          {message && (
            <div className="fixed top-20 left-0 right-0 bg-red-500 text-red-100 text-center p-3 z-50">
              {message}
            </div>
          )}

          {id ? `Decks tagged "${id}"` : "Explore Decks Admin"}
        </h1>

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
            <option value="with_upvotes">Decks with Upvotes</option>
            <option value="with_downvotes">Decks with Downvotes</option>
          </select>
        </div>

        {searchloading ? (
          <div className="flex items-center justify-center h-48">
            <p className="text-lg font-semibold text-gray-600 animate-pulse">
              Searching decks...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {decks.map((deck) => (
              <Deck
                key={deck.deck._id}
                title={deck.deck.deck_name || "Untitled Deck"}
                description={deck.deck.description || "No description available"}
                imageUrl={deck.deck.deck_image?.url || defaultImageUrl}
                deckId={deck.deck._id}
                tags={deck.tags}
                status={deck.deck.deck_status}
                createdAt={deck.deck.created_at}
                upvotes={deck.deck.upvotes?.length || 0}
                downvotes={deck.deck.downvotes?.length || 0}
                setMessage={setMessage}
                refreshDecks={refreshDecks}
              />
            ))}
          </div>
        )}

        {!searchloading && decks.length === 0 && (
          <p className="text-gray-500 mt-6 text-center">
            {id
              ? `No decks found with the tag "${id}".`
              : "No decks available at the moment. Please check back later."}
          </p>
        )}
      </div>
    </div>
  );
};

export default ExplorePageadmin;
