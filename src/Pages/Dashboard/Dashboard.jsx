import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import DashboardContent from "../../Components/DashboardContent/DashboardContent";
import { FaBars } from "react-icons/fa";
import { useAuth } from "../../Components/Context.jsx/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState("Dashboard");
  const [isOpen, setIsOpen] = useState(false); // Sidebar starts closed
  const [showModal, setShowModal] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev); // Toggle sidebar open/close

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 bottom-0 h-full bg-white text-black shadow-lg transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static z-50 w-64`}
      >
        <Sidebar
          active={active}
          setActive={setActive}
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
          setShowModal={setShowModal}
        />
      </div>

      {/* Overlay for Sidebar (Mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar} // Close sidebar when clicking overlay
        ></div>
      )}

      {/* Main Content Area */}
      <div className="flex-1">
        {/* Top Navbar */}
        <nav className="sticky top-0 bg-white text-black py-2 px-4 flex items-center justify-between shadow-md z-50">
          <div className="flex items-center gap-2">
            {/* Company Logo */}
            <img
              src="https://i.imgur.com/pbSEyLX.jpeg"
              alt="Company Logo"
              className="w-44 h-16 rounded"
            />
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-red-500 hover:bg-red-600 text-white py-3 px-8 rounded"
          >
            Logout
          </button>
        </nav>

        {/* Mobile Navbar */}
        <div className="bg-white text-black flex items-center justify-between px-4 py-2 md:hidden sticky top-8 w-full shadow-md z-40">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold">Admin Panel</h1>{" "}
            {/* Left side content */}
          </div>
          <div className="flex items-center gap-2">
            {/* Right side: toggle button or additional content */}
            <button onClick={toggleSidebar} className="text-2xl">
              <FaBars />
            </button>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="pt-5 md:pl-4 min-lg:p-4">
          <DashboardContent active={active} />
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)} // Close the modal
                className="px-10 py-2 bg-white text-gray-800 border-2 border-red-600 shadow-md text-2xl rounded-xl  hover:bg-red-600"
              >
                NO
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  handleLogout();
                }}
                className="px-10 py-2 bg-white border-2 text-gray-800 border-green-600 shadow-md text-2xl rounded-xl hover:bg-green-600"
              >
                YES
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
