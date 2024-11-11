import React, { useState } from 'react';
import logo from '../assets/images.png'; // Adjust the path to your logo image
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Social media icons

const Footer = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ fullName: '', email: '', message: '' });
  };

  return (
    <footer className="bg-gray-900 text-white p-8 text-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Us Form */}
        <div className="flex flex-col">
          <h3 className="text-lg font-bold">Contact Us</h3>
          <h4 className="text-md mt-1">Send us a message:</h4>
          <form className="flex flex-col mt-4" onSubmit={handleSubmit}>
            <label htmlFor="fullName" className="mt-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Your Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="p-2 mb-4 border border-gray-300 rounded"
            />
            <label htmlFor="email" className="mt-2">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-2 mb-4 border border-gray-300 rounded"
            />
            <label htmlFor="message" className="mt-2">Your Message</label>
            <textarea
              name="message"
              id="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="p-2 mb-4 border border-gray-300 rounded"
            ></textarea>
            <button type="submit" className="bg-yellow-400 text-gray-900 py-2 rounded cursor-pointer">
              Submit
            </button>
          </form>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col mt-8 md:mt-0">
          <p className="text-yellow-400">All our Pages</p>
          <div className="flex flex-col mt-2 space-y-2">
            <a href="/home" className="text-blue-200 hover:text-white">Home</a>
            <a href="/Personal information" className="text-blue-200 hover:text-white">Personal information</a>
            <a href="/deck" className="text-blue-200 hover:text-white">Deck</a>
            {/* <a href="/contactus" className="text-blue-200 hover:text-white">Contact Us</a> */}
          </div>
        </div>

        {/* Logo and Email */}
        <div className="mt-8 md:mt-0 text-center">
          <img src={logo} alt="Study Buddy Logo" className="rounded-full h-12 mx-auto" />
          <p className="mt-2 text-sm text-gray-500 hover:text-blue-300 cursor-pointer">infosysstudybuddies@gmail.com</p>
          {/* <div className="flex justify-center space-x-4 mt-4">
            <a href="https://facebook.com" aria-label="Facebook" className="text-gray-400 hover:text-white">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" aria-label="Twitter" className="text-gray-400 hover:text-white">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" aria-label="Instagram" className="text-gray-400 hover:text-white">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className="text-gray-400 hover:text-white">
              <FaLinkedin />
            </a>
          </div> */}
        </div>
      </div>

      <hr className="my-4 border-gray-300" />
      <div className="flex flex-col md:flex-row justify-between items-center py-2">
        <p>&copy; 2024 Study Buddy. All rights reserved.</p>
        <div className="flex space-x-2 mt-2 md:mt-0">
          <a href="/terms-of-service" className="text-blue-200 hover:text-white">Terms of Service</a>
          <span>|</span>
          <a href="/privacy-policy" className="text-blue-200 hover:text-white">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
