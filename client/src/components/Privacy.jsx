import "./Privacy.css";
import logo from "../assets/logo1.png"; // adjust path according to actual location
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

const Privacy = () => {
const Navigate = useNavigate();
const [dropdownOpen, setDropdownOpen] = useState(false);

return (
    <div className="body">
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
                  {["Math", "Science", "Languages", "History"].map(
                    (category) => (
                      <a
                        href={`/category/${category.toLowerCase()}`}
                        key={category}
                        className="block px-4 py-2 text-gray-700 hover:bg-green-100 transition-colors"
                      >
                        {category}
                      </a>
                    )
                  )}
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
      <div className="privacy-policy">
        <h1>
          <strong>Study Buddies Privacy Policy</strong>
        </h1>
        <p>Last Updated: Nov 6, 2024</p>
        <br></br>
        <p>
          Welcome to StudeyBuddies platform. Your privacy is important to us.
          This Privacy Policy outlines how we collect, use, and protect your
          information when you use our flashcard-building platform. By using our
          website, you agree to this policy: <br></br>
          <br></br>
          <li>Personal Data We Collect</li>
          <li>How We Use Your Information</li>
          <li>Sharing Your Information</li>
          <li>Data Security</li>
          <li>Your Choices</li>
          <li>Changes to This Policy</li>
          <li>How to Contact Us</li>
        </p>
        <br></br>

        {/* Personal Data Usage */}
        <div className="privacy-section">
          <h2>
            <strong>Personal Data We Collect</strong>
          </h2>
          <p>
            We collect information about you from different sources and in
            various ways when you use our services, including information you
            provide directly, information collected automatically, information
            from third-party data sources, and data we infer or generate from
            other data. Information you provide directly. We collect personal
            data you provide to us. For example:<br></br>
            <li>
              <b>Name and Contact Information:</b> When you sign up for our
              services, we collect your name, username, email address,
              birthdate, Mobile No. etc.{" "}
            </li>
            <li>
              <b>Demographic data: </b>In some cases, such as when you register
              or participate in surveys, we request that you provide age,
              gender, and similar demographic details.
            </li>
            <li>
              <b>Other profile information: </b>We collect information about
              your interests, biographic information, education level, intended
              use of our service, links to social media accounts, and classes
              for your profile.
            </li>
            <li>
              <b>Content and files: </b>We collect the flashcards, decks, photos
              or other files you upload to our services; and if you send us
              email messages or other communications, we collect and retain
              those communications. Finally, if you leave reviews or comments on
              our service or notes and flashcards, we collect the content of
              those reviews and comments.
            </li>
          </p>
        </div>

        {/* Data Usage Section */}
        <div className="privacy-section">
          <h2>
            <strong>How We Use Your Information</strong>
          </h2>
          <p>
            We collect information about you when you use the Service for a
            variety of reasons in order to support Quizlet and to enable our
            team to continue to create engaging experiences for our users. For
            Examples:<br></br>
            <br></br>
            <li>
              <b>Providing, maintaining and improving the Service: </b>Account
              information we collect from you allows us to help you log in, host
              your content, and use the various study tools we have. It also
              allows us to learn about how you and others use StudyBuddies to
              help create new activities and services.
            </li>
            <li>
              <b>
                Improving, personalizing and facilitating your use of the
                Service:{" "}
              </b>
              When you sign up and use a StudyBuddies account, we may associate
              certain information with your new account, such as information
              about other StudyBuddies accounts you had or currently have, and
              your prior usage of the Service. For example, we use information
              collected from cookies and other technologies, like pixel tags, to
              save your language preferences, so we will be able to have our
              services appear in the language you prefer. We do this in order to
              ensure that content from the Service is presented in the most
              effective manner for you.
            </li>
            <li>
              <b>
                Measuring, tracking and analyzing trends and usage in connection
                with your use or the performance of the Service:{" "}
              </b>
              In order to develop and enhance our products and deliver a
              consistent, secure and continuous experience, we need to gather
              certain information to analyze usage and performance of the
              Service. We also use mobile analytics software to pursue our
              legitimate interests in operating and improving StudyBuddies by
              allowing us to better understand the functionality of our mobile
              software on your device. This software may record information such
              as how often you use the application, the events and activities
              that occur within the application, aggregated usage, performance
              data, and where the application was downloaded from.
            </li>
          </p>
        </div>

        {/* Data Sharing Section */}
        <div className="privacy-section">
          <h2>
            <strong>Sharing Your Information</strong>
          </h2>
          <p>
            We value your privacy and do not share your data with third-party
            marketers. However, we may share data with trusted partners for
            analytics and development, always under strict confidentiality
            agreements. Expect:<br></br>
            <br></br>
            <li>
              <b>For Legal Requirements: </b>If required by law, we may disclose
              your information to comply with legal processes.
            </li>
            <li>
              <b>With Service Providers: </b>To improve and support our service
              (e.g., hosting providers) but only under strict confidentiality
              agreements.
            </li>
            <br></br>
          </p>
        </div>

        {/* Data Security Section */}
        <div className="privacy-section">
          <h2>
            <strong>Data Security</strong>
          </h2>
          <p>
            We use industry-standard security measures to protect your data.
            Your information is securely stored and encrypted, ensuring the
            highest level of security on our platform. We take reasonable steps
            to protect your information from unauthorized access and ensure data
            safety. However, please be aware that no internet service is
            entirely secure.
          </p>
        </div>

        {/* Your Choices Section */}
        <div className="privacy-section">
          <h2>
            <strong> Your Choices </strong>
          </h2>

          <li>
            <b>Manage Your Data: </b>You can access, edit, or delete your
            account information and content anytime in your account settings.
          </li>

          <li>
            <b>Cookies: </b> We may use cookies for enhancing site performance.
            You can control cookies through your browser settings.
          </li>
          <br></br>
        </div>

        {/* Privacy Changes Section */}
        <div className="privacy-section">
          <h2>
            <strong> Changes to This Policy </strong>
          </h2>

          <p>
            We may update this Privacy Policy from time to time. When changes
            are made, we’ll notify you via email or post an update on the
            website.
          </p>
          <br></br>
        </div>

        {/* Contact Us Section */}
        <div className="privacy-section">
          <h2>
            <strong> How to Contact Us </strong>
          </h2>

          <p>
            If you have a privacy concern, complaint, or a question for
            StudyBuddies, please contact us at infosysstudybuddies@gmail.com.
            <br></br>
            <br></br>
            We also have the following contact details:<br></br>
            StudyBuddies, Inc.<br></br>
            Plot No. 44/97 A, 3rd cross,<br></br>
            Electronic City, Hosur Road,<br></br>
            Bengaluru - 560 100<br></br>
            Phone +91 (80285) 20261 / +91 (80398) 72222 <br></br>
            Fax +91 (80285) 20362
          </p>
          <br></br>
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

export default Privacy;
