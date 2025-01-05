import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import Logoimage from "../../assets/images/logo.jpg";
import { Link } from "react-router-dom";

const MainHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 40) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`bg-white shadow-md overflow-hidden ${isFixed ? 'fixed top-0 left-0 w-full z-50 bg-gray-800 shadow-md animate-slideDown' : 'bg-gray-800'}`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center py-1">
          {/* Logo */}
          <div className={`flex-shrink-0 flex items-center`}>
            <Link to={''}>
              <img src={Logoimage} alt="logo" className="lg:h-[70px] md:h-16 h-8"/>
              <span className="hidden ml-2 text-xl font-bold text-gray-800">
                Thái Dương Capital
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <Navigation />

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-blue-600"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />}
    </div>
  );
};

export default MainHeader;
