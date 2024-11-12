import React, { useState } from 'react';

// Dummy data, original data can be fetched from the database.
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
    { id: 11, name: "Chris Miller", username: "chrismiller", email: "chrismiller@example.com", role: "Admin" },
    { id: 12, name: "Sarah Collins", username: "sarahc", email: "sarahc@example.com", role: "User" },
    // Add more users up to 50 for testing
];

const UserMonitoringPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    // Filter users based on the search term
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate the paginated users to display
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    // Pagination control functions
    const nextPage = () => {
        if (currentPage < Math.ceil(filteredUsers.length / usersPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold text-gray-700">User Monitoring</h1>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64 px-4 py-2 border border-green-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
                />
            </div>

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
                                    <a href={`mailto:${user.email.trim()}`} className="text-green-600 hover:text-pink-700">
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
                >
                    Previous
                </button>
                <span className="text-gray-700">
                    Page {currentPage} of {Math.ceil(filteredUsers.length / usersPerPage)}
                </span>
                <button
                    onClick={nextPage}
                    disabled={currentPage === Math.ceil(filteredUsers.length / usersPerPage)}
                    className={`px-4 py-2 font-semibold rounded-lg ${
                        currentPage === Math.ceil(filteredUsers.length / usersPerPage) 
                            ? "bg-gray-300 text-gray-500" 
                            : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default UserMonitoringPage;