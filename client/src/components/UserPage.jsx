/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react" 
import banner1 from "../assets/banner1.png" 
import logoDefault from "../assets/logo.png" 
// import logo from '../assets/images.png' 
import { FaEdit } from "react-icons/fa" 
import logo1 from "../assets/logo1.png" 
import { FaBars, FaTimes } from "react-icons/fa" 
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa" 
import { Link, useNavigate } from "react-router-dom" 
import axios from "axios" 
import Nav from "./Nav" 
import * as dotenv from 'dotenv';
dotenv.config();
const backendUrl = process.env.backendUrl;

const Userpagebody = () => {
  const navigate = useNavigate() 
  const defaultImageUrl =
    "https://i.pinimg.com/736x/1f/61/74/1f6174a908f416f625bc02173ee7f00a.jpg" 
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    professionalTitle: "",
    username: "",
    role: "",
    email: "",
    gender: "",
  }) 

  const [bio, setBio] = useState(" ") 
  const [isEditingBio, setIsEditingBio] = useState(false) 
  const [editedBio, setEditedBio] = useState(bio) 
  const [showFlashcards, setShowFlashcards] = useState(false) 
  const [showUserModal, setShowUserModal] = useState(false) 
  const [editedUserInfo, setEditedUserInfo] = useState(userInfo) 
  const [showPersonalInfoModal, setShowPersonalInfoModal] = useState(false) 
  const [editedPersonalInfo, setEditedPersonalInfo] = useState(userInfo) 
  const [logo, setLogo] = useState(logoDefault) 
  const [logoFile, setLogoFile] = useState(null) 
  const [favorites, setFavorites] = useState([]) 

  useEffect(() => {
    fetchUserInfo() 
  }, []) 

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/users/profile`,
        { withCredentials: true }
      ) 

      const data = response.data.user 

      setUserInfo({
        fullName: data.fullName || "",
        professionalTitle: data.professionalTitle || "",
        username: data.username || "",
        role: data.role || "",
        email: data.email || "",
        gender: data.gender || "",
      }) 
      setLogo(data.profilePic?.url || "path/to/placeholder.jpg") 
      setBio(data.bio || "") 
    } catch (error) {
      console.error("Failed to fetch user info:", error) 
    }
  } 

  const handleProfilePictureChange = async () => {
    const formData = new FormData() 
    formData.append("profilePic", logoFile) 

    try {
      const response = await axios.put(
        `${backendUrl}/api/users/profile-pic`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      ) 
      setLogo(response.data.profilePicUrl) 
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message ||
          "An error occurred while uploading the profile picture." 
        alert(errorMessage) 
      } else {
        alert("Error uploading profile picture. Please try again.") 
      }
      console.error("Error uploading profile picture:", error) 
    }
  } 

  const handleSaveUserInfo = async () => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/users/profile`,
        {
          fullName: editedPersonalInfo.fullName,
          professionalTitle: editedPersonalInfo.professionalTitle,
          bio: editedBio,
          email: editedPersonalInfo.email,
          gender: editedPersonalInfo.gender,
          username: editedPersonalInfo.username,
        },
        { withCredentials: true }
      ) 
      console.log("Response from backend:", response.data) 
      const updatedUser = response.data.user 
      setUserInfo({
        fullName: updatedUser.fullName || editedUserInfo.fullName,
        professionalTitle:
          updatedUser.professionalTitle || editedUserInfo.professionalTitle,
        username: updatedUser.username || userInfo.username,
        email: updatedUser.email || editedUserInfo.email,
        gender: updatedUser.gender || editedUserInfo.gender,
      }) 

      setBio(updatedUser.bio || editedBio) 

      setShowUserModal(false) 
      document.body.style.overflow = "auto" 
    } catch (error) {
      console.error("Error updating user info:", error) 
    }
  } 

  const handleSavePersonalInfoClick = async () => {
    if (logoFile) {
      await handleProfilePictureChange() 
    }

    await handleSaveUserInfo() 

    await fetchUserInfo() 

    setShowPersonalInfoModal(false) 
    document.body.style.overflow = "auto" 
  } 
  const handleEditBioClick = () => setIsEditingBio(true) 

  const handleSaveBioClick = () => {
    setBio(editedBio)  // Update bio on save
    setIsEditingBio(false) 
  } 

  const handleCreateDeckClick = () => {
    navigate("/decks") 
    setShowFlashcards(!showFlashcards) 
  } 

  const handleEditPersonalInfoClick = () => {
    setEditedUserInfo({
      fullName: userInfo.fullName,
      professionalTitle: userInfo.professionalTitle,
      email: userInfo.email,
      gender: userInfo.gender,
      bio: userInfo.bio,
    }) 
    setShowPersonalInfoModal(true) 
    document.body.style.overflow = "hidden" 
  } 

  const handleCancelModal = () => {
    setShowUserModal(false) 
    setShowPersonalInfoModal(false) 
    document.body.style.overflow = "auto" 
  } 

  const handleSaveUserClick = () => {
    setUserInfo({ ...editedUserInfo, bio: editedBio }) 
    setBio(editedBio) 
    setShowUserModal(false) 
    document.body.style.overflow = "auto" 

    if (logoFile) {
      handleProfilePictureChange() 
    }
  } 

  useEffect(() => {
    const mainContent = document.getElementById("main-content") 
    if (showUserModal || showPersonalInfoModal) {
      mainContent.classList.add("blur") 
    } else {
      mainContent.classList.remove("blur") 
    }

    return () => {
      mainContent.classList.remove("blur") 
    } 
  }, [showUserModal, showPersonalInfoModal]) 

  const [isOpen, setIsOpen] = useState(false) 

  const toggleMenu = () => {
    setIsOpen(!isOpen) 
  } 

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  }) 

  const handleChange = (e) => {
    const { name, value } = e.target 
    setFormData({ ...formData, [name]: value }) 
  } 

  const handleSubmit = (e) => {
    e.preventDefault() 
    console.log("Form submitted:", formData) 
    setFormData({ fullName: "", email: "", message: "" }) 
  } 

  const handleEditUserClick = () => {
    setEditedUserInfo(userInfo) 
    setEditedBio(bio) 
    setShowUserModal(true) 
    document.body.style.overflow = "hidden" 
  } 

  const validateImage = (file) => {
    const validFormats = ["image/jpeg", "image/png", "image/jpg"] 
    const maxSize = 5 * 1024 * 1024  // 5MB in bytes
    const minSize = 1 * 1024 * 1024  // 2MB in bytes

    if (!validFormats.includes(file.type)) {
      alert("The image format should be JPEG, PNG, or JPG.") 
      return false 
    }

    if (file.size < minSize || file.size > maxSize) {
      alert("The photo size should be between 2MB and 5MB.") 
      return false 
    }

    return true 
  } 

  const handleImageChange = (e) => {
    const file = e.target.files[0] 
    if (file && validateImage(file)) {
      setLogoFile(file) 
    } else {
      e.target.value = ""  // Clear the input if the file is invalid
    }
  } 

  const [currentDecks, setCurrentDecks] = useState([])  // State for the current page's decks
  const [deckPage, setDeckPage] = useState(1)  // Current page number
  const [totalDeckPages, setTotalDeckPages] = useState(1)  // Total number of pages
  const [userdecks, setUserdecks] = useState([])  // State to store all decks
  const decksPerPage = 8  // Number of decks per page
  const [loading, setLoading] = useState(true) 

  const fetchUserDecks = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/decks`, {
        withCredentials: true,
      }) 

      const decks = response.data.userDecks 

      const mappedDecks = decks.map((deckObj) => {
        const deck = deckObj.deck 

        return {
          image: deck.deck_image?.url || defaultImageUrl,
          title: deck.deck_name,
          description: deck.description,
          status: deck.deck_status,
          _id: deck._id,
          createdAt: deck.created_at, // Ensure this field is used for sorting
        } 
      }) 

      // Sort decks in descending order (newest first)
      const sortedDecks = mappedDecks.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt) 
      }) 

      // Take only the first 8 decks for display
      const visibleDecks = sortedDecks.slice(0, 8) 

      // Update state with the visible decks
      setCurrentDecks(visibleDecks) 
    } catch (error) {
      console.error("Error fetching decks:", error) 
    } finally {
      setLoading(false)  // Set loading to false after fetching
    }
  } 

  useEffect(() => {
    fetchUserDecks() 
  }, [deckPage])  // Fetch decks whenever the page changes

  // Handle pagination (previous and next)
  // const previousDeckPage = () => {
  //   if (deckPage > 1) setDeckPage(deckPage - 1) 
  // } 

  // const nextDeckPage = () => {
  //   if (deckPage < totalDeckPages) setDeckPage(deckPage + 1) 
  // } 
  const fetchFavorites = async () => {
    try {
      // Fetch user's favorite decks (adjust the API endpoint as needed)
      const response = await axios.get(`${backendUrl}/api/users/fav`, {
        withCredentials: true,
      })  // Change to your actual API
      const data = response.data.favoriteDecks || [] 
      console.log("favi:", data) 
      setFavorites(data)  // Set favorite decks data
    } catch (error) {
      console.error("Error fetching favorite decks:", error) 
    } finally {
      setLoading(false) 
    }
  } 

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    setLoading(true) 
    fetchFavorites()  // Fetch favorite decks
  }, []) 

  return (
    // <div className=' bg-gray-100'>
    <div className="bg-gradient-to-b from-green-50 to-green-200 min-h-screen">
      <Nav />

      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <div
          id="main-content"
          className="main-content bg-gray-100 min-h-screen"
        >
          <div className="p-6 rounded-lg shadow-lg bg-white max-w-7xl mx-auto mt-8">
            {/* Banner Section */}
            <div className="relative">
              <img
                className="w-full h-60 object-cover rounded-t-lg"
                src={banner1}
                alt="User Banner"
              />
            </div>

            {/* Profile Info Section */}
            <div className="flex flex-col md:flex-row items-center justify-between mt-6 space-y-6 md:space-y-0">
              {/* Profile Image and Info */}
              <div className="flex items-center space-x-6">
                <div className="relative w-28 h-28">
                  <img
                    className="w-full h-full object-cover rounded-full border-4 border-green-500 shadow-md"
                    src={logo}
                    alt="User Profile"
                  />
                  <button
                    className="absolute bottom-0 right-0 bg-white border border-gray-300 text-gray-500 rounded-full p-2 hover:bg-green-500 hover:text-white transition duration-300 shadow-lg"
                    onClick={handleEditUserClick}
                    aria-label="Edit Profile Picture"
                  >
                    <FaEdit className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-700">
                    {userInfo.username}
                  </h2>
                  <p className="text-gray-500">
                    {userInfo.professionalTitle || "N/A"}
                  </p>
                </div>
              </div>

            
            </div>

            {/* Bio Section */}
            <div className="mt-6 p-6 bg-gray-50 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Bio</h3>
              <p className="text-gray-600">{bio || "Add your bio here..."}</p>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="p-6 rounded-lg shadow-lg bg-white max-w-7xl mx-auto mt-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-700">
                Personal Information
              </h3>
              <button
                onClick={handleEditPersonalInfoClick}
                className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition duration-300"
              >
                Edit Info
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "User Name", value: userInfo.username },
                { label: "Full Name", value: userInfo.fullName },
                { label: "Email", value: userInfo.email },
                { label: "Role", value: userInfo.role },
                { label: "Gender", value: userInfo.gender },
                { label: "Profession", value: userInfo.professionalTitle },
              ].map((field, idx) => (
                <div key={idx}>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">
                    {field.label}:
                  </label>
                  <input
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
                    type="text"
                    value={field.value || "N/A"}
                    readOnly
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Decks Section */}
          <div className="p-6 rounded-lg shadow-lg bg-white max-w-7xl mx-auto mt-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-700">
                Created Decks
              </h3>
              <button
                onClick={() => navigate("/userflashcards")}
                className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition duration-300 flex items-center space-x-2"
              >
                <span>Show More</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 3.75l7.5 7.5-7.5 7.5M3.75 12h15"
                  />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-full text-center text-gray-500">
                  Loading decks...
                </div>
              ) : currentDecks.length > 0 ? (
                currentDecks.map((deck) => (
                  <div
                    key={deck._id}
                    onClick={() => navigate(`/CreateFlashcard/${deck._id}`)}
                    className="bg-gray-100 rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer transition-transform hover:scale-105 hover:shadow-lg hover:bg-gray-200"
                  >
                    <img
                      src={deck.image || defaultImageUrl}
                      alt={deck.title}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <h3 className="font-semibold text-gray-700 mt-4">
                      {deck.title}
                    </h3>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500">
                  No decks found.
                </div>
              )}
            </div>
          </div>

          {/* Favorites Section */}
          <div className="p-6 rounded-lg shadow-lg bg-white max-w-7xl mx-auto mt-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-700">
                My Favorites
              </h3>
              <button
                onClick={() => navigate("/userFavourites")}
                className="bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition duration-300 flex items-center space-x-2"
              >
                <span>Show More</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 3.75l7.5 7.5-7.5 7.5M3.75 12h15"
                  />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-full text-center text-gray-500">
                  Loading favorites...
                </div>
              ) : favorites.length > 0 ? (
                favorites.map((favorite) => (
                  <div
                    key={favorite.deck._id}
                    onClick={() => navigate(`/view-deck/${favorite.deck._id}`)}
                    className="bg-gray-100 rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer transition-transform hover:scale-105 hover:shadow-lg hover:bg-gray-200"
                  >
                    <img
                      src={favorite.deck.deck_image?.url || defaultImageUrl}
                      alt={favorite.deck.deck_name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <h3 className="font-semibold text-gray-700 mt-4">
                      {favorite.deck.deck_name}
                    </h3>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500">
                  No favorites found.
                </div>
              )}
            </div>
          </div>
        </div>

        {showUserModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-8 w-full max-w-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Edit Profile
              </h3>

              {/* Profile Picture Upload Section */}
              <div className="mb-6">
                <label className="block font-semibold text-gray-700 mb-2">
                  Profile Picture:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  onChange={handleImageChange}
                />
                <div className="text-sm text-red-600 mt-2">
                  <p>* The image size must be between 2MB and 5MB.</p>
                  <p>* Allowed formats: JPEG, JPG, PNG.</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleCancelModal}
                  className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveUserClick}
                  className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition font-semibold"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        {showPersonalInfoModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm z-50">
            <div className="bg-white rounded-lg p-8 w-[800px] shadow-lg backdrop-blur-md">
              <h1 className="text-lg font-semibold mb-4">
                Edit Personal Information
              </h1>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 mb-4">
                  <label className="block font-semibold mb-2">Full Name:</label>
                  <input
                    type="text"
                    value={editedPersonalInfo.fullName}
                    onChange={(e) =>
                      setEditedPersonalInfo({
                        ...editedPersonalInfo,
                        fullName: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="col-span-1 mb-4">
                  <label className="block font-semibold mb-2">Username:</label>
                  <input
                    type="text"
                    value={editedPersonalInfo.username}
                    onChange={(e) =>
                      setEditedPersonalInfo({
                        ...editedPersonalInfo,
                        username: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="col-span-1 mb-4">
                  <label className="block font-semibold mb-2">Email:</label>
                  <input
                    type="email"
                    value={editedPersonalInfo.email}
                    onChange={(e) =>
                      setEditedPersonalInfo({
                        ...editedPersonalInfo,
                        email: e.target.value,
                      })
                    }
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
                  <label className="block font-semibold mb-2">
                    Profession:
                  </label>
                  <input
                    type="text"
                    value={editedPersonalInfo.professionalTitle}
                    onChange={(e) =>
                      setEditedPersonalInfo({
                        ...editedPersonalInfo,
                        professionalTitle: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="col-span-1 mb-4">
                  <label className="block font-semibold mb-2">Gender:</label>
                  <select
                    value={editedPersonalInfo.gender}
                    onChange={(e) =>
                      setEditedPersonalInfo({
                        ...editedPersonalInfo,
                        gender: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="col-span-1 mb-4">
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

      <footer className="bg-gray-800 text-white py-6 mt-10">
    <div className="container mx-auto text-center">
      {/* Footer Text */}
      <p className="text-sm">&copy; 2024 Study Buddy. All Rights Reserved.</p>

      {/* Footer Links */}
      <div className="mt-4 flex justify-center space-x-6">
        {["Privacy Policy", "Terms of Service", "Contact Us"].map((item) => (
          <a
            key={item}
            href={`/${item.toLowerCase().replace(" ", "-")}`}
            className="text-sm hover:text-gray-400 transition-colors duration-300"
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  </footer>


    </div>
  ) 
}

export default Userpagebody;
