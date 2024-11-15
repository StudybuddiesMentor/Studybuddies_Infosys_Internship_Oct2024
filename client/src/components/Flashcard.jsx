import React, { useState } from 'react';

const Flashcard = ({ question, answer }) => {
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
        className={`absolute inset-0 w-full h-full bg-white shadow-lg rounded-lg transform transition-transform duration-500 ${
          flipped ? 'rotate-y-180' : ''
        }`}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front of the card */}
        <div
          className="absolute w-full h-full backface-hidden flex flex-col justify-center items-center p-4"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <p className="text-xl font-semibold">{question}</p>
          {/* {image && (
            <img
              src={image}
              alt="flashcard"
              className="mt-4 w-20 h-20 object-cover rounded-lg"
            />
          )} */}
        </div>

        {/* Back of the card */}
        <div
          className="absolute w-full h-full backface-hidden flex justify-center items-center bg-blue-500 text-white rounded-lg p-4"
          style={{
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
          }}
        >
          <p className="text-lg">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
