import React from 'react';

const Deck = ({ title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 cursor-pointer transition-transform transform hover:scale-110 hover:shadow-xl duration-200 w-64 h-64 flex flex-col justify-between border-2 border-black hover:border-gray-500">
      <img 
        src="https://i.pinimg.com/736x/1f/61/74/1f6174a908f416f625bc02173ee7f00a.jpg" 
        alt={title} 
        className="rounded-t-lg h-32 object-cover" 
      />
      <div className="flex-1">
        <h2 className="text-xl font-semibold" style={{ fontFamily: 'Playfair Display, serif' }}>{title}</h2>
        <p className="text-gray-600" style={{ fontFamily: 'Playfair Display, serif' }}>{description}</p>
      </div>
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
