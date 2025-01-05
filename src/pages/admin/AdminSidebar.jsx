import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MdDashboard,
  MdShoppingCart,
  MdPeople,
  MdList,
  MdHome,
  MdExpandLess, 
  MdExpandMore, 
  MdBusiness
} from "react-icons/md";

function AdminSidebar() {
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const [isOurFirmMenuOpen, setIsOurFirmMenuOpen] = useState(false);


  const toggleProductMenu = () => {
    setIsProductMenuOpen(!isProductMenuOpen);
  };
  const toggleOurFirmMenu = () => {
    setIsOurFirmMenuOpen(!isOurFirmMenuOpen);
  };
  return (
    <aside className="bg-gray-900 text-white w-64 h-screen flex flex-col">
      <div className="py-4 px-6 font-bold text-xl border-b border-gray-700">
        ThaiDuongCapital
      </div>

      <nav className="flex-1 px-2 py-4 overflow-y-auto">
        <ul className="space-y-2">
          {/* Vd: Trang tổng quan */}
          <li>
            <Link
              to="/admin"
              className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-800"
            >
              <MdDashboard />
              <span>Dashboard</span>
            </Link>
          </li>

          {/* Nhóm menu E-commerce */}
          <li className="text-gray-400 mt-4 mb-1 text-sm uppercase tracking-widest">
            E-commerce
          </li>
          <li>
            <Link
              to="/admin/news"
              className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-800"
            >
              <MdList />
              <span>Quản lý Tin tức</span>
            </Link>
          </li>
          <li>
            <div
              className="flex items-center justify-between px-2 py-2 rounded cursor-pointer hover:bg-gray-800"
              onClick={toggleProductMenu}
            >
              <div className="flex items-center gap-2">
                <MdShoppingCart />
                <span>Quản lý Sản phẩm</span>
              </div>
              {isProductMenuOpen ? <MdExpandLess /> : <MdExpandMore />}
            </div>
            {/* Menu con */}
            {isProductMenuOpen && (
              <ul className="pl-6 mt-2 space-y-2">
                <li>
                  <Link
                    to="/admin/products/fund-management"
                    className="block px-2 py-1 text-sm rounded hover:bg-gray-800"
                  >
                    Fund Management
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/products/investment-managed"
                    className="block px-2 py-1 text-sm rounded hover:bg-gray-800"
                  >
                    Investment Managed Account
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/products/investment-strategy"
                    className="block px-2 py-1 text-sm rounded hover:bg-gray-800"
                  >
                    Investment Strategy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/products/incidental-investment"
                    className="block px-2 py-1 text-sm rounded hover:bg-gray-800"
                  >
                    Incidental Investment Services
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link
              to="/admin/jobs"
              className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-800"
            >
              <MdPeople />
              <span>Quản lý Tuyển dụng</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/applications"
              className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-800"
            >
              <MdList />
              <span>Quản lý Ứng tuyển</span>
            </Link>
          </li>
        
          {/* Quản lý Our Firm - submenu */}
          <li>
            <div
              className="flex items-center justify-between px-2 py-2 rounded cursor-pointer hover:bg-gray-800"
              onClick={toggleOurFirmMenu}
            >
              <div className="flex items-center gap-2">
                <MdBusiness />
                <span>Quản lý Our Firm</span>
              </div>
              {isOurFirmMenuOpen ? <MdExpandLess /> : <MdExpandMore />}
            </div>
            {isOurFirmMenuOpen && (
              <ul className="pl-6 mt-2 space-y-2">
                <li>
                  <Link
                    to="/admin/our-firm/overviews"
                    className="block px-2 py-1 text-sm rounded hover:bg-gray-800"
                  >
                    Overviews
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/our-firm/business-principles"
                    className="block px-2 py-1 text-sm rounded hover:bg-gray-800"
                  >
                    Business Principles
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/our-firm/persons"
                    className="block px-2 py-1 text-sm rounded hover:bg-gray-800"
                  >
                    Persons
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/our-firm/investor-relations"
                    className="block px-2 py-1 text-sm rounded hover:bg-gray-800"
                  >
                    Investor Relations
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link
              to="/admin/contacts"
              className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-800"
            >
              <MdHome />
              <span>Quản lý Liên hệ</span>
            </Link>

          </li>

        </ul>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
