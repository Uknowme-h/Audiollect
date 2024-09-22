import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="md:hidden p-4 text-white bg-gray-800 fixed top-0 right-0 z-20"
        onClick={toggleSidebar}
      >
        ☰
      </button>
      <div
        className={`w-64 h-full bg-gray-800 text-white fixed top-14 z-10 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4 text-2xl font-bold">Be My Eyes</div>
        <nav className="mt-10">
          <ul>
            <li className="p-4 hover:bg-gray-700">
              <Link to="/">Dashboard</Link>
            </li>
            <li className="p-4 hover:bg-gray-700">
              <Link to="/chat">Chat</Link>
            </li>
            <li className="p-4 hover:bg-gray-700">
              <Link to="/notes">Notes</Link>
            </li>
            <li className="p-4 hover:bg-gray-700">
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-0"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
