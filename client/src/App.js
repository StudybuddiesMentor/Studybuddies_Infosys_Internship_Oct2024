import './App.css';
import React from 'react';
import favourite from './images/favourite.png';
import flashcard1 from './images/flashcard1.png';
import flashcard3 from './images/flahscard3.png';
import create from './images/create.png';
import time from './images/time.jpeg';
import customize from './images/customize.png';
import category from './images/category.png';
import rating from './images/rating.png';
import comment from './images/comment.png';



function App() {
  return (
    <>
      {/* First Section */}
      <section className="features-section bg">
        <div className="text-content">
          <h2>Create Flashcards</h2>
          <p>
            Creating your own set of flashcards is easy with our free flashcard maker. Simply enter a term and its definition, and organize your flashcards into custom categories to streamline your study sessions. Whether you're preparing for a test or learning something new, our flashcard maker helps you keep everything organized. Once your set is complete, you can study at your own pace and even share your flashcards with friends for collaborative learning.
          </p>
        </div>
        <div className="image-content">
          <img src={flashcard1} alt="Flashcard Feature" />
        </div>
      </section>

      {/* Second Section */}
      <section className="features-section reverse bg">
        <div className="text-content">
          <h2>Find Flashcards</h2>
          <p>
            Finding the perfect set of flashcards is quick and easy with our search feature. Whether you're studying for a specific subject, exam, or topic, simply enter a keyword, and browse through a variety of flashcard sets created by others. Filter results by relevance, popularity, or recent additions to discover the most helpful flashcards for your needs. Once you find the right set, you can start studying immediately or even customize it to suit your preferences.
          </p>
        </div>
        <div className="image-content">
          <img src={flashcard3} alt="Versatile Integrations" />
        </div>
      </section>

      {/* Third Section */}
      <section className="features-section bg">
        <div className="text-content">
          <h2>A Smarter Way to Study</h2>
          <p>
            Flashcards are a highly effective tool for quick and focused learning. By breaking down complex topics into bite-sized pieces, flashcards make it easier to review and memorize key information. This method helps you retain knowledge faster and more efficiently, cutting down on study time while boosting recall. Whether you're preparing for exams or mastering new concepts, flashcards streamline your study sessions and make learning more manageable.
          </p>
        </div>
        <div className="image-content">
          <img src={time} alt="Flashcard Feature" />
        </div>
      </section>

      {/* Icon Section */}
      <section className="icon-section">
        <div className="icon-row">
          <div className="icon-item">
            <img src={create} alt="Create Icon" />
            <h3>Create</h3>
            <p>Easily make your notes into flashcards.</p>
          </div>
          <div className="icon-item">
            <img src={customize} alt="Customize Icon" />
            <h3>Customize</h3>
            <p>Take existing flashcards and make them your own.</p>
          </div>
          <div className="icon-item">
            <img src={comment} alt="Comment Icon" />
            <h3>Comment</h3>
            <p>Learn more from user comments on each deck.</p>
          </div>
        </div>

        <div className="icon-row">
          <div className="icon-item">
            <img src={category} alt="Category Icon" />
            <h3>Category</h3>
            <p>Organize flashcards into separate decks for easy access.</p>
          </div>
          <div className="icon-item">
            <img src={rating} alt="Rating Icon" />
            <h3>Rating</h3>
            <p>Rate decks and find the most helpful ones.</p>
          </div>
          <div className="icon-item">
            <img src={favourite} alt="Favourite Icon" />
            <h3>Favourite</h3>
            <p>Only study the flashcards you want to focus on.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
