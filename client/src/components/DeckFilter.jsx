import React, { useState } from 'react';

// Component for filtering deck data based on criteria like exact match, likes, cards, and posted date
const DeckFilter = ({ onFilterChange }) => {
  // State variables to store the values of each filter option
  const [exactMatch, setExactMatch] = useState(false);
  const [likes, setLikes] = useState(0);
  const [cards, setCards] = useState(0);
  const [postedAfter, setPostedAfter] = useState('');

  // Update filter criteria when any input changes
  const handleFilterChange = () => {
    onFilterChange({ exactMatch, likes, cards, postedAfter });
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-lg w-full max-w-sm mx-auto sm:max-w-md md:max-w-xs mt-[45px]">
      {/* Checkbox for enabling/disabling exact match filter */}
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={exactMatch}
          onChange={(e) => {
            setExactMatch(e.target.checked);
            handleFilterChange();
          }}
          className="mr-2"
        />
        <label>Exact Match</label>
      </div>
      {/* Range slider for filtering by likes, with a label and dynamic value display */}
      <div className="mb-4">
        <label>Likes greater than</label>
        <input
          type="range"
          min="0"
          max="10000"
          step="100"
          value={likes}
          onChange={(e) => {
            setLikes(Number(e.target.value)); // Update likes state
            handleFilterChange();
          }}
          className="w-full mt-2"
        />
        <div className="flex justify-between">
          <span>0</span>
          <span>{likes >= 10000 ? '10k+' : likes}</span>
        </div>
      </div>
      {/* Range slider for filtering by card count, with a label and current count display */}
      <div className="mb-4">
        <label>Cards greater than</label>
        <input
          type="range"
          min="0"
          max="20"
          step="1"
          value={cards}
          onChange={(e) => {
            setCards(Number(e.target.value));
            handleFilterChange();
          }}
          className="w-full mt-2"
        />
        <div className="flex justify-between">
          <span>0</span>
          <span>{cards}</span>
        </div>
      </div>
       {/* Date input for filtering by posted date */}
      <div className="mb-4">
        <label>Posted After</label>
        <input
          type="date"
          value={postedAfter}
          onChange={(e) => {
            setPostedAfter(e.target.value);
            handleFilterChange();
          }}
          className="w-full mt-2"
        />
      </div>
    </div>
  );
};

export default DeckFilter;
