import React from 'react';
import banner1 from '../assets/banner1.png';

const AdminSection1 = () => {
  return (
    <div className="p-8 bg-gray-100">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <div id="main-content" className="main-content">
          <div className="p-4 rounded-lg shadow-lg bg-white">
            <div className="relative">
              <img
                className="w-full h-50 object-cover rounded-t-lg"
                src={banner1}
                alt="Study Buddies"
              />
            </div>

            <div className="p-6">
              <h1 className="text-2xl font-bold">
                Hello, <span className="font-normal">(Admin name)</span>
              </h1>

              <div className="flex justify-end gap-5 space-x-4 mt-6">
  <button className="bg-white text-violet-600 font-extrabold text-2xl border border-purple-500 py-2 px-4 shadow-md hover:bg-purple-500 hover:text-white transition duration-300">
    Explore
  </button>
  <button className="bg-white text-violet-600  font-extrabold text-2xl border border-purple-500 py-2 px-4 shadow-md hover:bg-purple-500 hover:text-white transition duration-300">
    Users
  </button>
</div>




            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSection1;
