import { IoTerminalOutline } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import Header from './Header';
import Homefooter from './Homefooter';
import Nav from "./Nav";
import HomeFooter from "./Homefooter";

const TermsOfService = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the token cookie is present
        // const token = getCookie('token');
        const token = localStorage.getItem('token');

        if (token) {
            setIsLoggedIn(true); // If token exists, user is logged in
        } else {
            setIsLoggedIn(false); // If no token, user is not logged in
        }
    }, []);

  return (
    <>
      {/* Header */}
      {isLoggedIn ? <Nav /> : <Header />}

      {/* Main Container */}
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-green-200 p-6">
        <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden border border-gray-300 md:max-w-4xl lg:max-w-5xl">
          
          {/* Top-left Corner Icon */}
          <div className="absolute top-4 left-4 text-orange-800 text-2xl sm:text-3xl md:text-4xl lg:text-5xl opacity-90 animate-bounce hover:animate-pulse transition-transform duration-300">
            <IoTerminalOutline className="hover:rotate-12 hover:scale-110" />
          </div>
          
          {/* Title Section Centered */}
          <div className="flex items-center justify-center py-4 bg-blue-300 text-black-10 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Terms and Conditions</h2>
          </div>

          {/* Last Updated Information */}
          <div className="text-center text-sm text-gray-600 py-2">
            Last updated on November 14, 2024
          </div>

          {/* Terms Content */}
          <div className="h-80 overflow-y-auto px-4 py-6 bg-gray-50 space-y-4 sm:px-6 sm:py-8 md:px-10 md:py-10 lg:h-96">
            <ol className="space-y-4">
              <li>
                <h3 className="font-semibold text-lg md:text-xl text-gray-800">Welcome</h3>
                <p className="text-gray-700 leading-relaxed">
                  Welcome to StudyBuddies! By using our platform, you agree to the following terms and conditions.
                  Please read carefully and reach out with any questions.
                </p>
              </li>
              <li>
                <h3 className="font-semibold text-lg md:text-xl text-gray-800">1. Account Responsibilities</h3>
                <p className="text-gray-700 leading-relaxed">
                  When you create an account, you are responsible for keeping your credentials secure. StudyBuddies is not liable for any loss or damage resulting from your failure to protect your account.
                </p>
              </li>
              <li>
                <h3 className="font-semibold text-lg md:text-xl text-gray-800">2. Intellectual Property</h3>
                <p className="text-gray-700 leading-relaxed">
                  All content generated on StudyBuddies, including decks and flashcards, is subject to intellectual property rights. Unauthorized copying, redistribution, or usage outside of the platform is prohibited.
                </p>
              </li>
              <li>
                <h3 className="font-semibold text-lg md:text-xl text-gray-800">3. Usage Limitations</h3>
                <p className="text-gray-700 leading-relaxed">
                  Our platform is designed for educational purposes. Engaging in any activity that disrupts the service or violates the rights of others is strictly forbidden.
                </p>
              </li>
              <li>
                <h3 className="font-semibold text-lg md:text-xl text-gray-800">4. Data Privacy</h3>
                <p className="text-gray-700 leading-relaxed">
                  We value your privacy and follow industry-standard practices to protect your data. For details on data handling, please review our Privacy Policy.
                </p>
              </li>
              <li>
                <h3 className="font-semibold text-lg md:text-xl text-gray-800">5. Modifications to Terms</h3>
                <p className="text-gray-700 leading-relaxed">
                  StudyBuddies reserves the right to modify these terms at any time. Users will be notified of any significant changes via email or platform notifications.
                </p>
              </li>
            </ol>
          </div>
          
          {/* Acknowledgement Section */}
          <div className="bg-gray-100 px-4 py-3 sm:px-8 sm:py-4 text-center">
            <p className="text-sm text-gray-600">
              By using StudyBuddies, you acknowledge that you have read and agree to these terms.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      {isLoggedIn ?  (
                <footer className="bg-gray-800 text-white py-6 mt-10">
                    <div className="container mx-auto text-center">
                    <p>&copy; 2024 Study Buddy. All Rights Reserved.</p>
                    <div className="mt-3 space-x-5">
                        {["Privacy Policy", "Terms of Service", "Contact Us"].map((item) => (
                        <a
                            key={item}
                            href={`/${item.toLowerCase().replaceAll(" ", "-")}`}
                            className="hover:text-gray-400"
                        >
                            {item}
                        </a>
                        ))}
                    </div>
                    </div>
                </footer>
            ) : (
            <HomeFooter />
            )}
    </>
  );
};

export default TermsOfService;