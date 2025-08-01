import { Link, useLocation } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaHome,
  FaLink,
  FaQrcode,
  FaFileAlt,
  FaInfoCircle,
  FaMagic,
  FaEnvelope,
  FaChartBar,
} from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Sidebar */}
      <div
        className={`h-screen fixed top-0 mt-8 left-0 transition-all duration-300 z-40 
        ${isOpen ? "w-64" : "w-16"} hidden md:flex flex-col 
        bg-gradient-to-b from-blue-600 via-purple-700 to-pink-400`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-purple-400 h-16">
          {isOpen && <span className="font-bold text-lg text-white">Menu</span>}
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto p-2 mt-2 space-y-1">
          {/* Removed "Create new" link */}
          <NavLink to="/" icon={<FaHome />} text="Home" isOpen={isOpen} />
          <NavLink to="/analytics" icon={<FaChartBar />} text="Analytics" isOpen={isOpen} />
          <NavLink to="/myqrcodes" icon={<FaQrcode />} text="QR Codes" isOpen={isOpen} />
          <NavLink to="/custom-features" icon={<FaMagic />} text="Custom Features" isOpen={isOpen} />
          <NavLink to="/feedback" icon={<FaFileAlt />} text="Feedback" isOpen={isOpen} />
          <NavLink to="/about-us" icon={<FaInfoCircle />} text="About Us" isOpen={isOpen} />
        </div>
      </div>

      {/* Floating Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="hidden md:flex items-center justify-center fixed z-50 
                 top-[40%] transition-all duration-300 
                 w-10 h-10 rounded-full bg-white shadow-md border border-gray-300 
                 hover:scale-105
                 left-[calc(100%+0.5rem)]"
        style={{
          transform: 'translateY(-50%)',
          left: isOpen ? '16rem' : '4rem'
        }}
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isOpen ? (
          <FaChevronLeft className="text-black" size={14} />
        ) : (
          <FaChevronRight className="text-black" size={14} />
        )}
      </button>
    </>
  );
};

// NavLink helper
const NavLink = ({ to, icon, text, isOpen }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`flex items-center p-3 rounded-lg transition-colors
        ${isOpen ? "justify-start px-4" : "justify-center"}
        ${isActive ? "bg-purple-800" : "hover:bg-purple-700"}`}
    >
      <span className={`${isOpen ? "mr-3" : ""} flex-shrink-0 text-white`}>
        {icon}
      </span>
      {isOpen && <span className="truncate text-white">{text}</span>}
    </Link>
  );
};

export default Sidebar;