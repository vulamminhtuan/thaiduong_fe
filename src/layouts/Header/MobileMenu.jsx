import React from "react";
import { Link } from "react-router-dom";

const MobileMenu = ({ isMenuOpen, setIsMenuOpen }) => {
  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Our firm", href: "/about" },
    { name: "Products & Service", href: "/products" },
    { name: "News & Article", href: "/news" },
    { name: "Careers", href: "/careers" },
    { name: "Contact us", href: "/contact" },
  ];
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen); // Đóng menu sau khi chọn mục
  };

  return (
    <div className="lg:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            onClick={handleMenuClick}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#f99d20] hover:bg-gray-50"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
