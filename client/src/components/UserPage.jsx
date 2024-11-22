/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import banner1 from '../assets/banner1.png';
import logoDefault from '../assets/logo.png';
// import logo from '../assets/images.png';
import { FaEdit } from 'react-icons/fa';
import logo1 from '../assets/logo1.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Userpagebody = () => {
  const navigate = useNavigate();
  const defaultImageUrl = 'https://i.pinimg.com/736x/1f/61/74/1f6174a908f416f625bc02173ee7f00a.jpg'; 

  const [userInfo, setUserInfo] = useState({
    fullName: '',
    professionalTitle: '',
    memberSince: '',
    lastActive: '',
    username: '',
    role: '',
    email: '',
    gender: '',

  });

  const [bio, setBio] = useState(" ");
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [editedBio, setEditedBio] = useState(bio);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editedUserInfo, setEditedUserInfo] = useState(userInfo);
  const [showPersonalInfoModal, setShowPersonalInfoModal] = useState(false);
  const [editedPersonalInfo, setEditedPersonalInfo] = useState(userInfo);
  const [logo, setLogo] = useState(logoDefault);
  const [logoFile, setLogoFile] = useState(null);

  useEffect(() => {
    fetchUserInfo(); 
  }, []);
 
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/users/profile', { withCredentials: true });

      const data = response.data.user;

      setUserInfo({
        fullName: data.fullName || '',
        professionalTitle: data.professionalTitle || '',
        memberSince: new Date(data.createdAt).toLocaleDateString() || '',
        lastActive: 'Today at 2:00 PM', 
        username: data.username || '',
        role: data.role || '',
        email: data.email || '',
        gender: data.gender || '',
      });
      setLogo(data.profilePic?.url || 'path/to/placeholder.jpg');
      setBio(data.bio || ''); 
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };

  const handleProfilePictureChange = async () => {
    const formData = new FormData();
    formData.append('profilePic', logoFile);
  
    try {
      const response = await axios.put(
        'http://localhost:9000/api/users/profile-pic', 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );
      setLogo(response.data.profilePicUrl); 
    }catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || 'An error occurred while uploading the profile picture.';
        alert(errorMessage); 
      } else {
        
        alert('Error uploading profile picture. Please try again.');
      }
      console.error('Error uploading profile picture:', error);
    }
  
  };
  
  
  const handleSaveUserInfo = async () => {
    try {
      const response = await axios.put(
        'http://localhost:9000/api/users/profile', 
        {
          fullName: editedPersonalInfo.fullName,
          professionalTitle: editedPersonalInfo.professionalTitle,
          bio: editedBio, 
          email: editedPersonalInfo.email,
          gender: editedPersonalInfo.gender,
          username: editedPersonalInfo.username
        },
        { withCredentials: true }
      );
      console.log('Response from backend:', response.data);
      const updatedUser = response.data.user;
      setUserInfo({
        fullName: updatedUser.fullName || editedUserInfo.fullName,
        professionalTitle: updatedUser.professionalTitle || editedUserInfo.professionalTitle, 
        username: updatedUser.username || userInfo.username,
        email: updatedUser.email || editedUserInfo.email,
        gender: updatedUser.gender || editedUserInfo.gender,
      });
  
      
      setBio(updatedUser.bio || editedBio) 
      
      setShowUserModal(false);
      document.body.style.overflow = 'auto';
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };
  
  
  const handleSavePersonalInfoClick = async () => {
    if (logoFile) {
      await handleProfilePictureChange();
    }
  
    await handleSaveUserInfo();
  
    
    await fetchUserInfo() 
  
    setShowPersonalInfoModal(false);
    document.body.style.overflow = 'auto';
  };
  const handleEditBioClick = () => setIsEditingBio(true);

  const handleSaveBioClick = () => {
    setBio(editedBio); // Update bio on save
    setIsEditingBio(false);
  };

  const handleCreateDeckClick = () => {
    navigate('/decks');
    setShowFlashcards(!showFlashcards);
  };


  const handleEditPersonalInfoClick = () => {
    setEditedUserInfo({
   fullName: userInfo.fullName,
   professionalTitle: userInfo.professionalTitle,  
   email: userInfo.email,
   gender: userInfo.gender,
   bio: userInfo.bio,
 })
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
      handleProfilePictureChange();
      };
      
    }
  
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

  const handleEditUserClick = () => {
    setEditedUserInfo(userInfo);
    setEditedBio(bio);
    setShowUserModal(true);
    document.body.style.overflow = 'hidden';
  };
  
  const validateImage = (file) => {
    const validFormats = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    const minSize = 1 * 1024 * 1024; // 2MB in bytes
  
    if (!validFormats.includes(file.type)) {
      alert('The image format should be JPEG, PNG, or JPG.');
      return false;
    }
  
    if (file.size < minSize || file.size > maxSize) {
      alert('The photo size should be between 2MB and 5MB.');
      return false;
    }
  
    return true;
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && validateImage(file)) {
      setLogoFile(file);
    } else {
      e.target.value = ''; // Clear the input if the file is invalid
    }
  };

  const [currentDecks, setCurrentDecks] = useState([]); // State for the current page's decks
  const [deckPage, setDeckPage] = useState(1);           // Current page number
  const [totalDeckPages, setTotalDeckPages] = useState(1); // Total number of pages
  const [userdecks, setUserdecks] = useState([]); // State to store all decks
  const decksPerPage = 8; // Number of decks per page

  const fetchUserDecks = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/decks', {
        withCredentials: true,
      });

    
      const decks = response.data.userDecks;

      
      const mappedDecks = decks.map((deckObj) => {
        const deck = deckObj.deck;

        const deckData = {
          image: deck.deck_image?.url || defaultImageUrl,
          title: deck.deck_name,
          description: deck.description,
          status: deck.deck_status,
          _id:deck._id,
        };

        const tags = deckObj.tags.map((tag) => ({
         
          name: tag.name,
       
        }));

        return { ...deckData, tags };
      });

      // Update state with the mapped decks
      setUserdecks(mappedDecks);

      // Calculate total pages based on the number of decks
      const totalPages = Math.ceil(mappedDecks.length / decksPerPage);
      setTotalDeckPages(totalPages);

      // Set current decks for the current page
      const startIndex = (deckPage - 1) * decksPerPage;
      const endIndex = startIndex + decksPerPage;
      setCurrentDecks(mappedDecks.slice(startIndex, endIndex));

    } catch (error) {
      console.error('Error fetching decks:', error);
    }
  };

  useEffect(() => {
    fetchUserDecks();
  }, [deckPage]); // Fetch decks whenever the page changes

  // Handle pagination (previous and next)
  const previousDeckPage = () => {
    if (deckPage > 1) setDeckPage(deckPage - 1);
  };

  const nextDeckPage = () => {
    if (deckPage < totalDeckPages) setDeckPage(deckPage + 1);
  };

  return (
    // <div className=' bg-gray-100'>
    <div className="bg-gradient-to-b from-green-50 to-green-200 min-h-screen">
      <nav className="flex justify-between items-center p-4 bg-white px-8 text-white relative z-10 m-0" >
        <div className="navbar-logo">
          <img
            src={logo1}
            alt="Logo"
            className="rounded-full h-10 cursor-pointer transition-transform duration-300 hover:scale-110"
          />
        </div>
        <div className="hidden md:flex items-center gap-6 bg-white py-4 px-8  transition-transform duration-300">
          <a href="/main-page" className="text-green-500 bg-white border border-green-500 px-4 py-2 rounded-full shadow-md hover:bg-green-500 hover:text-white transition-colors duration-300 font-bold">
          Home
          </a>
          <a href="/decks" className="text-green-500 bg-white border border-green-500 px-4 py-2 rounded-full shadow-md hover:bg-green-500 hover:text-white transition-colors duration-300 font-bold">
          Create Decks
          </a>
          <a href="/logout" className="text-green-500 bg-white border border-green-500 px-4 py-2 rounded-full shadow-md hover:bg-green-500 hover:text-white transition-colors duration-300 font-bold">
          Logout
          </a>
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
    {/* <button
      className="absolute bottom-1 right-1 bg-white border border-gray-300 text-gray-500 rounded-full p-1 hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out shadow-lg hover:shadow-blue-500/50"
      onClick={handleEditUserClick}
      aria-label="Edit Profile Picture"
    >
      <FaEdit className="w-4 h-4 transform transition-transform duration-300 hover:scale-125" />
    </button> */}
    <button
  className="absolute bottom-1 right-1 bg-white border border-gray-300 text-gray-500 rounded-full p-1 hover:bg-green-600 hover:text-white transition duration-300 ease-in-out shadow-lg hover:shadow-green-500/50"
  onClick={handleEditUserClick}
  aria-label="Edit Profile Picture"
>
  <FaEdit className="w-4 h-4 transform transition-transform duration-300 hover:scale-125" />
</button>
                </div>
                <div className="flex-grow items-center" style={{ marginLeft: '25px' }}>

                  <h2 className='text-xl font-semibold'>{userInfo.username}</h2>
                  <p>{userInfo.professionalTitle||''}</p>
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
                {/* <button
                  onClick={handleEditPersonalInfoClick}
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out">
                  Edit Info
                </button> */}
                <button 
                 onClick={handleEditPersonalInfoClick}
                 className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition-colors duration-300" >
                 Edit Info
                </button>
                </div>
              </div>


            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
              <div>
                <label className='text-sm'>User Name:</label>
                <input className='w-full p-2 border rounded mt-1' type='text' value={userInfo.username||''} readOnly />
              </div>
              <div>
                <label className='text-sm'>Full Name:</label>
                <input className='w-full p-2 border rounded mt-1' type='text' value={userInfo.fullName||''} readOnly />
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
                <input className='w-full p-2 border rounded mt-1' type='text' value={userInfo.professionalTitle||''} readOnly />
              </div>

            </div>
          </div>

          <div className="p-4 mt-2 rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-bold mb-4">Created Decks</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {currentDecks.map((deck) => (
          <div
            key={deck._id}
            onClick={() => navigate(`/view-deck/${deck._id}`)}
            className="bg-gray-200 rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-gray-300 ease-in-out duration-300"
          >
            <img
              src={deck.image}
              alt={deck.title}
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">{deck.title}</h3>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={previousDeckPage}
          disabled={deckPage === 1}
          className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={nextDeckPage}
          disabled={deckPage === totalDeckPages}
          className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>

        </div>


        {showUserModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-8 w-99 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
          <div className="mb-4">
  <label className="block font-semibold mb-2">Profile Picture:</label>
  <input
    type="file"
    accept="image/*"
    className="w-full p-2 border border-gray-300 rounded-lg"
    onChange={handleImageChange}
  />
  <p className="text-red-600 mt-2">* The image should be between 2MB and 5MB.</p>
  <p className="text-red-600">* The image should be in JPEG, JPG, or PNG format.</p>
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
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-bold">
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

export default Userpagebody;
