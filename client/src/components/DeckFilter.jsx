import React, { useState } from 'react';

const DeckFilter = ({ onFilterChange }) => {
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

      <div className="mb-4">
        <label>Likes greater than</label>
        <input
          type="range"
          min="0"
          max="10000"
          step="100"
          value={likes}
          onChange={(e) => {
            setLikes(Number(e.target.value));
            handleFilterChange();
          }}
          className="w-full mt-2"
        />
        <div className="flex justify-between">
          <span>0</span>
          <span>{likes >= 10000 ? '10k+' : likes}</span>
        </div>
      </div>

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
