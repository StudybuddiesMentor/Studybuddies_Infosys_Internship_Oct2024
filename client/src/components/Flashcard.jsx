import React, { useState } from 'react';

const Flashcard = ({ question, answer, image }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div
      className="relative w-full max-w-xs p-4 cursor-pointer transform transition-all duration-500"
      onClick={handleFlip}
    >
      <div
        className={`absolute inset-0 w-full h-full bg-white shadow-lg rounded-lg p-4 transform ${
          flipped ? 'rotateY-180' : ''
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s',
        }}
      >
        <div className="absolute w-full h-full backface-hidden flex justify-center items-center">
          <p className="text-xl font-semibold">{question}</p>
          {image && <img src={image} alt="flashcard" className="mt-4 w-20 h-20 object-cover" />}
        </div>
        <div
          className="absolute w-full h-full backface-hidden flex justify-center items-center bg-blue-500 text-white rounded-lg"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <p className="text-lg">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
