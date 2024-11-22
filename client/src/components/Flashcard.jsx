import React, { useState } from "react";

const Flashcard = ({ key, question, answer }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div
      className="relative w-full max-w-xs h-64 cursor-pointer perspective-1000"
      onClick={handleFlip}
    >
      <div
        className={`absolute inset-0 w-full h-full bg-white shadow-lg rounded-lg`}
      >
        <div
          key={key}
          className="bg-green-200 w-full h-full p-4 rounded-lg shadow flex-shrink-0"
        >
          <h3 className="text-lg font-bold">{question}</h3>
          <p className="text-sm">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;