import React, { useState } from 'react';

const Help = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="bg-gradient-to-b from-green-50 to-green-200 min-h-screen flex flex-col justify-between">
      {/* Navigation Bar */}


  {/* Navigation Bar */}
      <nav className="bg-white shadow-lg py-4 sticky top-0 z-50">
        <div className="container mx-auto flex flex-wrap justify-between items-center px-6">
          {/* Logo */}
          <img
            src="https://raw.githubusercontent.com/StudybuddiesMentor/Studybuddies_Infosys_Internship_Oct2024/refs/heads/main/client/src/assets/logo.png"
            alt="Study Buddy Logo"
            className="rounded-full w-14 h-14 hover:scale-105 transition-transform duration-300"
          />

          {/* Search Bar */}
          <div className="flex-1 mx-6 order-2 lg:order-1">
            <input
              type="text"
              placeholder="Search flashcards..."
              className="border rounded-full px-4 py-2 w-full shadow-md focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 order-1 lg:order-2">
            <button className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300">
              Create Deck
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300">
              Create Flashcard
            </button>

            {/* Category Dropdown */}
            <div className="relative">
              <button
                className="px-4 py-2 flex items-center bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="mr-2 text-gray-700">Categories</span>
                <img
                  src="https://icons.veryicon.com/png/o/miscellaneous/massager/drop-down-arrow-3.png"
                  alt="Dropdown Arrow"
                  className="h-5"
                />
              </button>
              {dropdownOpen && (
                <div
                  id="categoryDropdown"
                  className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10"
                >
                  {["Math", "Science", "Languages", "History"].map((category) => (
                    <a
                      href={`/category/${category.toLowerCase()}`}
                      key={category}
                      className="block px-4 py-2 text-gray-700 hover:bg-green-100 transition-colors"
                    >
                      {category}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Additional Links */}
            {["Help", "Explore"].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-gray-700 hover:text-green-500"
              >
                {item}
              </a>
            ))}

            {/* Profile Icon */}
            <a href="#">
              <img
                src="https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png"
                alt="User"
                className="rounded-full w-10 h-10 shadow-lg p-1 hover:scale-105 transition-transform duration-300"
              />
            </a>

            {/* Login/Signup Button */}
            <button className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300">
              Login/Signup
            </button>
          </div>
        </div>
      </nav>

   {/* Help Section */}
<div className="container mx-auto py-10 px-6">
  <h1 className="text-3xl font-bold text-green-700 mb-6">Need Help?</h1>

  {/* Scrollable Section */}
  <div className="overflow-y-auto max-h-96 pr-4">
    {/* Login Help */}
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold text-green-600 mb-3">Login Help</h2>
      <p className="text-gray-700">
        If you're having trouble logging in, try the following:
      </p>
      <ul className="list-disc pl-5 text-gray-600">
        <li>Ensure that you’re entering the correct email and password.</li>
        <li>
          If you’ve forgotten your password, click on the "Forgot Password" link
          on the login page to reset it.
        </li>
        <li>
          If your account is locked, check your email for instructions on how to
          unlock it or contact our support team.
        </li>
      </ul>
    </div>

    {/* Signup Help */}
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold text-green-600 mb-3">Signup Help</h2>
      <p className="text-gray-700">
        Creating a new account on Study Buddies is easy! Follow these steps:
      </p>
      <ul className="list-disc pl-5 text-gray-600">
        <li>Click on the "Sign Up" button on the homepage.</li>
        <li>Enter your email address and create a secure password.</li>
        <li>
          Complete the registration form by filling out your name and any
          additional information required.
        </li>
        <li>
          Verify your email by clicking on the confirmation link sent to your
          inbox.
        </li>
      </ul>
      <p className="text-gray-700 mt-2">
        Once registered, you can start creating and using flashcards right away!
      </p>
    </div>

    {/* Forgot Password Help */}
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold text-green-600 mb-3">Forgot Password</h2>
      <p className="text-gray-700">
        If you've forgotten your password, don't worry. Here's what to do:
      </p>
      <ul className="list-disc pl-5 text-gray-600">
        <li>
          Click on the "Forgot Password" link on the login page and enter your
          registered email.
        </li>
        <li>
          Check your inbox for a password reset email and click on the provided
          link.
        </li>
        <li>
          Create a new password that is both secure and easy for you to
          remember.
        </li>
        <li>Use the new password to log back into your account.</li>
      </ul>
      <p className="text-gray-700 mt-2">
        If you don't receive the reset email, check your spam folder or try
        resending it.
      </p>
    </div>

    {/* Flashcards Help */}
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold text-green-600 mb-3">Flashcards Help</h2>
      <p className="text-gray-700">
        Need assistance with creating or managing flashcards? Follow these tips:
      </p>
      <ul className="list-disc pl-5 text-gray-600">
        <li>
          To create a flashcard, click the "Create Flashcard" button and fill in
          the details such as title, content, and tags.
        </li>
        <li>
          You can edit or delete a flashcard by navigating to your profile and
          selecting the flashcard from your list.
        </li>
        <li>
          Use the search bar to quickly find flashcards by keywords, subjects,
          or tags.
        </li>
      </ul>
      <p className="text-gray-700 mt-2">
        Remember, you can share flashcards with others by making them public, or
        keep them private for personal use.
      </p>
    </div>

    {/* Decks Help */}
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold text-green-600 mb-3">Decks Help</h2>
      <p className="text-gray-700">
        Here's how to organize your flashcards into decks for better
        organization:
      </p>
      <ul className="list-disc pl-5 text-gray-600">
        <li>
          To create a deck, click on the "Create Deck" button and give your deck
          a title.
        </li>
        <li>
          Add flashcards to your deck by selecting them from your list or
          creating new ones.
        </li>
        <li>
          You can organize flashcards into multiple decks based on subjects or
          topics for easy access.
        </li>
      </ul>
      <p className="text-gray-700 mt-2">
        Decks are a great way to keep your learning organized, whether you're
        studying for exams or simply organizing your knowledge.
      </p>
    </div>
  </div>
</div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-8">
        <div className="container mx-auto text-center bg-gray-800">
          <p>&copy; 2024 Study Buddy. All Rights Reserved.</p>
          <div className="mt-2 space-x-4">
            {["Privacy Policy", "Terms of Service", "Contact Us"].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase().replace(" ", "-")}`}
                className="hover:text-gray-400"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Help;
