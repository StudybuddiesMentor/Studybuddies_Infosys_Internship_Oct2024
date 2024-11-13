// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import banner1 from '../assets/banner1.png';
import logo from '../assets/logo.png';
import img from '../assets/photo.jpg';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Adminpagebody = () => {
  const navigate = useNavigate();
  // Original password fetched from database
  const originalPassword = 'currentPassword123';

  const [Info, setUserInfo] = useState({
    fullName: 'John Doe',
    adminname: 'john',
    email: 'john.doe@example.com',
    gender: 'Male',
  });

  const [showPersonalInfoModal, setShowPersonalInfoModal] = useState(false);
  const [editedPersonalInfo, setEditedPersonalInfo] = useState(Info);
  const [editedPassword, setEditedPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [Newpassword, setNewPassword] = useState(originalPassword);
  const [successMessage, setSuccessMessage] = useState('');

  const handleEditPersonalInfoClick = () => {
    setEditedPersonalInfo(Info);
    setShowPersonalInfoModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCancelModal = () => {
    setShowPersonalInfoModal(false);
    document.body.style.overflow = 'auto';
    setEditedPassword('');
    setConfirmPassword('');
  };

  const handleSavePersonalInfoClick = () => {
    if (editedPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    if (editedPassword === originalPassword) {
      alert("New password must not be the same as the current password.");
      return;
    }

    setNewPassword(editedPassword);
    setUserInfo({ ...editedPersonalInfo });
    setShowPersonalInfoModal(false);
    document.body.style.overflow = 'auto';
    setSuccessMessage('Password changed successfully!');
    setEditedPassword('');
    setConfirmPassword('');

    setTimeout(() => setSuccessMessage(''), 3000);
  };

  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (showPersonalInfoModal) {
      mainContent.classList.add('blur');
    } else {
      mainContent.classList.remove('blur');
    }

    return () => {
      mainContent.classList.remove('blur');
    };
  }, [showPersonalInfoModal]);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
    <div className=" bg-gray-100">


<nav className="flex justify-between items-center p-4 bg-purple-800 text-white relative z-10">
      <div className="navbar-logo">
        <img 
          src={logo} 
          alt="Logo" 
          className="rounded-full h-10 cursor-pointer transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className={`hidden md:flex items-center gap-6 transition-transform duration-300 ${isOpen ? "open" : ""}`}>
        <a href="/home" className="font-bold text-white hover:text-yellow-400 transition-colors duration-300">Home</a>
        <a href="/decks" className="font-bold text-white hover:text-yellow-400 transition-colors duration-300">Create Decks</a>
        <a href="/logout" className="font-bold text-white hover:text-yellow-400 transition-colors duration-300">Logout</a>
      </div>
    
      <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
     
      <div className={`absolute top-full left-0 bg-gray-800 w-full ${isOpen ? "flex" : "hidden"} flex-col p-4 md:hidden`}>
        <a href="/home" className="block text-white hover:text-yellow-400 transition-colors duration-300 p-2">Home</a>
        <a href="/decks" className="block text-white hover:text-yellow-400 transition-colors duration-300 p-2">Create Decks</a>
        <a href="/logout" className="block text-white hover:text-yellow-400 transition-colors duration-300 p-2">Logout</a>
      </div>
    </nav>
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <div id="main-content" className="main-content">
          <div className="p-4 rounded-lg shadow-lg bg-white">
            <div className="relative">
              <img className="w-full h-50 object-cover rounded-t-lg" src={banner1} alt="Admin" />
            </div>

            <div className="flex justify-between items-center mt-4">
              <h2 className="text-xl font-semibold text-gray-800"><b>Welcome, </b>{Info.adminname}</h2>
            </div>
            <div className="flex justify-end gap-5 space-x-4 mt-6">
              <button className="bg-white text-violet-600 font-extrabold text-2xl border border-purple-500 py-2 px-4 shadow-md hover:bg-purple-500 hover:text-white transition duration-300"
              onClick={() => navigate('/explore')}>
                Explore
              </button>
              <button className="bg-white text-violet-600 font-extrabold text-2xl border border-purple-500 py-2 px-4 shadow-md hover:bg-purple-500 hover:text-white transition duration-300"
              onClick={() => navigate('/UserMonitoringPage')}>
                Users
              </button>
            </div>
          </div>

          <div className="p-4 mt-2 rounded-lg shadow-lg bg-white relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Admin Information</h3>
              <button
                onClick={handleEditPersonalInfoClick}
                className="absolute top-4 right-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 transform transition duration-300 ease-in-out"
              >
                Edit Info
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-sm text-gray-700">Username:</label>
                <input className="w-full p-2 border rounded mt-1 text-gray-800" type="text" value={Info.adminname} readOnly />
              </div>
              <div>
                <label className="text-sm text-gray-700">Full Name:</label>
                <input className="w-full p-2 border rounded mt-1 text-gray-800" type="text" value={Info.fullName} readOnly />
              </div>
              <div>
                <label className="text-sm text-gray-700">Email:</label>
                <input className="w-full p-2 border rounded mt-1 text-gray-800" type="email" value={Info.email} readOnly />
              </div>
              <div>
                <label className="text-sm text-gray-700">Gender:</label>
                <input className="w-full p-2 border rounded mt-1 text-gray-800" type="text" value={Info.gender} readOnly />
              </div>
            </div>

            {successMessage && (
              <div className="mt-4 text-green-600 font-semibold">
                {successMessage}
              </div>
            )}
          </div>
        </div>

        {showPersonalInfoModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-8 w-[800px] shadow-xl">
              <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">Edit Admin Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1">
                  <label className="block font-semibold mb-2 text-gray-700">Username:</label>
                  <input
                    type="text"
                    value={editedPersonalInfo.adminname}
                    onChange={(e) => setEditedPersonalInfo({ ...editedPersonalInfo, adminname: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-800"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block font-semibold mb-2 text-gray-700">Full Name:</label>
                  <input
                    type="text"
                    value={editedPersonalInfo.fullName}
                    onChange={(e) => setEditedPersonalInfo({ ...editedPersonalInfo, fullName: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-800"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block font-semibold mb-2 text-gray-700">Email:</label>
                  <input
                    type="email"
                    value={editedPersonalInfo.email}
                    onChange={(e) => setEditedPersonalInfo({ ...editedPersonalInfo, email: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-800"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block font-semibold mb-2 text-gray-700">Gender:</label>
                  <select
                    value={editedPersonalInfo.gender}
                    onChange={(e) => setEditedPersonalInfo({ ...editedPersonalInfo, gender: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-800"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {/* <div className="col-span-1">
                  <label className="block font-semibold mb-2 text-gray-700">Change Password:</label>
                  <input
                    type="password"
                    value={editedPassword}
                    onChange={(e) => setEditedPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-800"
                    placeholder="Enter new password"
                  />
                </div> */}
                {/* <div className="col-span-1">
                  <label className="block font-semibold mb-2 text-gray-700">Confirm Password:</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-800"
                    placeholder="Confirm new password"
                  />
                </div> */}
              </div>

              <div className="mt-8 flex justify-between space-x-4">
                <button
                  onClick={handleSavePersonalInfoClick}
                  className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg transition duration-300"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancelModal}
                  className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 hover:shadow-lg transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="bg-gray-900 text-white p-8 text-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Us Form */}
        <div className="flex flex-col">
          <h3 className="text-lg font-bold">Contact Us</h3>
          <h4 className="text-md mt-1">Send us a message:</h4>
          <form className="flex flex-col mt-4" onSubmit={handleSubmit}>
          <label htmlFor="fullName" className="mt-2 text-white">Full Name</label>

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
            <label htmlFor="email" className="mt-2 text-white">Email</label>
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
            <label htmlFor="message" className="mt-2 text-white">Your Message</label>
            <textarea
              name="message"
              id="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="p-2 mb-4 border border-gray-300 rounded"
            ></textarea>
            <button type="submit" className="bg-yellow-400 text-gray-900 py-2 rounded cursor-pointer hover:bg-yellow-500 transition">
              Submit
            </button>
          </form>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col mt-8 md:mt-0">
          <p className="text-yellow-400">All our Pages</p>
          <div className="flex flex-col mt-2 space-y-2">
            <a href="/home" className="text-blue-200 hover:text-white transition" onClick={() => navigate('/home')}>Home</a>
            <a href="/deck" className="text-blue-200 hover:text-white transition" onClick={() => navigate('/deck')}>Deck</a>
          </div>
        </div>

        {/* Logo and Contact */}
        <div className="mt-8 md:mt-0 text-center">
          <img src={img} alt="Study Buddy Logo" className="rounded-full h-12 mx-auto" />
          <a href="mailto:infosysstudybuddies@gmail.com" className="mt-2 text-sm text-gray-500 hover:text-blue-300 cursor-pointer">
            infosysstudybuddies@gmail.com
          </a>
          
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
    </div>
  );
};

export default Adminpagebody;
