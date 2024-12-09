import React, { useState, useEffect, useRef } from "react";
import { FaEllipsisV, FaTimes, FaSignOutAlt, FaCog } from "react-icons/fa"; // Import logout icon
import { useAuth } from "../Context.jsx/AuthContext";

function Navbar({ onToggleSidebar, onLogoutModal }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to track sidebar status
  const dropdownRef = useRef(null); // Reference for dropdown menu
  const userRef = useRef(null); // Reference for the user (image and name)
  const { singaleEmployee } = useAuth();

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
    onToggleSidebar(); // Notify parent about sidebar status
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        userRef.current &&
        !userRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white text-black p-4 flex justify-between items-center shadow-md rounded-t-xl lg:rounded-t-3xl">
      {/* Left side: Toggle Button and Logo */}
      <div className="flex items-center">
        {/* Toggle button for mobile screens */}
        <button className="md:hidden p-2" onClick={toggleSidebar}>
          {!isSidebarOpen ? (
            <span className="text-2xl">☰</span> // Hamburger icon
          ) : (
            <span className="text-2xl font-bold">×</span> // Close icon
          )}
        </button>

        {/* Logo */}
        <img
          src="https://i.imgur.com/f1OH7Ef.png"
          alt="Logo"
          className="h-10 w-40 mr-3"
        />
      </div>

      {/* Right side: Image, Name, and Dropdown */}
      <div className="flex items-center space-x-3" ref={userRef}>
        <img
          src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
          alt="User"
          className="h-10 w-10 rounded-full cursor-pointer"
          onClick={toggleDropdown}
        />
        <span
          className="text-lg cursor-pointer capitalize"
          onClick={toggleDropdown}
        >
          {singaleEmployee?.name || "User"}
        </span>

        {/* Dropdown for user details and actions */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="text-lg focus:outline-none"
          >
            <FaEllipsisV className="hidden md:block" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-5 w-64 bg-white text-black rounded shadow-lg p-4">
              {/* Close Icon */}
              <button
                className="absolute top-2 right-2 text-black hover:bg-red-600 rounded-md p-1 hover:text-white"
                onClick={() => setIsDropdownOpen(false)}
              >
                <FaTimes size={18} />
              </button>

              {/* User Information */}
              <div className="flex items-center mb-4">
                <img
                  src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
                  alt="User"
                  className="h-12 w-12 rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold capitalize">
                    {singaleEmployee?.name || "User"}
                  </p>
                  <p className="text-sm text-gray-500 capitalize">
                    {singaleEmployee?.jobRole || "Role"}
                  </p>
                </div>
              </div>

              {/* Action Links */}
              <div>
                <button
                  className="block w-full px-4 py-2 text-left text-gray-700 text-lg hover:bg-gray-200 rounded"
                  onClick={() => alert("Go to Settings")}
                >
                  <FaCog className="mr-2 inline" /> Settings
                </button>
                <button
                  onClick={onLogoutModal}
                  className="block w-full px-4 py-2 text-left text-red-500 text-lg hover:bg-gray-200 rounded mt-2"
                >
                  <FaSignOutAlt className="mr-2 inline" /> Logout{" "}
                  {/* Logout Icon */}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
