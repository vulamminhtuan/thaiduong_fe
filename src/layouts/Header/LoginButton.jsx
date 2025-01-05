import React, { useContext, useState, useRef, useEffect }  from 'react';
import { Link } from 'react-router-dom';
import { User, ChevronDown } from 'lucide-react';
import { AuthContext } from "../../components/AuthContext";
import { useTranslation } from 'react-i18next';

const LoginButton = () => {
  const { auth, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const {t} = useTranslation();  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!auth.jwt) {
    return (
      <Link to="/login">
        <button className="flex items-center space-x-2 text-white bg-[#f99d20] hover:bg-[#f98220] px-3 py-1 rounded-lg transition-colors text-sm">
          <User className="h-4 w-4" />
          <span>{t('login')}</span>
        </button>
      </Link>
    );
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center space-x-1 text-white bg-[#f99d20] hover:bg-[#f98220] px-3 py-1 rounded-lg transition-colors text-sm"
      >
        <User className="h-4 w-4" />
        <span>{auth.user?.name || "User"}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {dropdownOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginButton;