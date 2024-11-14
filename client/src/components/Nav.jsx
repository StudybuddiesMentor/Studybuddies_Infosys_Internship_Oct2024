import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const Navigate = useNavigate();

  return (
    <nav className="bg-white shadow-lg py-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <Link to="/main-page">
          <img
            src="https://raw.githubusercontent.com/StudybuddiesMentor/Studybuddies_Infosys_Internship_Oct2024/refs/heads/main/client/src/assets/logo.png"
            alt="Study Buddy Logo"
            className="rounded-full w-14 h-14 hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Search Bar for Larger Screens */}
        <div className="hidden md:flex flex-1 mx-6 order-2 lg:order-1">
          <input
            type="text"
            placeholder="Search flashcards..."
            className="border rounded-full px-4 py-2 w-full shadow-md focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
          />
        </div>

        {/* Search Icon and Hamburger Menu for Smaller Screens */}
        <div className="flex items-center space-x-4 md:hidden">
          {/* Search Icon */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="focus:outline-none"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
              alt="Search Icon"
              className="w-6 h-6"
            />
          </button>

          {/* Hamburger Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/56/56763.png"
              alt="Menu Icon"
              className="w-6 h-6"
            />
          </button>
        </div>

        {/* Action Buttons & Links for Larger Screens */}
        <div className="hidden md:flex items-center space-x-4 order-3 lg:order-2">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300"
            onClick={() => Navigate("/deck")}
          >
            Create Deck
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
                  <Link
                    to={`/category/${category.toLowerCase()}`}
                    key={category}
                    className="block px-4 py-2 text-gray-700 hover:bg-green-100 transition-colors"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Additional Links */}
          {["Help", "Explore"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="text-gray-700 hover:text-green-500"
            >
              {item}
            </Link>
          ))}

          {/* Profile Icon */}
          <Link to="/UserPage">
            <img
              src="https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png"
              alt="User"
              className="rounded-full w-10 h-10 shadow-lg p-1 hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>
        {/* Logout Button - Always Visible */}
        <div className="flex items-center space-x-4 order-1 lg:order-2">
          <button className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300">
            Logout
          </button>
        </div>
      </div>

      {/* Dropdown Menu for Smaller Screens */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 right-0 w-full bg-white p-4 shadow-md z-50">
          <button
            className="bg-green-500 text-white px-4 py-2 w-full rounded-full shadow-md mb-4 hover:bg-green-600 transition-colors duration-300"
            onClick={() => Navigate("/deck")}
          >
            Create Deck
          </button>

          <div className="border-b mb-4"></div>

          <div className="space-y-2">
            <div className="relative">
              <button
                className="px-4 py-2 flex items-center justify-between bg-white rounded-full shadow-md w-full hover:bg-gray-100 transition-colors"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="text-gray-700">Categories</span>
                <img
                  src="https://icons.veryicon.com/png/o/miscellaneous/massager/drop-down-arrow-3.png"
                  alt="Dropdown Arrow"
                  className="h-5"
                />
              </button>
              {dropdownOpen && (
                <div className="mt-2 bg-white border rounded-lg shadow-lg">
                  {["Math", "Science", "Languages", "History"].map(
                    (category) => (
                      <Link
                        to={`/category/${category.toLowerCase()}`}
                        key={category}
                        className="block px-4 py-2 text-gray-700 hover:bg-green-100 transition-colors"
                      >
                        {category}
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>

            {["Help", "Explore"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="block text-gray-700 px-4 py-2 hover:bg-green-100 rounded-full"
              >
                {item}
              </Link>
            ))}

            <Link to="/UserPage" className="block">
              <img
                src="https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png"
                alt="User"
                className="rounded-full w-10 h-10 mx-auto shadow-lg p-1 hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </div>
        </div>
      )}

      {/* Dropdown for Search Input on Small Screens */}
      {searchOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white p-4 shadow-md z-50">
          <input
            type="text"
            placeholder="Search flashcards..."
            className="border rounded-full px-4 py-2 w-full shadow-md focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
          />
        </div>
      )}
    </nav>
  );
};

export default Nav;
