import  { useEffect, useState } from 'react';
import axios from 'axios';
import Deck from './Deck_explore'; 

// Component to display and manage a collection of public decks for exploration
const ExplorePageadmin = () => {
  // State to store the decks data, any error message, and loading status
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // useEffect hook to fetch public decks when the component is first mounted
  useEffect(() => {
    const fetchPublicDecks = async () => {
      try {
         // Make a GET request to fetch decks data from the server
        const response = await axios.get('http://localhost:9000/api/decks/exploredeck', {
          withCredentials: true, 
        });

        // Accessing the decks array from the response data
        if (response.data.decks && Array.isArray(response.data.decks)) {
          setDecks(response.data.decks); // Set the decks state with the array
        } else {
          setError('Unexpected response format');
        }
      } catch (err) {
         // Handle errors: either server-side or network-related
        if (err.response) {
          setError(err.response.data.message || 'Failed to fetch decks.');
        } else {
          setError('Network error. Please check your connection or server.');
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicDecks();
  }, []);
  // Display loading message while data is being fetched
  if (loading) {
    return <p>Loading decks...</p>;
  }
  // Display error message if an error occurred
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-4 overflow-y-auto max-h-screen flex flex-col items-center">
       {/* Grid to display each deck in a responsive layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {decks.map(deck => (
          <Deck
            key={deck._id}
            title={deck.deck_name} 
            description={deck.description} 
            imageUrl={deck.deck_Image || deck.defaultImageUrl} 
          />
        ))}
      </div>
    </div>
  );
};

export default ExplorePageadmin;
