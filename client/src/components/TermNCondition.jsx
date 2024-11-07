import { IoTerminalOutline } from "react-icons/io5";
import React from "react";
// import { IonIcon } from '@react-icons/all-files/io5/IoTerminalOutline';

const TermsOfService = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#632bad] p-5">
      <div className="w-full max-w-md bg-white rounded shadow-md">
        <div className="flex items-center justify-center px-10 py-5 border-b">
          <div className="flex items-center justify-center w-12 h-12 bg-[#632bad] rounded-full text-white text-xl">
          <IoTerminalOutline />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold">TERMS OF SERVICE</h2>
            <p className="text-sm text-gray-500">Last updated on September 12 2024</p>
          </div>
        </div>
        <div className="overflow-auto h-60 px-10 py-5 space-y-4">
          <ol className="space-y-4">
            <li>
              <h3 className="font-semibold">Terms of use</h3>
              <p className="text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, quidem doloribus cumque vero, culpa voluptates dolorum reprehenderit nihil nisi odit necessitatibus voluptate voluptatibus magni ducimus sed accusamus illo nobis veniam.</p>
            </li>
            <li>
              <h3 className="font-semibold">Intellectual property rights</h3>
              <p className="text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, quidem doloribus cumque vero, culpa voluptates dolorum reprehenderit nihil nisi odit necessitatibus voluptate voluptatibus magni ducimus sed accusamus illo nobis veniam.</p>
            </li>
            <li>
              <h3 className="font-semibold">Prohibited activities</h3>
              <p className="text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, quidem doloribus cumque vero, culpa voluptates dolorum reprehenderit nihil nisi odit necessitatibus voluptate voluptatibus magni ducimus sed accusamus illo nobis veniam.</p>
            </li>
            <li>
              <h3 className="font-semibold">Termination clause</h3>
              <p className="text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, quidem doloribus cumque vero, culpa voluptates dolorum reprehenderit nihil nisi odit necessitatibus voluptate voluptatibus magni ducimus sed accusamus illo nobis veniam.</p>
            </li>
            <li>
              <h3 className="font-semibold">Governing law</h3>
              <p className="text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, quidem doloribus cumque vero, culpa voluptates dolorum reprehenderit nihil nisi odit necessitatibus voluptate voluptatibus magni ducimus sed accusamus illo nobis veniam.</p>
            </li>
          </ol>
        </div>
        <div className="flex justify-between p-5 border-t">
          <button className="w-full py-2 mr-2 text-[#632bad] border border-[#632bad] rounded transition-all duration-300 hover:bg-[#632bad] hover:text-white">
            Decline
          </button>
          <button className="w-full py-2 ml-2 text-white bg-[#632bad] rounded transition-all duration-300 hover:bg-[#391766]">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
