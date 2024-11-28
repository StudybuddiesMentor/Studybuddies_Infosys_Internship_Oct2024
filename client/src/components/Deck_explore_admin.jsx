import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";

const Deck = ({
  title,
  description,
  imageUrl,
  deckId,
  tags = [],
  status,
  createdAt,
  upvotes,
  downvotes,
  setMessage,
  refreshDecks,
}) => {
  const defaultImageUrl =
    'https://i.pinimg.com/736x/1f/61/74/1f6174a908f416f625bc02173ee7f00a.jpg';
  const navigate = useNavigate();
  const location = useLocation();

  const [showMenu, setShowMenu] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const [popupMessage, setPopupMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // States to handle votes
  const [upvoteCount, setUpvoteCount] = useState(upvotes || 0);
  const [downvoteCount, setDownvoteCount] = useState(downvotes || 0);

  const dropdownRef = useRef(null); // Reference for dropdown

  const toggleMenu = () => setShowMenu(!showMenu);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle revoke action
  const handleRevoke = async () => {
    setShowPopup(true);
    setPopupMessage(`Are you sure you want to restore ${title}?`);
    setShowMenu(false);
  };

  const handleConfirmRevoke = async () => {
    try {
      const response = await axios.put(
        `http://localhost:9000/api/decks/revokedeck/${deckId}`,
        {},
        { withCredentials: true }
      );
      setMessage(response.data.message);
      setPopupMessage(`Deck ${title} has been restored.`);
      refreshDecks();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error occurred while restoring the deck');
      setPopupMessage('Error in restoring deck.');
    }
    setShowPopup(false);
  };

  const handleCancelRevoke = () => setShowPopup(false);

  // Handle soft delete
  const handleSoftDelete = async () => {
    setShowPopup(true);
    setPopupMessage(`Are you sure you want to delete ${title}? This will be a soft delete.`);
    setShowMenu(false);
  };

  const handleConfirmSoftDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:9000/api/decks/deletedeck/${deckId}`,
        { withCredentials: true }
      );
      setMessage(response.data.message);
      setPopupMessage(`Deck ${title} has been soft deleted.`);
      refreshDecks();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error occurred while deleting the deck');
      setPopupMessage('Error in soft delete.');
    }
    setShowPopup(false);
  };

  const handleHardDelete = async () => {
    setShowPopup(true);
    setPopupMessage(`Are you sure you want to permanently delete ${title}? This action cannot be undone.`);
    setShowMenu(false);
  };

  const handleConfirmHardDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:9000/api/decks/admindelete/${deckId}`,
        { withCredentials: true }
      );
      setMessage(response.data.message);
      setPopupMessage(`Deck ${title} has been permanently deleted.`);
      refreshDecks();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error occurred while deleting the deck');
      setPopupMessage('Error in hard delete.');
    }
    setShowPopup(false);
  };

  const handleOpenDeck = () => {
    if (location.pathname === '/explore-admin') {
      navigate(`/view-deck/${deckId}`, { state: { from: location.pathname } });
    }
  };

  const handleVote = async (action) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:9000/api/decks/${deckId}/vote`,
        { action },
        { withCredentials: true }
      );
      if (response.data.message.includes('Upvoted')) {
        setUpvoteCount(response.data.upvotes);
        setDownvoteCount(response.data.downvotes);
      } else if (response.data.message.includes('Downvoted')) {
        setUpvoteCount(response.data.upvotes);
        setDownvoteCount(response.data.downvotes);
      }
    } catch (error) {
      console.error('Error in voting:', error);
      setMessage(error.response?.data?.message || 'Error occurred while voting');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 cursor-pointer transition-transform transform hover:scale-110 hover:shadow-xl duration-200 flex flex-col justify-between border-2 border-black hover:border-gray-500 relative w-64">
      {/* Menu Button */}
      <div className="absolute top-2 right-2" ref={dropdownRef}>
        <button
          className="text-xl text-gray-600 hover:text-gray-800 focus:outline-none bg-white rounded-full p-1 border border-gray-300 hover:bg-gray-200"
          onClick={(e) => {
            e.stopPropagation();
            toggleMenu();
          }}
        >
          ⋮
        </button>
        {showMenu && (
          <div className="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg border border-gray-300 z-10">
            <ul className="py-1">
              {status === 'Deleted' && (
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-blue-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRevoke();
                  }}
                >
                  Revoke
                </li>
              )}
              {status !== 'Deleted' && (
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSoftDelete();
                  }}
                >
                  Soft Delete
                </li>
              )}
              <li
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  handleHardDelete();
                }}
              >
                Hard Delete
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Image */}
      <img
        src={imageUrl || defaultImageUrl} // Use the provided imageUrl or the default image
        alt={title}
        className="rounded-t-lg h-32 object-cover"
      />

      {/* Title and Description */}
      <div className="flex-1">
        <h2 className="text-xl font-semibold" style={{ fontFamily: 'Playfair Display, serif' }}>
          {title}
        </h2>
        <p className="text-gray-600" style={{ fontFamily: 'Playfair Display, serif' }}>
          {description}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Created on: {new Date(createdAt).toLocaleDateString()}
        </p>

        <div className="mt-2">
          <span
            className={`px-2 py-1 text-xs font-semibold rounded ${
              status === 'Private'
                ? 'bg-red-100 text-red-500'
                : status === 'Deleted'
                ? 'bg-orange-100 text-orange-500'
                : 'bg-green-100 text-green-500'
            }`}
          >
            {status}
          </span>
        </div>

        <div className="mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full mr-2"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-2">
        <span
          onClick={() => handleVote('upvote')}
          className="text-sm bg-green-100 text-green-500 px-3 py-1 rounded cursor-pointer"
        >
           <AiFillLike className='text-blue-500 text-xl' /> {upvoteCount}
        </span>
        <span
          onClick={() => handleVote('downvote')}
          className="text-sm bg-red-100 text-red-500 px-3 py-1 rounded cursor-pointer"
        >
          <AiFillDislike className='text-red-500 text-xl' /> {downvoteCount}
        </span>
        <button
          onClick={handleOpenDeck}
          className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
        >
          Open Deck
        </button>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold mb-4">Confirm Action</h2>
            <p className="text-gray-700 mb-6">{popupMessage}</p>
            <div className="flex justify-between">
              <button
                onClick={handleCancelRevoke}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
              {popupMessage.includes('restore') && (
                <button
                  onClick={handleConfirmRevoke}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Confirm
                </button>
              )}
              {popupMessage.includes('delete') && (
                <button
                  onClick={handleConfirmSoftDelete}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Soft Delete
                </button>
              )}
              {popupMessage.includes('permanently') && (
                <button
                  onClick={handleConfirmHardDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Confirm Delete
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deck;
