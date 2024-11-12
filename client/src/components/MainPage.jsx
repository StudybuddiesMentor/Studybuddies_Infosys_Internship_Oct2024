import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const MainPage = () => {
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [favorites, setFavorites] = useState([false, false, false]);
  const Navigate = useNavigate();

  const flashcards = [
    {
      id: 1,
      content:
        "https://raw.githubusercontent.com/StudybuddiesMentor/Studybuddies_Infosys_Internship_Oct2024/refs/heads/main/client/src/assets/background_images/image_3.jpg",
    },
    {
      id: 2,
      content:
        "https://i.pinimg.com/736x/9d/97/55/9d975590ceb12f3061ce554a1f0af5ae.jpg",
    },
    {
      id: 3,
      content:
        "https://www.entrelineaspapeleria.cl/cdn/shop/products/30-tarjetas-flash-card-150-grs-entrelineas-papeleria-728367_1080x.jpg?v=1709738958",
    },
  ];

  // Automatically switch flashcard every 10 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentFlashcard((prevCard) => (prevCard + 1) % flashcards.length);
    }, 10000);

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [flashcards.length]);

  // Toggle favorite icon for a specific card
  const toggleFavorite = (index) => {
    setFavorites((prevFavorites) => {
      const newFavorites = [...prevFavorites];
      newFavorites[index] = !newFavorites[index];
      return newFavorites;
    });
  };

  return (
    <div className="bg-gradient-to-b from-green-50 to-green-200 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-lg py-4 sticky top-0 z-50">
        <div className="container mx-auto flex flex-wrap justify-between items-center px-6">
          {/* Logo */}
          <Link to="/main-page">
          <img
            src="https://raw.githubusercontent.com/StudybuddiesMentor/Studybuddies_Infosys_Internship_Oct2024/refs/heads/main/client/src/assets/logo.png"
            alt="Study Buddy Logo"
            className="rounded-full w-14 h-14 hover:scale-105 transition-transform duration-300"
          />
          </Link>

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
            <button className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300" onClick={() => Navigate("/deck")}>
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
            <a href="/UserPage">
              <img
                src="https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png"
                alt="User"
                className="rounded-full w-10 h-10 shadow-lg p-1 hover:scale-105 transition-transform duration-300"
              />
            </a>

            {/* Login/Signup Button */}
            <button className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300">
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto mt-10 px-4 bg-gradient-to-b from-green-50 to-green-200 py-10 rounded-xl shadow-lg pl-10">
        {/* Flashcard Section */}
        <div className="bg-white shadow-lg p-8 rounded-xl text-center">
          <div className="flex justify-center w-full">
            <img
              src={flashcards[currentFlashcard].content}
              alt={`Flashcard ${flashcards[currentFlashcard].id}`}
              className="w-full h-96 object-cover rounded-xl transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        {/* Recently Visited Flashcards */}
        <section className="mt-12">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">
            Recently Visited
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className="bg-white shadow-lg p-6 rounded-lg relative h-80 hover:shadow-xl transition-shadow"
              >
                <div className="overflow-y-auto h-full">
                  <h4 className="font-bold text-lg mb-2">Flashcard content 1</h4>
                  <p className="text-gray-700 mb-4">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Repudiandae, quas magni veritatis ea debitis nulla exercitationem.
                  </p>
                  <p className="text-gray-700">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Pariatur nesciunt ipsum odio at officiis hic culpa.
                  </p>
                </div>
                <div className="absolute bottom-2 right-2">
                  <img
                    src={
                      favorites[idx]
                        ? "https://em-content.zobj.net/source/apple/81/black-heart_1f5a4.png"
                        : "https://cdn-icons-png.freepik.com/512/57/57602.png"
                    }
                    alt="Favorite"
                    className="h-8 hover:scale-110 transition-transform cursor-pointer"
                    onClick={() => toggleFavorite(idx)}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Explore Flashcards Section */}
        <section className="mt-12">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">
            Explore Flashcards
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className="bg-white shadow-lg p-6 rounded-lg relative h-80 hover:shadow-xl transition-shadow"
              >
                <div className="overflow-y-auto h-full">
                  <h4 className="font-bold text-lg mb-2">Flashcard content 1</h4>
                  <p className="text-gray-700 mb-4">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Repudiandae, quas magni veritatis ea debitis nulla exercitationem.
                  </p>
                  <p className="text-gray-700">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Pariatur nesciunt ipsum odio at officiis hic culpa.
                  </p>
                </div>
                <div className="absolute bottom-2 right-2">
                  <img
                    src={
                      favorites[idx]
                        ? "https://em-content.zobj.net/source/apple/81/black-heart_1f5a4.png"
                        : "https://cdn-icons-png.freepik.com/512/57/57602.png"
                    }
                    alt="Favorite"
                    className="h-8 hover:scale-110 transition-transform cursor-pointer"
                    onClick={() => toggleFavorite(idx)}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>



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

export default MainPage;
