import axios from "axios";
import React, { useState, useEffect } from "react";
import Deck from "./Deck_explore";
import Nav from "./Nav";

const UserFavourite = () => {
    const defaultImageUrl =
    "https://i.pinimg.com/736x/1f/61/74/1f6174a908f416f625bc02173ee7f00a.jpg";
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoriteDeckIds, setFavoriteDeckIds] = useState([]);

  const fetchFavorites = async () => {
    try {
      // Fetch user's favorite decks (adjust the API endpoint as needed)
      const response = await axios.get("http://localhost:9000/api/users/fav",
        { withCredentials: true }); // Change to your actual API
      const data =  response.data.favoriteDecks || [];
      console.log("favo:", data);
      setFavorites(data); // Set favorite decks data
      setFavoriteDeckIds(data.map((favorite) => favorite.deck._id));
    } catch (error) {
      console.error("Error fetching favorite decks:", error);
    }finally{
      setLoading(false);
    }
  };

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    setLoading(true);
    fetchFavorites(); // Fetch favorite decks
  }, []);

  const toggleFavorite = async (deckId) => {
    try {
      const isFavorite = favoriteDeckIds.includes(deckId);
  
      if (isFavorite) {
        // Remove from favorites
        await axios.delete(`http://localhost:9000/api/users/removefav/${deckId}`, {
          withCredentials: true,
        });
        // Update only the specific deck's favorite status
        setFavorites((prevFavorites) =>
            prevFavorites.filter((favorite) => favorite.deck._id !== deckId)
        );
        setFavoriteDeckIds((prev) => prev.filter((id) => id !== deckId));
      } else {
        // Add to favorites
        await axios.post(
          `http://localhost:9000/api/users/addfav/${deckId}`,
          {},
          { withCredentials: true }
        );
            // Simulate adding the deck locally for UI updates
            const newFavorite = favorites.find(
                (favorite) => favorite.deck._id === deckId
            );
            if (newFavorite) {
                setFavorites((prevFavorites) => [...prevFavorites, newFavorite]);
            }
            setFavoriteDeckIds((prev) => [...prev, deckId]);
        }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  
  return (
    <div>
    <Nav />
    <div className="p-4 max-h-screen flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">

          {"My Favorite Decks"}
        </h1>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <p className="text-lg font-semibold text-gray-600 animate-pulse">
              Searching decks...
            </p>
          </div>
        ) : (
          // Explore Flashcards Section
          <section className="p-4 max-h-screen flex flex-col items-center">
            {/* Header */}

            {/* Flashcards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

              {favorites.map((favorite) => {

                return (
                  <Deck
                    key={favorite.deck._id}
                    title={favorite.deck.deck_name}
                    description={favorite.deck.description}
                    imageUrl={favorite.deck.deck_image?.url || defaultImageUrl}
                    deckId={favorite.deck._id}
                    tags={favorite.tags}
                    status={favorite.deck.deck_status}
                    upvotes={favorite.deck.upvotes?.length || 0}
                    downvotes={favorite.deck.downvotes?.length || 0}
                    isFavorite={favoriteDeckIds.includes(favorite.deck._id)}
                    toggleFavorite={toggleFavorite}
                  />
                )
              })}
            </div>
          </section>
        )}
        {!loading && favorites.length === 0 && (
          <p className="text-gray-500 mt-6 text-center">
            No decks available at the moment.
          </p>
        )}
    </div>
    </div>
  );
};

export default UserFavourite;