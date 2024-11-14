import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { FaBars, FaTimes } from 'react-icons/fa';

const users = [
    { id: 1, name: "John Doe", username: "johndoe", email: "johndoe@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", username: "janesmith", email: "janesmith@example.com", role: "User" },
    { id: 3, name: "Alice Johnson", username: "alicej", email: "alicej@example.com", role: "User" },
    { id: 4, name: "Robert Brown", username: "robertbrown", email: "robertbrown@example.com", role: "User" },
    { id: 5, name: "Emily White", username: "emilywhite", email: "emilywhite@example.com", role: "Admin" },
    { id: 6, name: "Michael Green", username: "mgreen", email: "mgreen@example.com", role: "User" },
    { id: 7, name: "Olivia Black", username: "oliviablack", email: "oliviablack@example.com", role: "User" },
    { id: 8, name: "Lucas Grey", username: "lucasgrey", email: "lucasgrey@example.com", role: "User" },
    { id: 9, name: "Sophia Blue", username: "sophiablue", email: "sophiablue@example.com", role: "Admin" },
    { id: 10, name: "Henry King", username: "henryking", email: "henryking@example.com", role: "User" },
    { id: 11, name: "Beast King", username: "beastking", email: "beastking@example.com", role: "User" },
    { id: 12, name: "Milly White", username: "millywhite", email: "millywhite@example.com", role: "User" },
];

const UserMonitoringPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isOpen, setIsOpen] = useState(false);

    const usersPerPage = 10;

    // Filter users based on the search term
    const filteredUsers = users.filter((user) =>
        [user.name, user.username, user.email, user.role].some(field =>
            field.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Calculate paginated users
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-6">
            {/* Navbar */}
            <nav className="flex justify-between items-center p-4 bg-green-200 text-white shadow-lg rounded-xl mb-6">
                <div className="navbar-logo">
                    <img
                        src={logo}
                        alt="Logo"
                        className="rounded-full h-12 cursor-pointer transition-transform duration-300 hover:scale-110"
                    />
                </div>
                <div className="hidden md:flex items-center gap-8 transition-transform duration-300">
                    <a href="/Adminpage" className="font-semibold text-black hover:text-yellow-300 transition-colors duration-300 relative rounded-lg p-2">
                        Home
                    </a>
                    <a href="/logout" className="font-semibold text-black hover:text-yellow-300 transition-colors duration-300 relative rounded-lg p-2">
                        Logout
                    </a>
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="focus:outline-none text-white rounded-full p-2 hover:bg-green-500 transition-colors duration-300">
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
                <div className={`absolute top-full left-0 bg-green-700 w-full ${isOpen ? "flex" : "hidden"} flex-col p-4 md:hidden rounded-lg shadow-lg`}>
                    <a href="/home" className="block text-white hover:text-yellow-300 transition-colors duration-300 p-2 rounded-lg">Home</a>
                    <a href="/decks" className="block text-white hover:text-yellow-300 transition-colors duration-300 p-2 rounded-lg">Create Decks</a>
                    <a href="/logout" className="block text-white hover:text-yellow-300 transition-colors duration-300 p-2 rounded-lg">Logout</a>
                </div>
            </nav>

            {/* Search Box */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold text-gray-700">User Monitoring</h1>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64 px-4 py-2 border border-green-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
                    aria-label="Search users"
                />
            </div>

            {/* User Table */}
            <div className="overflow-x-auto shadow-md sm:rounded-lg mb-4">
                <table className="min-w-full bg-white border-collapse">
                    <thead className="bg-green-200 text-gray-600">
                        <tr>
                            <th className="py-3 px-6 text-left border-r">Name</th>
                            <th className="py-3 px-6 text-left border-r">Username</th>
                            <th className="py-3 px-6 text-left border-r">Email</th>
                            <th className="py-3 px-6 text-left">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user) => (
                            <tr key={user.id} className="border-b hover:bg-green-50">
                                <td className="py-3 px-6 text-gray-700 border-r">{user.name}</td>
                                <td className="py-3 px-6 text-gray-700 border-r">{user.username}</td>
                                <td className="py-3 px-6 text-gray-700 border-r">
                                    <a href={`mailto:${user.email.trim()}`} className="text-blue-600 hover:text-blue-800">
                                        {user.email.trim()}
                                    </a>
                                </td>
                                <td className="py-3 px-6 text-gray-700">
                                    <span
                                        className={`px-3 py-1 rounded-full ${
                                            user.role === 'Admin'
                                                ? 'bg-green-100 text-green-600'
                                                : 'bg-pink-100 text-pink-600'
                                        }`}
                                    >
                                        {user.role}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center">
                <button
                    onClick={previousPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 font-semibold rounded-lg ${
                        currentPage === 1 ? "bg-gray-300 text-gray-500" : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                    aria-label="Previous page"
                >
                    Previous
                </button>
                <span className="text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 font-semibold rounded-lg ${
                        currentPage === totalPages 
                            ? "bg-gray-300 text-gray-500" 
                            : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                    aria-label="Next page"
                >
                    Next
                </button>
            </div>

            {/* Footer */}
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

export default UserMonitoringPage;