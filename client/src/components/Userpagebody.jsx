import React, { useState, useEffect } from 'react';
import banner1 from '../assets/banner1.png';
import logoDefault from '../assets/logo.png';
import { FaEdit } from 'react-icons/fa';

// import './Body.css'

const Userpagebody = () => {
  const [deckCounts, setDeckCounts] = useState({
    createDeck: 3,
    likedDeck: 1,
    favoriteDeck: 2,
  });

  const [flashcardCounts, setFlashcardCounts] = useState({
    createFlashcard: 5,
    likedFlashcard: 2,
    favoriteFlashcard: 4,
  });

  const [userInfo, setUserInfo] = useState({
    fullName: 'John Doe',
    professionalTitle: 'Software Developer',
    memberSince: 'September 2, 2024',
    lastActive: 'Today at 2:00 PM',
    username: 'john_doe',
    role: 'User',
    email: 'john.doe@example.com',
    gender: 'male',
  });

  const [bio, setBio] = useState("I'm a user creating decks and flashcards for knowledge sharing");
  const [isEditingBio, setIsEditingBio] = useState(false);

  const handleEditBioClick = () => setIsEditingBio(true);
  const handleSaveBioClick = () => setIsEditingBio(false);

  const [showFlashcards, setShowFlashcards] = useState(false);
  const handleCreateDeckClick = () => {
    setShowFlashcards(!showFlashcards);
  };

  const [showUserModal, setShowUserModal] = useState(false);
  const [editedUserInfo, setEditedUserInfo] = useState(userInfo);
  const [showPersonalInfoModal, setShowPersonalInfoModal] = useState(false);
  const [editedPersonalInfo, setEditedPersonalInfo] = useState(userInfo);
  const [logo, setLogo] = useState(logoDefault);
  const [logoFile, setLogoFile] = useState(null);
  const [editedBio, setEditedBio] = useState(bio); // State for edited bio

  const handleEditUserClick = () => {
    setEditedUserInfo(userInfo);
    setEditedBio(bio);
    setShowUserModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleEditPersonalInfoClick = () => {
    setEditedPersonalInfo(userInfo);
    setShowPersonalInfoModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCancelModal = () => {
    setShowUserModal(false);
    setShowPersonalInfoModal(false);
    document.body.style.overflow = 'auto'; 
};


  const handleSaveUserClick = () => {
    setUserInfo({ ...editedUserInfo, bio: editedBio });
    setBio(editedBio);
    setShowUserModal(false);
    document.body.style.overflow = 'auto';

    if (logoFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(logoFile);
    }
  };

  const handleSavePersonalInfoClick = () => {
    setUserInfo(editedPersonalInfo);
    setShowPersonalInfoModal(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (showUserModal || showPersonalInfoModal) {
      mainContent.classList.add('blur');
    } else {
      mainContent.classList.remove('blur');
    }

    return () => {
      mainContent.classList.remove('blur');
    };
  }, [showUserModal, showPersonalInfoModal]);

  return (
    <div className='p-8 bg-gray-100'>
      <div className='max-w-6xl mx-auto flex flex-col gap-8'>
        <div id='main-content' className='main-content'>
              <div className='p-4 rounded-lg shadow-lg bg-white'>
        <div className='relative'>
          <img className='w-full h-50 object-cover rounded-t-lg' src={banner1} alt='User' />
        </div>

        <div className='flex justify-between items-center mt-4'> 
          <div className="flex items-center">
          <img className='w-20 h-20 rounded-full border-4 border-white' src={logo} alt='User' />
          <div className='flex-grow items-center'>
            <h2 className='text-xl font-semibold'>{userInfo.fullName}</h2>
            <p>{userInfo.professionalTitle}</p>
         </div>
          <div className="">
          <FaEdit className='edit-icon text-gray-500 cursor-pointer' onClick={handleEditUserClick} />
          </div> 
        </div>
        <div className=" flex items-center">
        <div className='mt-4'>
          <p>Member since: {userInfo.memberSince}</p>
          <p>Last active: {userInfo.lastActive}</p>
        </div></div></div>

        <div className='flex font-bold justify-between mt-4'>
          <div className='mr-2'>
            <h3>Bio</h3>
            <p>{bio}</p>
          </div>
          <div>
            <h2 className='text-2xl font-bold text-blue-600'>04:30 hrs</h2>
            <p>Time spent learning</p>
          </div>
        </div>
      </div>
  

          <div className='p-4 mt-2 rounded-lg shadow-lg bg-white'>
            <h3 className='text-lg font-semibold'>Personal Information</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
              <div>
                <label className='text-sm'>User Name:</label>
                <input className='w-full p-2 border rounded mt-1' type='text' value={userInfo.username} readOnly />
              </div>
              <div>
                <label className='text-sm'>Full Name:</label>
                <input className='w-full p-2 border rounded mt-1' type='text' value={userInfo.fullName} readOnly />
              </div>
              <div>
                <label className='text-sm'>Email:</label>
                <input className='w-full p-2 border rounded mt-1' type='email' value={userInfo.email} readOnly />
              </div>
              <div>
                <label className='text-sm'>Role:</label>
                <input className='w-full p-2 border rounded mt-1' type='text' value={userInfo.role} readOnly />
              </div>
              <div>
                <label className='text-sm'>Gender:</label>
                <input className='w-full p-2 border rounded mt-1' type='text' value={userInfo.gender} readOnly />
              </div>
              <div>
                <label className='text-sm'>Profession:</label>
                <input className='w-full p-2 border rounded mt-1' type='text' value={userInfo.professionalTitle} readOnly />
              </div>
              <FaEdit className='ml-auto text-gray-500 cursor-pointer' onClick={handleEditPersonalInfoClick} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 mt-2 section user-actions block sm:flex ">
           <div className="flex flex-col items-center shadow-md rounded-lg p-4 decks w-72 mx-auto ">
             <button
                className="bg-blue-500 text-white py-3 px-6 rounded-lg cursor-pointer font-bold text-lg mb-2 transition-transform duration-300 shadow-lg create-decks hover:bg-blue-700 hover:scale-105"
                onClick={handleCreateDeckClick}
              >
                <span className="mr-2 plus-symbol">+</span> Create Decks
              </button>
              <div className="grid grid-cols-1 gap-4 deck-actions w-full mt-4">
                <div className="flex justify-between items-center p-2 bg-gray-100 rounded-md action-item">
                  <span>Created Deck</span>
                  <span className="font-semibold count">{deckCounts.createDeck}</span>
                </div>
          <div className="flex justify-between items-center p-2 bg-gray-100 rounded-md action-item">
            <span>Liked Deck</span>
            <span className="font-semibold count">{deckCounts.likedDeck}</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-100 rounded-md action-item">
            <span>Favorite Deck</span>
            <span className="font-semibold count">{deckCounts.favoriteDeck}</span>
          </div>
        </div>
      </div>



      {showFlashcards && (
      <div className="bg-white rounded-lg shadow-md p-4 mt-4 w-72 mx-auto flashcards">
        <button className="bg-blue-500 text-white py-3 px-6 rounded-lg cursor-pointer font-bold text-lg mb-2 transition-transform duration-300 shadow-lg create-flashcards hover:bg-blue-700 hover:scale-105">
          <span className="mr-2 plus-symbol">+</span> Create Flashcards
        </button>
        <div className="grid grid-cols-1 gap-4 flashcard-actions w-full mt-4">
          <div className="flex justify-between items-center p-2 bg-gray-100 rounded-md action-item">
            <span>Created Flashcard</span>
            <span className="font-semibold count">{flashcardCounts.createFlashcard}</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-100 rounded-md action-item">
            <span>Liked Flashcard</span>
            <span className="font-semibold count">{flashcardCounts.likedFlashcard}</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-100 rounded-md action-item">
            <span>Favorite Flashcard</span>
            <span className="font-semibold count">{flashcardCounts.favoriteFlashcard}</span>
                </div>
              </div>
            </div>
             )}
          </div>
          </div>


        {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
  <div className="bg-white rounded-lg p-8 w-96 shadow-lg">
    <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
    
    <div className="mb-4">
      <label className="block font-semibold mb-2">Profile Picture:</label>
      <input
        type="file"
        accept="image/*"
        className="w-full p-2 border border-gray-300 rounded-lg"
        onChange={(e) => setLogoFile(e.target.files[0])}
      />
    </div>

    <div className="mb-4">
      <label className="block font-semibold mb-2">Username:</label>
      <input
        type="text"
        value={editedUserInfo.username}
        onChange={(e) => setEditedUserInfo({ ...editedUserInfo, username: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded-lg"
      />
    </div>

    <div className="mb-4">
      <label className="block font-semibold mb-2">Profession:</label>
      <input
        type="text"
        value={editedUserInfo.professionalTitle}
        onChange={(e) => setEditedUserInfo({ ...editedUserInfo, professionalTitle: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded-lg"
      />
    </div>

    <div className="mb-4">
      <label className="block font-semibold mb-2">Bio:</label>
      <textarea
        value={editedBio}
        onChange={(e) => setEditedBio(e.target.value)}
        rows="2"
        className="w-full p-2 border border-gray-300 rounded-lg resize-none"
      ></textarea>
    </div>

    <div className="flex justify-between mt-6">
      <button
        onClick={handleSaveUserClick}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-bold"
      >
        Save
      </button>
      <button
        onClick={handleCancelModal}
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-bold"
      >
        Cancel
      </button>
    </div>
  </div>
</div>
)}
{showPersonalInfoModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm z-50" >
    <div className="bg-white rounded-lg p-8 w-96 shadow-lg backdrop-blur-md">
      <h1 className="text-lg font-semibold mb-4">Edit Personal Information</h1>

      <div className="mb-4">
        <label className="block font-semibold mb-2">Full Name:</label>
        <input
          type="text"
          value={editedPersonalInfo.fullName}
          onChange={(e) => setEditedPersonalInfo({ ...editedPersonalInfo, fullName: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-2">Email:</label>
        <input
          type="email"
          value={editedPersonalInfo.email}
          onChange={(e) => setEditedPersonalInfo({ ...editedPersonalInfo, email: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-2">Role:</label>
        <input
          type="text"
          value={editedPersonalInfo.role}
          readOnly
          className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-2">Gender:</label>
        <select
          value={editedPersonalInfo.gender}
          onChange={(e) => setEditedPersonalInfo({ ...editedPersonalInfo, gender: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={handleSavePersonalInfoClick}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-bold"
        >
          Save
        </button>
        <button
          onClick={handleCancelModal}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-bold"
        >
          Cancel
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
