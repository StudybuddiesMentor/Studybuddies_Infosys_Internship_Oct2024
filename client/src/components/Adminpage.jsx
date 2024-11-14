// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import banner1 from '../assets/banner1.png';
import logo1 from '../assets/logo1.png';
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
    <div className="bg-gradient-to-b from-green-50 to-green-200 min-h-screen">


<nav className="flex justify-between items-center p-4 bg-white px-8 text-white relative z-10 m-0">
      <div className="navbar-logo">
        <img 
          src={logo1} 
          alt="Logo" 
          className="rounded-full h-10 cursor-pointer transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className={`hidden md:flex items-center gap-6 transition-transform duration-300 ${isOpen ? "open" : ""}`}>
      <a href="/home" className="font-bold text-black hover:text-green-600 transition-colors duration-300">Home</a>
<a href="/logout" className="font-bold text-black hover:text-green-600 transition-colors duration-300">Logout</a>

      </div>
    
      <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
     
      <div className={`absolute top-full left-0 bg-gray-800 w-full ${isOpen ? "flex" : "hidden"} flex-col p-4 md:hidden`}>
        <a href="/home" className="block text-white hover:text-yellow-400 transition-colors duration-300 p-2">Home</a>
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
              <button className="bg-white text-green-500 font-extrabold text-2xl border border-green-500 py-2 px-4 shadow-md hover:bg-green-500 hover:text-white transition-colors duration-300"
              onClick={() => navigate('/explore')}>
              Explore
              </button>

              <button className="bg-white text-green-500 font-extrabold text-2xl border border-green-500 py-2 px-4 shadow-md hover:bg-green-500 hover:text-white transition-colors duration-300"
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
                 className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300" >
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

export default Adminpagebody;
