import { IoTerminalOutline } from "react-icons/io5";
import React from "react";
import Header from './Header';
import Homefooter from './Homefooter';

const TermsOfService = () => {
  return (
    <>
    {/* Header */}
    <Header />
    <div className="flex items-center justify-center min-h-screen bg-[#632bad] p-5">
      <div className="w-full max-w-md bg-white rounded shadow-md">
        <div className="flex items-center justify-center px-10 py-5 border-b">
          <div className="flex items-center justify-center w-12 h-12 bg-[#632bad] rounded-full text-white text-xl">
          <IoTerminalOutline />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold">TERMS AND CONDITIONS</h2>
            <p className="text-sm text-gray-500">Last updated on November 06 2024</p>
          </div>
        </div>
        <div className="overflow-auto h-80 px-10 py-5 space-y-4">
          <ol className="space-y-4">
            <li>
              <h3 className="font-semibold">Terms and Conditions</h3>
              <p className="text-gray-700"> Welcome to StudyBuddies! By using our platform, you agree to the following terms and conditions.
              Please read carefully and reach out with any questions.</p>
            </li>
            <li>
              <h3 className="font-semibold">1. Account Responsibilities</h3>
              <p className="text-gray-700">When you create an account, you are responsible for keeping your credentials secure. StudyBuddies is not liable for any loss or damage resulting from your failure to protect your account.</p>
            </li>
            <li>
              <h3 className="font-semibold">2. Intellectual Property</h3>
              <p className="text-gray-700">All content generated on StudyBuddies, including decks and flashcards, is subject to intellectual property rights. Unauthorized copying, redistribution, or usage outside of the platform is prohibited.</p>
            </li>
            <li>
              <h3 className="font-semibold">3. Usage Limitations</h3>
              <p className="text-gray-700">Our platform is designed for educational purposes. Engaging in any activity that disrupts the service or violates the rights of others is strictly forbidden.</p>
            </li>
            <li>
              <h3 className="font-semibold">4. Data Privacy</h3>
              <p className="text-gray-700">We value your privacy and follow industry-standard practices to protect your data. For details on data handling, please review our Privacy Policy.</p>
            </li>
            <li>
              <h3 className="font-semibold">5. Modifications to Terms</h3>
              <p className="text-gray-700">StudyBuddies reserves the right to modify these terms at any time. Users will be notified of any significant changes via email or platform notifications.</p>
            </li>
          </ol>
        </div>
        <div className="flex justify-between p-5 border-t"></div>
      </div>
    </div>
    {/* Footer */}
    <Homefooter />
    </>
  );
};

export default TermsOfService;