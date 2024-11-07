import React, { useState, useEffect } from 'react';
import banner1 from '../assets/banner1.png';
import logoDefault from '../assets/logo.png';
import { FaEdit } from 'react-icons/fa';
// import './Body.css'; // Uncomment if styles are needed

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
    username: 'john',
    role: 'User',
    email: 'john.doe@example.com',
    gender: 'Male',
  });

  const [bio, setBio] = useState("I'm a user creating decks and flashcards for knowledge sharing");
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [editedBio, setEditedBio] = useState(bio);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editedUserInfo, setEditedUserInfo] = useState(userInfo);
  const [showPersonalInfoModal, setShowPersonalInfoModal] = useState(false);
  const [editedPersonalInfo, setEditedPersonalInfo] = useState(userInfo);
  const [logo, setLogo] = useState(logoDefault);
  const [logoFile, setLogoFile] = useState(null);

  const handleEditBioClick = () => setIsEditingBio(true);

  const handleSaveBioClick = () => {
    setBio(editedBio); // Update bio on save
    setIsEditingBio(false);
  };

  const handleCreateDeckClick = () => {
    setShowFlashcards(!showFlashcards);
  };

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
    setUserInfo({ ...editedUserInfo, bio: editedBio });
    setBio(editedBio);
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
             <div className="relative w-24 h-24">
      <img
        className="w-full h-full object-cover rounded-full border-2 border-gray-200 shadow-lg"
        src={logo}
        alt="User"
      />
      <button
        className="absolute bottom-1 right-1 bg-white border border-gray-300 text-gray-500 rounded-full p-1 hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out shadow-lg hover:shadow-blue-500/50"
        onClick={handleEditUserClick}
        aria-label="Edit Profile Picture"
      >
        <FaEdit className="w-4 h-4 transform transition-transform duration-300 hover:scale-125 " />
      </button>
    </div>
          <div className="flex-grow items-center" style={{ marginLeft: '25px' }}>

                  <h2 className='text-xl font-semibold'>{userInfo.username}</h2>
                  <p>{userInfo.professionalTitle}</p>
                </div>
                {/* <div className="">
                  <FaEdit className='edit-icon text-gray-500 cursor-pointer' onClick={handleEditUserClick} />
                </div> */}
              </div>
              <div className=" flex items-center">
                <div className='mt-4'>
                  <p>Member since: {userInfo.memberSince}</p>
                  {/* <p>Last active: {userInfo.lastActive}</p> */}
                </div></div></div>

            <div className='flex  justify-between mt-4'>
              <div className='mr-2'>
                <h3>Bio</h3>
                <p className='bio font-bold'>{bio}</p>
              </div>
              <div>
                <h2 className='text-2xl font-bold text-blue-600'>04:30 hrs</h2>
                <p>Time spent learning</p>
              </div>
            </div>
          </div>


          <div className='p-4 mt-2 rounded-lg shadow-lg bg-white'>
          <div className="flex items-center justify-between mb-4">
  <h3 className="text-lg font-semibold">Personal Information</h3>
  <div className='b'>
    <button
      onClick={handleEditPersonalInfoClick}
      className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out"
    >
      Edit Info
    </button>
  </div>
</div>


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

            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 mt-2 section user-actions block sm:flex ">
          <div className="flex flex-col items-center shadow-md rounded-lg p-4 decks w-[1000px] mx-auto">

              <button
                className="bg-blue-500 text-white py-3 px-6 rounded-lg cursor-pointer font-bold text-lg mb-2 transition-transform duration-300 shadow-lg create-decks hover:bg-blue-700 hover:scale-105"
                onClick={handleCreateDeckClick}
              >
                <span className="mr-2 plus-symbol">+</span> Create Decks
              </button>

              <div className="flex justify-center deck-actions w-[90%] max-w-[800px] mt-4 mx-auto" style={{ gap: '160px' }}>
              <div className="flex justify-between items-center p-4 bg-gray-100 rounded-md action-item gap-x-4">
    <span>Created Deck</span>
    <span className="font-semibold count ml-4">{deckCounts.createDeck}</span>
</div>

  <div className="flex justify-between items-center p-4 bg-gray-100 rounded-md action-item gap-x-4">
    <span>Liked Deck</span>
    <span className="font-semibold count">{deckCounts.likedDeck}</span>
  </div>
  <div className="flex justify-between items-center p-4 bg-gray-100 rounded-md action-item gap-x-4">
    <span>Favorite Deck</span>
    <span className="font-semibold count">{deckCounts.favoriteDeck}</span>
  </div>
</div>

            </div>
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
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm z-50">
    <div className="bg-white rounded-lg p-8 w-[800px] shadow-lg backdrop-blur-md">
      <h1 className="text-lg font-semibold mb-4">Edit Personal Information</h1>

      <div className="grid grid-cols-3 gap-4">
        
        <div className="col-span-1 mb-4">
          <label className="block font-semibold mb-2">Full Name:</label>
          <input
            type="text"
            value={editedPersonalInfo.fullName}
            onChange={(e) => setEditedPersonalInfo({ ...editedPersonalInfo, fullName: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        
        <div className="col-span-1 mb-4">
          <label className="block font-semibold mb-2">Username:</label>
          <input
            type="text"
            value={editedPersonalInfo.username}
            onChange={(e) => setEditedPersonalInfo({ ...editedPersonalInfo, username: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        
        <div className="col-span-1 mb-4">
          <label className="block font-semibold mb-2">Email:</label>
          <input
            type="email"
            value={editedPersonalInfo.email}
            onChange={(e) => setEditedPersonalInfo({ ...editedPersonalInfo, email: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        
        <div className="col-span-1 mb-4">
          <label className="block font-semibold mb-2">Role:</label>
          <input
            type="text"
            value={editedPersonalInfo.role}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        
        <div className="col-span-1 mb-4">
          <label className="block font-semibold mb-2">Profession:</label>
          <input
            type="text"
            value={editedPersonalInfo.professionalTitle}
            onChange={(e) => setEditedPersonalInfo({ ...editedPersonalInfo, professionalTitle: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        

        <div className="col-span-1 mb-4">
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
      </div>

      <div className="col-span-1 mb-4" >
          <label className="block font-semibold mb-2">Bio:</label>
          <textarea
            value={editedBio}
            onChange={(e) => setEditedBio(e.target.value)}
            rows="2"
            className="w-[730px] p-2 border border-gray-300 rounded-lg resize-none"

          ></textarea>
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