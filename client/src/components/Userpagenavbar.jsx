import React, { useState } from 'react';
import logo from '../assets/images.png'; 
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
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
  );
};

export default Navbar;
