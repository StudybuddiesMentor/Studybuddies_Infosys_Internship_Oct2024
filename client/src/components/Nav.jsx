import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  // State hooks to manage menu, search, and dropdown visibility
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-lg py-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6 lg:px-10">
        
        {/* Logo Section */}
        <Link to="/main-page" className="flex items-center">
          <img
            src="https://raw.githubusercontent.com/StudybuddiesMentor/Studybuddies_Infosys_Internship_Oct2024/refs/heads/main/client/src/assets/logo1.png"
            alt="Study Buddy Logo"
            className="rounded-full h-12 cursor-pointer transition-transform duration-300 hover:scale-110"
          />
        </Link>

        {/* Search Bar - Visible on larger screens */}
        <div className="hidden md:flex flex-1 mx-6">
          <input
            type="text"
            placeholder="Search flashcards..."
            className="border rounded-full px-4 py-2 w-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-300 transition"
          />
        </div>

        {/* Icons for Search and Menu (Visible on smaller screens) */}
        <div className="flex md:hidden items-center space-x-4">
          {/* Toggle Search */}
          <button onClick={() => setSearchOpen(!searchOpen)} className="focus:outline-none">
            <img
              src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
              alt="Search Icon"
              className="w-6 h-6"
            />
          </button>

          {/* Toggle Menu */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
            <img
              src="https://cdn-icons-png.flaticon.com/512/56/56763.png"
              alt="Menu Icon"
              className="w-6 h-6"
            />
          </button>
        </div>

        {/* Action Links - Displayed on larger screens */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Navigate to Create Deck */}
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition duration-300"
            onClick={() => navigate("/deck")}
          >
            Create Deck
          </button>

          {/* Categories Dropdown */}
          <div className="relative">
            <button
              className="px-4 py-2 flex items-center bg-gray-100 rounded-full shadow-md hover:bg-gray-200 transition"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="mr-2 text-gray-700">Categories</span>
              <img
                src="https://icons.veryicon.com/png/o/miscellaneous/massager/drop-down-arrow-3.png"
                alt="Dropdown"
                className="h-5"
              />
            </button>
            {/* Category Links */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-md z-10">
                {["Math", "Science", "Languages", "History"].map((category) => (
                  <Link
                    to={`/category/${category.toLowerCase()}`}
                    key={category}
                    className="block px-4 py-2 text-gray-700 hover:bg-green-100 transition"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Additional Navigation Links */}
          {["Help", "Explore", "Response"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="text-gray-700 hover:text-green-500 transition"
            >
              {item}
            </Link>
          ))}

          {/* User Profile Icon */}
          <Link to="/UserPage">
            <img
              src="https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png"
              alt="User"
              className="rounded-full w-10 h-10 shadow-lg p-1 hover:scale-110 transition duration-300"
            />
          </Link>

          {/* Logout Button */}
          <button className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition duration-300">
            Logout
          </button>
        </div>
      </div>

      {/*  Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white p-4 shadow-lg z-40">
          {/* Create Deck Button */}
          <button
            className="bg-green-500 text-white px-4 py-2 w-full rounded-full shadow-md mb-4 hover:bg-green-600 transition"
            onClick={() => navigate("/deck")}
          >
            Create Deck
          </button>

          {/* Additional Navigation Links */}
          {["Help", "Explore", "Response"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="block text-gray-700 px-4 py-2 mb-2 rounded-full hover:bg-green-100 transition"
            >
              {item}
            </Link>
          ))}

          {/* Categories Dropdown  */}
          <div className="relative">
            <button
              className="px-4 py-2 flex items-center justify-between bg-gray-100 rounded-full shadow-md w-full hover:bg-gray-200 transition"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="text-gray-700">Categories</span>
              <img
                src="https://icons.veryicon.com/png/o/miscellaneous/massager/drop-down-arrow-3.png"
                alt="Dropdown"
                className="h-5"
              />
            </button>
            {dropdownOpen && (
              <div className="mt-2 bg-white border rounded-lg shadow-lg">
                {["Math", "Science", "Languages", "History"].map((category) => (
                  <Link
                    to={`/category/${category.toLowerCase()}`}
                    key={category}
                    className="block px-4 py-2 text-gray-700 hover:bg-green-100 transition"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* User Profile  */}
          <Link to="/UserPage" className="block text-center">
            <img
              src="https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png"
              alt="User"
              className="rounded-full w-10 h-10 mx-auto shadow-lg p-1 hover:scale-110 transition"
            />
          </Link>

          {/* Logout Button  */}
          <button className="bg-green-500 text-white px-4 py-2 w-full rounded-full shadow-md mt-4 hover:bg-green-600 transition">
            Logout
          </button>
        </div>
      )}

      {/*  Search Input */}
      {searchOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white p-4 shadow-lg z-40">
          <input
            type="text"
            placeholder="Search flashcards..."
            className="border rounded-full px-4 py-2 w-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-300 transition"
          />
        </div>
      )}
    </nav>
  );
};

export default Nav;
