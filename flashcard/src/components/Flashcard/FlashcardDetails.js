import React from 'react';

function FlashcardDetails({ title }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>Details about {title}</p>
    </div>
  );
}

export default FlashcardDetails;
