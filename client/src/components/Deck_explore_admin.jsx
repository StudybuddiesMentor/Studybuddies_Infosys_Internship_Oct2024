import React, { useState } from 'react';

const Deck = ({ title, description, imageUrl }) => {
  // Default image URL for decks without an image
  const defaultImageUrl = 'https://i.pinimg.com/736x/1f/61/74/1f6174a908f416f625bc02173ee7f00a.jpg';

  // State for dropdown menu visibility
  const [showMenu, setShowMenu] = useState(false);

  // Toggles the visibility of the dropdown menu
  const toggleMenu = () => setShowMenu(!showMenu);

  // Handle actions for the menu options
  const handleView = () => {
    alert(`Viewing ${title}`);
    setShowMenu(false);
  };

  const handleFlag = () => {
    alert(`Flagging ${title}`);
    setShowMenu(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${title}?`)) {
      alert(`Deleted ${title}`);
    }
    setShowMenu(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 cursor-pointer transition-transform transform hover:scale-110 hover:shadow-xl duration-200 w-64 h-64 flex flex-col justify-between border-2 border-black hover:border-gray-500 relative">
      {/* Menu Button */}
      <div className="absolute top-2 right-2">
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
              <li 
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={(e) => { e.stopPropagation(); handleView(); }}
              >
                View
              </li>
              <li 
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={(e) => { e.stopPropagation(); handleFlag(); }}
              >
                Flag
              </li>
              <li 
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-red-600"
                onClick={(e) => { e.stopPropagation(); handleDelete(); }}
              >
                Delete
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
        <h2 className="text-xl font-semibold" style={{ fontFamily: 'Playfair Display, serif' }}>{title}</h2>
        <p className="text-gray-600" style={{ fontFamily: 'Playfair Display, serif' }}>{description}</p>
      </div>

      {/* Open Deck Button */}
      <button 
        className="mt-2 bg-[#d8b1e1] text-black py-2 px-4 rounded hover:bg-[#caa3d6] transition duration-200"
        onClick={() => alert(`Opening ${title}`)}
      >
        Open Deck
      </button>
    </div>
  );  
};

export default Deck;
