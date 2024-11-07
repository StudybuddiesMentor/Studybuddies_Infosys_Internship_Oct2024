import React from 'react';
import PersonalInfo from './components/PersonalInfo/PersonalInfo';
import AcademicInfo from './components/AcademicInfo/AcademicInfo';
import Deck from './components/Deck/Deck';
import Flashcard from './components/Flashcard/Flashcard';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-8">
      <header className="text-center">
        <h1 className="text-5xl font-semibold text-gray-800">Study Buddies</h1>
        <p className="text-lg text-gray-600 mt-4">
          I’m a user creating study decks and flashcards to knowledge sharing
        </p>
        <p className="text-sm text-gray-500">
          Member since: September 2, 2024 - Last active: Today at 2:00 PM
        </p>
      </header>

      <div className="grid grid-cols-3 gap-6 mt-10 w-full max-w-5xl">
        <div className="bg-pink-200 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-bold">Created Decks</h2>
          <p className="text-3xl font-semibold">04</p>
        </div>
        <div className="bg-pink-200 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-bold">Time Spent Learning</h2>
          <p className="text-3xl font-semibold">04:30 hrs</p>
        </div>
        <div className="bg-pink-200 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-bold">Created Flashcards</h2>
          <p className="text-3xl font-semibold">08</p>
        </div>
      </div>

      <div className="bg-white p-8 mt-8 rounded-lg shadow-md w-full max-w-5xl">
        <PersonalInfo />
      </div>

      <div className="flex gap-8 mt-8 w-full max-w-5xl">
        <Deck />
        <Flashcard />
      </div>
    </div>
  );
}

export default App;
