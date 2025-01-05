import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  const {t} = useTranslation();  
  

  const menuItems = [
    { name: t("list menu.1"), href: "/" },
    { name: t("list menu.2"), href: "/about" },
    { name: t("list menu.3"), href: "/products" },
    { name: t("list menu.4"), href: "/resources" },
    { name: t("list menu.5"), href: "/careers" },
    { name: t("list menu.6"), href: "/contact" },
  ];

  const getLinkClass = (href) => {
    return location.pathname === href
      ? 'text-white bg-[#f99d20]'
      : 'text-gray-600 hover:text-white hover:bg-[#f99d20]';
  };

  return (
    <nav className="hidden lg:flex space-x-3 ">
      {menuItems.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={`px-2 py-1 rounded-md text-base font-medium transition-colors ${getLinkClass(item.href)}`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
