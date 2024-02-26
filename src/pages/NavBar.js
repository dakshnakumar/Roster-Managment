import React from 'react';

const NavBar = ({ tableName }) => { // Add tableName as a prop
  return (
    <nav className="flex items-center justify-between bg-white p-4 border-b-2 border-gray-200">
      <button className="border rounded-full py-1 px-3 border-gray-300 text-gray-700">Back</button>
      <h6 className=" font-bold px-3 justify-center text-gray-900 md:text-3xl lg:text-3xl dark:text-black  mr-4" >{tableName}</h6> 
      <div>
        <button className="border transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-white duration-300 rounded-full py-1 px-3 border-gray-300 text-gray-700 mr-2">Share</button>
        <button className="border transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-black duration-300 rounded-full py-1 px-3 bg-black border-black text-white">Publish</button>
      </div>
    </nav>
  );
};

export default NavBar;
