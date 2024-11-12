import React from 'react';

// Dummy data, original data can be fetched from the database.
const users = [
    { id: 1, name: "John Doe", username: "johndoe", email: "johndoe@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", username: "janesmith", email: "janesmith@example.com", role: "User" },
    { id: 3, name: "Alice Johnson", username: "alicej", email: "alicej@example.com", role: "Moderator" },
    { id: 4, name: "Robert Brown", username: "robertbrown", email: "robertbrown@example.com;", role: "User" },
    { id: 5, name: "Emily White", username: "emilywhite", email: "emilywhite@example.com", role: "Admin" },
    { id: 6, name: "Michael Green", username: "mgreen", email: "mgreen@example.com", role: "User" },
    { id: 7, name: "Olivia Black", username: "oliviablack", email: "oliviablack@example.com", role: "Moderator" },
    { id: 8, name: "Lucas Grey", username: "lucasgrey", email: "lucasgrey@example.com", role: "User" },
    { id: 9, name: "Sophia Blue", username: "sophiablue", email: "sophiablue@example.com;", role: "Admin" },
    { id: 10, name: "Henry King", username: "henryking", email: "henryking@example.com", role: "User" },
  ];

const UserMonitoringPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="py-3 px-6 text-left border-r">Name</th>
              <th className="py-3 px-6 text-left border-r">Username</th>
              <th className="py-3 px-6 text-left border-r">Email</th>
              <th className="py-3 px-6 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <React.Fragment key={user.id}>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6 text-gray-700 border-r">{user.name}</td>
                  <td className="py-3 px-6 text-gray-700 border-r">{user.username}</td>
                  <td className="py-3 px-6 text-gray-700 border-r">
                    <a href={`mailto:${user.email.trim()}`} className="text-blue-600 hover:text-blue-800"> {user.email.trim()} </a>
                  </td>
                  <td className="py-3 px-6 text-gray-700">
                    <span
                      className={`px-3 py-1 rounded-full ${
                        user.role === 'Admin'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-pink-100 text-pink-600'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
  );
  
};

export default UserMonitoringPage;