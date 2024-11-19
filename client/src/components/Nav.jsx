import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [availableTags, setAvailableTags] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const categoriesRef = useRef(null);
  const userRef = useRef(null);
  const navigate = useNavigate();

  // Fetch tags from backend
  useEffect(() => {
    axios
      .get("http://localhost:9000/api/tags")
      .then((response) => setAvailableTags(response.data.tags || []))
      .catch((error) => console.error("Error fetching tags:", error));
  }, []);

  const filteredTags = availableTags.filter((tag) =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close categories dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setCategoriesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userRef.current && !userRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    if (searchQuery) {
      navigate(`/explore/${searchQuery}`);
    }
  };

  return (
    <nav className={`bg-white shadow-lg py-4 z-50 ${menuOpen ? "relative" : "sticky top-0"}`}>
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <Link to="/main-page">
          <img
            src="https://raw.githubusercontent.com/StudybuddiesMentor/Studybuddies_Infosys_Internship_Oct2024/refs/heads/main/client/src/assets/logo1.png"
            alt="Study Buddy Logo"
            className="h-14 hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Search Bar and Create Button */}
        <div className="flex-1 flex justify-center items-center relative space-x-4 md:space-x-8">
          <div className="relative w-full max-w-md sm:max-w-xs md:max-w-lg lg:max-w-xl xl:max-w-2xl">
            <input
              type="text"
              placeholder="Search flashcards..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(true);
              }}
              className="border rounded-full px-4 pr-12 py-2 w-full shadow-md focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300 transition-all duration-300"
            />
            <button
              onClick={handleSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-green-500 transition"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
                alt="Search Icon"
                className="w-5 h-5"
              />
            </button>

            {/* Tag Suggestions Dropdown */}
            {showDropdown && filteredTags.length > 0 && (
              <div className="absolute mt-2 bg-white border rounded-lg shadow-lg w-full z-10 max-h-40 overflow-y-auto">
                {filteredTags.map((tag, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 text-gray-700 hover:bg-green-100 cursor-pointer"
                    onClick={() => {
                      setSearchQuery(tag.name);
                      setShowDropdown(false);
                    }}
                  >
                    {tag.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Create Deck Button */}
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition-transform duration-200"
            onClick={() => navigate("/deck")}
          >
            Create
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-20 items-center">
          <Link to="/explore" className="text-gray-700 hover:text-green-500 transition">
            Explore
          </Link>

          {/* Categories Dropdown */}
          <div className="relative mr-15" ref={categoriesRef}>
            <button
              className="text-gray-700 hover:text-green-500 transition"
              onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
            >
              Categories
            </button>
            {categoriesDropdownOpen && (
              <div className="absolute mt-2 bg-white border rounded-lg shadow-lg z-50">
                {["Math", "Science", "Languages", "History"].map((category) => (
                  <Link
                    to={`/category/${category.toLowerCase()}`}
                    key={category}
                    className="block px-4 py-2 text-gray-700 hover:bg-green-100"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* User Dropdown */}
          <div className="relative ml-15" ref={userRef}>
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="text-gray-700 hover:text-green-500 transition"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
                alt="User Icon"
                className="w-6 h-6"
              />
            </button>
            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg w-48 z-100">
                <Link to="/userpage" className="block px-4 py-2 text-gray-700 hover:bg-green-100">
                  View Profile
                </Link>
                <Link to="/help" className="block px-4 py-2 text-gray-700 hover:bg-green-100">
                  Help
                </Link>
                <Link to="/TermNCondition" className="block px-4 py-2 text-gray-700 hover:bg-green-100">
                  Terms and Conditions
                </Link>
                <button
                  className="bg-red-500 text-white px-4 py-2 w-full rounded-full shadow-md mt-4 hover:bg-red-600 transition-colors"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden ml-4 focus:outline-none">
          <img
            src="https://cdn-icons-png.flaticon.com/512/56/56763.png"
            alt="Menu Icon"
            className="w-6 h-6"
          />
        </button>
      </div>

        {/* Action Buttons & Links for Larger Screens */}
        <div className="hidden md:flex items-center space-x-4 order-3 lg:order-2">
        <button className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95" onClick={() => navigate("/deck")}>
          Create Deck
        </button>


       

          {/* Additional Links */}
          {["Help", "Explore"].map((item) => (
            <Link
              to="/userpage"
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-green-100 rounded-full"
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
          <button
  className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95"
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

            <button
              className="bg-red-500 text-white px-4 py-2 w-full rounded-full shadow-md mt-4 hover:bg-red-600 transition-colors"
              onClick={() => {
                setMenuOpen(false);
                navigate("/");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
