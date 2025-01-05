import React, { useContext } from "react";
import { AuthContext } from "../../components/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function AdminHeader() {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200">
      <h1 className="font-bold text-lg">Admin Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-600 flex items-center gap-1">
          <FaUserCircle />
          {auth?.user?.name || "Admin"}
        </span>
        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;
