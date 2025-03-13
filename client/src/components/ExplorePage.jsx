import { useEffect, useState } from "react";
import axios from "axios";
import Deck from "./Deck_explore";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
   
const backendUrl = import.meta.env.VITE_API_URL;

const ExplorePage = () => {
  const defaultImageUrl =
    "https://i.pinimg.com/736x/1f/61/74/1f6174a908f416f625bc02173ee7f00a.jpg";
  const { id } = useParams();
  const [decks, setDecks] = useState([]);
  const [favoriteDeckIds, setFavoriteDeckIds] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchloading, setsearchloading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch all decks and favorites
  useEffect(() => {
    const fetchDecksAndFavorites = async () => {
      setError("");
      if (id || filter !== "all") setsearchloading(true);

      try {
        // Fetch public decks
        const deckResponse = await axios.get(
          `${backendUrl}/api/decks/exploredeck`,
          { withCredentials: true }
        );

        const favoriteResponse = await axios.get(
          `${backendUrl}/api/users/fav`,
          { withCredentials: true }
        );

        const allDecks = deckResponse.data.publicDecks || [];
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
            return (
              deckObj.deck.upvotes?.length > 0 &&
              (!deckObj.deck.downvotes || deckObj.deck.downvotes.length === 0)
            );
          }

          if (filter === "with_downvotes") {
            return (
              deckObj.deck.downvotes?.length > 0 &&
              (!deckObj.deck.upvotes || deckObj.deck.upvotes.length === 0)
            );
          }

          return true;
        });

        setDecks(filteredDecks);

        // Set favorite deck IDs
        const favoriteDecks = favoriteResponse.data.favoriteDecks || [];
        setFavoriteDeckIds(favoriteDecks.map((fav) => fav.deck._id));
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch decks. Please try again."
        );
      } finally {
        setLoading(false);
        setsearchloading(false);
      }
    };

    fetchDecksAndFavorites();
  }, [filter, id]);

  // Toggle favorite
  const toggleFavorite = async (deckId) => {
    try {
      const isFavorite = favoriteDeckIds.includes(deckId);

      if (isFavorite) {
        await axios.delete(`${backendUrl}/api/users/removefav/${deckId}`, {
          withCredentials: true,
        });
        setFavoriteDeckIds((prev) => prev.filter((id) => id !== deckId));
      } else {
        await axios.post(
          `${backendUrl}/api/users/addfav/${deckId}`,
          {},
          { withCredentials: true }
        );
        setFavoriteDeckIds((prev) => [...prev, deckId]);
      }

      // Update deck in place without re-fetching all decks
      setDecks((prevDecks) =>
        prevDecks.map((deckObj) => {
          if (deckObj.deck._id === deckId) {
            return { ...deckObj }; // This triggers a re-render
          }
          return deckObj;
        })
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  // Hide the message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 2000);
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
          {id ? `Decks tagged "${id}"` : "Explore Decks"}
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
            <option value="with_upvotes">Decks with Only Upvotes</option>
            <option value="with_downvotes">Decks with Only Downvotes</option>
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
                isFavorite={favoriteDeckIds.includes(deck.deck._id)}
                toggleFavorite={toggleFavorite}
                setMessage={setMessage}
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

export default ExplorePage;
