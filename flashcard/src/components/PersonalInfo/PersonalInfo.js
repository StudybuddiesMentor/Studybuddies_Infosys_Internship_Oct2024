import React from 'react';

function PersonalInfo() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Personal Information</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-pink-100 p-4 rounded-md text-gray-700">User ID: puerto_rico</div>
        <div className="bg-pink-100 p-4 rounded-md text-gray-700">Full Name: puerto_rico</div>
        <div className="bg-pink-100 p-4 rounded-md text-gray-700">Email ID: puerto_rico</div>
        <div className="bg-pink-100 p-4 rounded-md text-gray-700">Password: puerto_rico</div>
        <div className="bg-pink-100 p-4 rounded-md text-gray-700">Role: puerto_rico</div>
        <div className="bg-pink-100 p-4 rounded-md text-gray-700">Gender: puerto_rico</div>
      </div>
    </div>
  );
}

export default PersonalInfo;
