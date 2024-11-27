import { useEffect, useState } from "react";
import Header from "./Header";
import Nav from "./Nav";
import HomeFooter from "./Homefooter";

const About = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <>
      {isLoggedIn ? <Nav /> : <Header />}
      <div className="about-page bg-gradient-to-b from-green-50 to-green-200 py-10 px-5">
        <div className="max-w-screen-lg mx-auto">
          <div className="about-section bg-gradient-to-r from-green-50 to-blue-50 shadow-lg rounded-lg p-8 mb-12">
            {/* Title */}
            <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-8">
              About <span className="text-blue-500">Study Buddies</span>
            </h1>

            {/* Introduction */}
            <p className="text-lg text-gray-700 leading-relaxed text-center mb-8 max-w-4xl mx-auto">
              Welcome to{" "}
              <span className="font-semibold text-blue-600">Study Buddies</span>
              , your personalized learning companion! Our mission is to
              revolutionize the way you learn by offering tools that make
              education engaging, accessible, and collaborative. Whether you're
              preparing for exams or exploring new topics, Study Buddies helps
              you create, organize, and share flashcards and decks in a
              thriving, community-driven environment.
            </p>

            {/* Features Section */}
            <div className="features-section bg-white shadow-lg rounded-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Key Features
              </h2>

              {/* Feature List */}
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Feature 1 */}
                <li className="flex items-start space-x-4">
                  <div className="text-blue-500 text-3xl">
                    <i className="fas fa-pen"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-gray-800">
                      Create Flashcards
                    </h3>
                    <p className="text-gray-600">
                      Effortlessly create flashcards and organize them into
                      decks for seamless learning.
                    </p>
                  </div>
                </li>

                {/* Feature 2 */}
                <li className="flex items-start space-x-4">
                  <div className="text-green-500 text-3xl">
                    <i className="fas fa-globe"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-gray-800">
                      Explore Community Content
                    </h3>
                    <p className="text-gray-600">
                      Discover and favorite decks created by others to broaden
                      your knowledge base.
                    </p>
                  </div>
                </li>

                {/* Feature 3 */}
                <li className="flex items-start space-x-4">
                  <div className="text-yellow-500 text-3xl">
                    <i className="fas fa-users"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-gray-800">
                      Real-Time Collaboration
                    </h3>
                    <p className="text-gray-600">
                      Team up with classmates and peers to collaborate on study
                      materials in real time.
                    </p>
                  </div>
                </li>

                {/* Feature 4 */}
                <li className="flex items-start space-x-4">
                  <div className="text-red-500 text-3xl">
                    <i className="fas fa-search"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-gray-800">
                      Search and Filter
                    </h3>
                    <p className="text-gray-600">
                      Instantly find flashcards and decks with advanced search
                      and filtering options.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Mission and Vision */}
          <div className="mission-vision bg-gradient-to-br from-green-100 via-blue-50 to-green-100 shadow-2xl rounded-lg p-10 mb-12">
            {/* Title */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 tracking-wide uppercase">
                Our Mission <span className="text-green-600">&</span> Vision
              </h2>
              <p className="text-lg text-gray-600 mt-2">
                Empowering learners. Transforming education. Inspiring a
                brighter tomorrow.
              </p>
            </div>

            {/* Mission and Vision Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Mission Section */}
              <div className="bg-white shadow-lg rounded-md p-8 border-t-4 border-green-500">
                <h3 className="text-2xl font-semibold text-green-600 mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  At{" "}
                  <span className="font-bold text-gray-900">Study Buddies</span>
                  , we are dedicated to fostering a learning ecosystem where
                  students and educators can collaborate seamlessly. Our mission
                  is to provide tools and resources that simplify studying,
                  spark creativity, and empower every learner to reach their
                  fullest potential.
                </p>
              </div>

              {/* Vision Section */}
              <div className="bg-white shadow-lg rounded-md p-8 border-t-4 border-blue-500">
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We envision a world where education transcends barriers and
                  connects people globally. Through innovation and
                  collaboration, we strive to build a platform that inspires
                  curiosity, fosters a sense of belonging, and ignites a
                  lifelong love for learning in every user.
                </p>
              </div>
            </div>

            {/* Inspirational Quote */}
            <div className="mt-12 bg-gradient-to-r from-green-200 to-blue-200 rounded-md p-6 text-center shadow-md">
              <p className="text-lg italic text-gray-800">
                "Education is not the filling of a pail, but the lighting of a
                fire."
                <span className="font-semibold text-green-600">
                  {" "}
                  – W.B. Yeats
                </span>
              </p>
            </div>

            {/* Call to Action */}
            <div className="mt-10 text-center">
              <a
                href="/about"
                className="inline-block bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold text-lg px-8 py-3 rounded-full shadow-md transform hover:scale-105 transition duration-300"
              >
                Learn More About Us
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="contact-info bg-gradient-to-br from-blue-50 to-green-50 shadow-xl rounded-lg p-8 mb-12">
            {/* Title */}
            <div className="text-center mb-6">
              <h2 className="text-4xl font-bold text-gray-800 tracking-wide">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-600 mt-2">
                We'd love to hear from you! Whether you have questions,
                feedback, or suggestions, feel free to reach out.
              </p>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Email Section */}
              <div className="flex items-center bg-white shadow-lg rounded-lg p-6 border-l-4 border-blue-500">
                <div className="text-blue-500 text-3xl mr-4">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    Email Us
                  </h3>
                  <p className="text-gray-700">
                    Send your queries to:
                    <span className="block font-bold text-gray-900 mt-1">
                      infosysstudybuddies@gmail.com
                    </span>
                  </p>
                </div>
              </div>

              {/* Address Section */}
              <div className="flex items-center bg-white shadow-lg rounded-lg p-6 border-l-4 border-green-500">
                <div className="text-green-500 text-3xl mr-4">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    Visit Us
                  </h3>
                  <p className="text-gray-700">StudyBuddies, Inc.</p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-10 text-center">
              <a
                href="/contact"
                className="inline-block bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold text-lg px-8 py-3 rounded-full shadow-md transform hover:scale-105 transition duration-300"
              >
                Contact Us Now
              </a>
            </div>
          </div>
        </div>
      </div>
      {isLoggedIn ? (
        <footer className="bg-gray-800 text-white py-6 mt-10">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 Study Buddy. All Rights Reserved.</p>
            <div className="mt-3 space-x-5">
              {["Privacy Policy", "Terms of Service", "Contact Us"].map(
                (item) => (
                  <a
                  key={item}
                  href={"/" + item.toLowerCase().replaceAll(" ", "-")}
                  className="hover:text-gray-400"
                >
                
                    {item}
                  </a>
                )
              )}
            </div>
          </div>
        </footer>
      ) : (
        <HomeFooter />
      )}
    </>
  );
};

export default About;   