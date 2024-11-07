import React, { useState } from 'react';
import Logo from '../assets/StudyBuddiesLogo.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import { RiArrowDownSLine } from 'react-icons/ri';
import Button from './Button';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const menuItems = [
        { name: 'Home', hasDropdown: false },
        { name: 'About', hasDropdown: false },
        { name: 'Study-Tools', hasDropdown: true },
        { name: 'Subject-Areas', hasDropdown: true }
    ];

    return (
        <nav className='relative w-full max-w-full mx-auto py-5 px-4 text-white flex items-center justify-between'>
            
            <img 
                className='w-[9rem] md:w-[11rem] lg:w-[13rem] transition-all duration-300 ease-in-out'
                src={Logo} 
                alt="Logo" 
            />

            <div className="hidden md:block w-full max-w-md mx-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-2 rounded-md border-none focus:outline-none bg-[#1E293B] text-white"
                />
            </div>

            <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </div>

            <div className={`absolute md:static top-[80px] left-0 w-full md:w-auto md:flex items-center bg-[#0F172A] md:bg-transparent transition-all duration-500 ease-in ${isOpen ? 'block' : 'hidden'}`}>
                <div className='font-medium flex flex-col md:flex-row items-center'>
                    {menuItems.map((item) => (
                        <a 
                            key={item.name} 
                            href="#" 
                            className='text-white hover:underline mx-4 my-2 md:my-0 flex items-center'
                        >
                            {item.name}
                            {item.hasDropdown && <RiArrowDownSLine className="ml-1 text-white" />}
                        </a>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
                    <Button label="+ Create" bgColor="bg-green-500" hoverColor="hover:bg-green-600" />
                    <Button label="Login" bgColor="bg-blue-500" hoverColor="hover:bg-blue-600" />
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"></div>
        </nav>
    );
}

export default Navbar;
