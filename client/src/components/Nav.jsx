import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Nav = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Track the search query
  const [availableTags, setAvailableTags] = useState([]); // Tags from backend
  const [showDropdown, setShowDropdown] = useState(false); // Control dropdown visibility

  const dropdownRef = useRef(null); // Ref for detecting outside clicks
  const navigate = useNavigate();

  // Fetch tags from backend
  useEffect(() => {
    axios
      .get("http://localhost:9000/api/tags")
      .then((response) => {
        setAvailableTags(response.data.tags || []);
      })
      .catch((error) => console.error("Error fetching tags:", error));
  }, []);

  // Filter tags based on search query
  const filteredTags = availableTags.filter((tag) =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false); // Close dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to handle search
  const handleSearch = () => {
    if (searchQuery) {
      navigate(`/explore/${searchQuery}`);
    }
  };
  return (
    <nav className="bg-white shadow-lg py-4 sticky top-0 z-50" ref={dropdownRef}>
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <Link to="/main-page">
          <img
            src="https://raw.githubusercontent.com/StudybuddiesMentor/Studybuddies_Infosys_Internship_Oct2024/refs/heads/main/client/src/assets/logo1.png"
            alt="Study Buddy Logo"
            className="h-14 hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Search Bar for Larger Screens */}
        <div className="hidden md:flex flex-1 mx-6 order-2 lg:order-1 relative">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search flashcards..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(true);
              }}
              className="border rounded-full px-4 py-2 w-full shadow-md focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
            />
            <button
              onClick={handleSearch}
              className="absolute right-4 top-2 text-gray-600 hover:text-green-500 transition"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
                alt="Search Icon"
                className="w-6 h-6"
              />
            </button>
          </div>

          {/* Dropdown for tag suggestions */}
          {showDropdown && filteredTags.length > 0 && (
            <div className="absolute mt-11 bg-white border rounded-lg shadow-lg w-full z-10 max-h-40 overflow-y-auto">
              {filteredTags.map((tag, index) => (
                <div
                  key={index}
                  className="px-4 py-2 text-gray-700 hover:bg-green-100 cursor-pointer"
                  onClick={() => {
                    setSearchQuery(tag.name); // Update search query with selected tag
                    setShowDropdown(false); // Close dropdown
                  }}
                >
                  {tag.name}
                </div>
              ))}
            </div>
          )}
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
            onClick={() => navigate("/deck")}
          >
            Create Deck
          </button>

       

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
        <div className="flex items-center space-x-8 ml-4 order-1 lg:order-2">
          <button className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300"
          onClick={() => navigate("/")} 
          >
            Logout
          </button>
        </div>
      </div>

      {/* Dropdown Menu for Smaller Screens */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 right-0 w-full bg-white p-4 shadow-md z-50">
           <button
            className="bg-green-500 text-white px-4 py-2 w-full rounded-full shadow-md mb-4 hover:bg-green-600 transition-colors duration-300"
            onClick={() => navigate("/deck")}
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
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowDropdown(true);
            }}
            className="border rounded-full px-4 py-2 w-full shadow-md focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
          />
          <button
            onClick={handleSearch}
            className="absolute right-4 top-2 text-gray-600 hover:text-green-500 transition"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
              alt="Search Icon"
              className="w-6 h-6"
            />
          </button>

          {/* Dropdown for tag suggestions on small screens */}
          {showDropdown && filteredTags.length > 0 && (
            <div className="absolute mt-2 bg-white border rounded-lg shadow-lg w-full z-10 max-h-40 overflow-y-auto">
              {filteredTags.map((tag, index) => (
                <div
                  key={index}
                  className="px-4 py-2 text-gray-700 hover:bg-green-100 cursor-pointer"
                  onClick={() => {
                    setSearchQuery(tag.name); // Update search query with selected tag
                    setShowDropdown(false); // Close dropdown after selection
                    handleSearch(); // Trigger search
                  }}
                >
                  {tag.name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Nav;