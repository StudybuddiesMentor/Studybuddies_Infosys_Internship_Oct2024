import React, { useState } from "react";

const LogoutButton = () => {
    const [showModal, setShowModal] = useState(false);

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:9000/api/users/logout", {
                method: "POST",
                credentials: "include", // Include cookies
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message); // Display success message
                localStorage.clear();
                window.location.href = "/"; // Redirect to login page
            } else {
                alert(data.message || "Logout failed!");
            }
        } catch (error) {
            console.error("Logout error:", error);
            alert("An error occurred while logging out. Please try again.");
        }
    };

    return (
        <>
            {/* Logout Section */}
            <div className="flex flex-col items-start space-y-4">
                {/* Logout Button */}
                <button
                    onClick={() => setShowModal(true)}
                    className="block px-4 py-2 text-gray-700 hover:bg-green-100">
                    Logout
                </button>
            </div>

            {/* Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                        <h2 className="text-lg font-bold mb-4 text-gray-800">Confirm Logout</h2>
                        <p className="text-gray-700 mb-6">Are you sure you want to log out?</p>
                        <div className="flex justify-end space-x-4">
                            {/* Cancel Button */}
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                            >
                                Cancel
                            </button>
                            {/* Confirm Logout Button */}
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    handleLogout();
                                }}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LogoutButton;
