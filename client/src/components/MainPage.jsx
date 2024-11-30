import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainDeck from "./MainDeck";
import Nav from "./Nav";

const MainPage = () => {
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const flashcards = [
    {
      id: 1,
      content:
        "https://img.freepik.com/premium-photo/sticky-notes-board-office-generative-ai_77190-12755.jpg",
    },
    {
      id: 2,
      content:
        "https://raw.githubusercontent.com/StudybuddiesMentor/Studybuddies_Infosys_Internship_Oct2024/refs/heads/main/client/src/assets/background_images/image_3.jpg",
    },
    {
      id: 3,
      content:
        "https://cdn.pixabay.com/photo/2024/02/10/22/14/ai-generated-8565631_960_720.jpg",
    },
    {
      id: 4,
      content:
        "https://img.freepik.com/premium-photo/stack-books-with-word-book-top_902049-15985.jpg",
    },
    {
      id: 5,
      content:
        "https://img.freepik.com/premium-photo/shelf-filled-with-books-different-genres-wallpaper_987764-21253.jpg",
    },
  ];

  // Automatically switch flashcard every 10 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentFlashcard((prevCard) => (prevCard + 1) % flashcards.length);
    }, 10000);

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [flashcards.length]);

  // Toggle favorite icon for a specific card
  const toggleFavorite = (id) => {
    console.log("printing id in toggle favroit ", id, favorites);
    setFavorites((prevFavorites) => {
      const newFavorites = [...prevFavorites];
      const index = newFavorites.findIndex((favorite) => favorite.id === id);
      if (index !== -1) {
        newFavorites.splice(index, 1); // Remove the favorite from the list
      } else {
        newFavorites.push({ id, isFavorite: true });
      }
      return newFavorites;
    });
  };
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
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
        if (
          response.data.publicDecks &&
          Array.isArray(response.data.publicDecks)
        ) {
          setDecks(response.data.publicDecks); // Set the decks state with the array
        } else {
          setError("Unexpected response format");
        }
        console.log('structure of decks ', decks);
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

  return (
    <div className="bg-gradient-to-b from-green-50 to-green-200 min-h-screen">
      {/* Navbar */}
      <Nav />

      {/* Main Content */}
      <main className="container mx-auto mt-10 px-4 bg-gradient-to-b from-green-50 to-green-200 py-10 rounded-xl shadow-lg pl-10">
        {/* Flashcard Section */}
        <div className="bg-white shadow-lg p-8 rounded-xl text-center">
          <div className="flex justify-center w-full">
            <img
              src={flashcards[currentFlashcard].content}
              alt={`Flashcard ${flashcards[currentFlashcard].id}`}
              className="w-full h-96 object-cover rounded-xl transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
        <div className="bg-green-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Welcome to StudyBuddies!
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              StudyBuddies is your personalized learning companion, offering a
              platform to create, share, and explore flashcards. Whether you're
              revising for an exam or learning something new, our
              community-driven decks make studying fun, interactive, and
              effective.
            </p>
            <div className="mt-8">
              <Link
                to="/explore"
                className="inline-block bg-green-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-600 transition-transform duration-200 active:scale-95"
              >
                Start Exploring Flashcards
              </Link>
            </div>
          </div>
        </div>

        <section className="mt-12">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">
            Recently Visited
          </h3>
          {/* Recently Visited Flashcards */}
          {loading ? (
            // Loading indicator
            <div className="flex items-center justify-center h-48">
              <p className="text-lg font-semibold text-gray-600 animate-pulse">
                Loading decks...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {decks.slice(0, 3).map((deck) => (
                <div
                  key={`recent-${deck.deck._id}`}
                  className="bg-white shadow-lg p-6 rounded-lg relative h-80 group transform hover:scale-105 transition-all duration-500 ease-in-out"
                >
                  <MainDeck
                    key={deck.deck._id}
                    title={deck.deck.deck_name}
                    description={deck.deck.description}
                    imageUrl={
                      deck.deck.deck_image
                        ? deck.deck.deck_image.url
                        : deck.defaultImageUrl
                    }
                    deckId={deck.deck._id}
                    upvotes={deck.deck.upvotes?.length || 0}
                    downvotes={deck.deck.downvotes?.length || 0}
                  />

                  <div className="absolute bottom-2 right-2 group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={
                        favorites.find(
                          (favorite) =>
                            favorite.id === `${deck.deck._id}`
                        )
                          ? "https://em-content.zobj.net/source/apple/81/black-heart_1f5a4.png"
                          : "https://cdn-icons-png.freepik.com/512/57/57602.png"
                      }
                      alt="Favorite"
                      className="h-8 cursor-pointer hover:scale-110 transition-transform"
                      onClick={() => toggleFavorite(`${deck.deck._id}`)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="flex justify-between items-center mt-12">
          <h3 className="text-2xl font-semibold text-gray-800">
            Explore Flashcards
          </h3>
          <Link to="/explore">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md 
                     hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring focus:ring-green-300"
            >
              Show More &rarr;
            </button>
          </Link>
        </div>
        {loading ? (
          // Loading indicator
          <div className="flex items-center justify-center h-48">
            <p className="text-lg font-semibold text-gray-600 animate-pulse">
              Loading decks...
            </p>
          </div>
        ) : (
          // Explore Flashcards Section
          <section className="mt-12 relative">
            {/* Header */}

            {/* Flashcards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {decks.slice(-3).map((deck) => (
                <div
                  key={`recent-${deck._id}`}
                  className="bg-white shadow-lg p-6 rounded-lg relative h-80 group 
                     transform hover:scale-105 transition-all duration-500 ease-in-out"
                >
                  {/* Main Deck Component */}
                  <MainDeck
                    key={deck.deck._id}
                    title={deck.deck.deck_name}
                    description={deck.deck.description}
                    imageUrl={deck.deck.deck_image?.url || deck.defaultImageUrl}
                    deckId={deck.deck._id}
                    upvotes={deck.deck.upvotes?.length || 0}
                    downvotes={deck.deck.downvotes?.length || 0}
                  />

                  {/* Favorite Icon */}
                  <div className="absolute bottom-2 right-2 group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={
                        favorites.some(
                          (favorite) =>
                            favorite.id === `${deck.deck._id}`
                        )
                          ? "https://em-content.zobj.net/source/apple/81/black-heart_1f5a4.png"
                          : "https://cdn-icons-png.freepik.com/512/57/57602.png"
                      }
                      alt="Favorite"
                      className="h-8 cursor-pointer hover:scale-110 transition-transform"
                      onClick={() => toggleFavorite(`${deck.deck._id}`)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* My Favorite Section */}
        <div className="flex justify-between items-center mt-12">
          <h3 className="text-2xl font-semibold text-gray-800">
            My Favroites
          </h3>
        </div>

        {loading ? (
          // Loading indicator
          <div className="flex items-center justify-center h-48">
            <p className="text-lg font-semibold text-gray-600 animate-pulse">
              Loading decks...
            </p>
          </div>
        ) : (
          // Explore Flashcards Section
          <section className="mt-12 relative">
            {/* Header */}

            {/* Flashcards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

              {favorites.map((favorite) => {

                const index = decks.findIndex(deck => deck.deck._id == favorite.id);

                return (
                  <MainDeck
                    key={decks[index].deck._id}
                    title={decks[index].deck.deck_name}
                    description={decks[index].deck.description}
                    imageUrl={decks[index].deck.deck_image?.url || decks[index].defaultImageUrl}
                    deckId={decks[index].deck._id}
                    upvotes={decks[index].deck.upvotes?.length || 0}
                    downvotes={decks[index].deck.downvotes?.length || 0}
                  />
                )
              })}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-8">
        <div className="container mx-auto text-center bg-gray-800">
          <p>&copy; 2024 Study Buddy. All Rights Reserved.</p>
          <div className="mt-2 space-x-4">
            {["Privacy Policy", "Terms-of-Service", "Contact Us"].map(
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

export default MainPage;
