import Nav from "./Nav";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Help = () => {
  const Navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="bg-gradient-to-b from-green-50 to-green-200 min-h-screen flex flex-col justify-between">
      {/* Navbar */}
      <Nav />

      {/* Help Section */}
      <div className="container mx-auto py-16 px-10 max-w-5xl">
        <h1 className="text-4xl font-bold text-green-700 mb-8">Need Help?</h1>

        {/* Scrollable Section */}
        <div className="overflow-y-auto max-h-[600px] pr-6">
          {/* Login Help */}
          <div className="bg-white p-8 rounded-lg shadow-md mb-8 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">Login Help</h2>
            <p className="text-gray-700">
              If you're having trouble logging in, try the following:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
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
          <div className="bg-white p-8 rounded-lg shadow-md mb-8 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">Signup Help</h2>
            <p className="text-gray-700">
              Creating a new account on Study Buddies is easy! Follow these steps:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
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
            <p className="text-gray-700 mt-3">
              Once registered, you can start creating and using flashcards right away!
            </p>
          </div>

          {/* Forgot Password Help */}
          <div className="bg-white p-8 rounded-lg shadow-md mb-8 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">Forgot Password</h2>
            <p className="text-gray-700">
              If you've forgotten your password, don't worry. Here's what to do:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
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
            <p className="text-gray-700 mt-3">
              If you don't receive the reset email, check your spam folder or try
              resending it.
            </p>
          </div>

          {/* Flashcards Help */}
          <div className="bg-white p-8 rounded-lg shadow-md mb-8 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">Flashcards Help</h2>
            <p className="text-gray-700">
              Need assistance with creating or managing flashcards? Follow these tips:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
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
            <p className="text-gray-700 mt-3">
              Remember, you can share flashcards with others by making them public, or
              keep them private for personal use.
            </p>
          </div>

          {/* Decks Help */}
          <div className="bg-white p-8 rounded-lg shadow-md mb-8 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">Decks Help</h2>
            <p className="text-gray-700">
              Here's how to organize your flashcards into decks for better
              organization:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
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
            <p className="text-gray-700 mt-3">
              Decks are a great way to keep your learning organized, whether you're
              studying for exams or simply organizing your knowledge.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-10">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Study Buddy. All Rights Reserved.</p>
          <div className="mt-3 space-x-5">
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
