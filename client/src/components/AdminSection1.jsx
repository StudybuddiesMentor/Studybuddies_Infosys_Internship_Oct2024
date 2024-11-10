import React, { useState, useEffect } from 'react';
import banner1 from '../assets/banner1.png';
import logoDefault from '../assets/logo.png';

const Userpagebody = () => {
  // Original password fetched from database
  const originalPassword = 'currentPassword123';

  const [Info, setUserInfo] = useState({
    fullName: 'John Doe',
    adminname: 'john',
    email: 'john.doe@example.com',
    gender: 'Male',
  });

  const [bio, setBio] = useState("I'm a user creating decks and flashcards for knowledge sharing");
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [editedBio, setEditedBio] = useState(bio);
  const [showPersonalInfoModal, setShowPersonalInfoModal] = useState(false);
  const [editedPersonalInfo, setEditedPersonalInfo] = useState(Info);
  const [editedPassword, setEditedPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [Newpassword, setNewPassword] = useState(originalPassword); // Newpassword state to hold the updated password
  const [successMessage, setSuccessMessage] = useState(''); // Success message state

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

    // Update the new password
    setNewPassword(editedPassword); // Save the new password
    setUserInfo({ ...editedPersonalInfo });
    setShowPersonalInfoModal(false);
    document.body.style.overflow = 'auto';

    // Show success message
    setSuccessMessage('Password changed successfully!');
    
    // Clear password fields after saving
    setEditedPassword('');
    setConfirmPassword('');

    // Clear success message after a delay (e.g., 3 seconds)
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

  return (
    <div className="p-8 bg-gray-100">
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
              <button className="bg-white text-violet-600 font-extrabold text-2xl border border-purple-500 py-2 px-4 shadow-md hover:bg-purple-500 hover:text-white transition duration-300">
                Explore
              </button>
              <button className="bg-white text-violet-600 font-extrabold text-2xl border border-purple-500 py-2 px-4 shadow-md hover:bg-purple-500 hover:text-white transition duration-300">
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
                <div className="col-span-1">
                  <label className="block font-semibold mb-2 text-gray-700">Change Password:</label>
                  <input
                    type="password"
                    value={editedPassword}
                    onChange={(e) => setEditedPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-800"
                    placeholder="Enter new password"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block font-semibold mb-2 text-gray-700">Confirm Password:</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-800"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button
                  onClick={handleCancelModal}
                  className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 hover:scale-105 transform transition duration-300 ease-in-out"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePersonalInfoClick}
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 transform transition duration-300 ease-in-out"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Userpagebody;