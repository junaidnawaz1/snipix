import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../axiosConfig";
import toast from "react-hot-toast";
import { FaBars, FaTimes, FaUser, FaUserPlus, FaChevronDown, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ username: '', email: '' });
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const checkAuth = async () => {
    try {
      const authRes = await axios.get("/api/auth/check");
      setIsLoggedIn(true);
      const userRes = await axios.get("/api/auth/profile");
      setUserData({
        username: userRes.data.username,
        email: userRes.data.email
      });
    } catch {
      setIsLoggedIn(false);
      setUserData({ username: '', email: '' });
    }
  };

  useEffect(() => {
    checkAuth();
  }, [location]);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      toast.success("Logged out successfully");
      setIsLoggedIn(false);
      setUserData({ username: '', email: '' });
      navigate("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="bg-gradient-to-r from-purple-400 via-blue-700 to-pink-400 text-white px-4 py-3 sticky top-0 z-50 shadow-lg">
      <div className="flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 p-1 rounded">
          <img
            src="/logo.png"
            alt="SnipiX Logo"
            className="h-16 w-auto object-contain"
          />
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-white text-2xl"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center space-x-2 hover:bg-purple-800 px-3 py-1 rounded"
              >
                <span>{userData.username || 'User'}</span>
                <FaChevronDown size={12} />
              </button>
              {isUserDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50 border border-gray-200"
                  onMouseLeave={() => setIsUserDropdownOpen(false)}
                >
                  <div className="p-4 border-b border-gray-200">
                    <p className="font-semibold text-gray-800">{userData.username}</p>
                    <p className="text-sm text-gray-600 truncate">{userData.email}</p>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded"
                    >
                      <FaSignOutAlt className="mr-2 text-red-500" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="flex items-center hover:text-gray-300 px-2 py-1 text-white">
                <FaUser className="mr-1" />
                <span>Login</span>
              </Link>
              <Link to="/register" className="bg-purple-800 hover:bg-purple-900 px-3 py-1 rounded flex items-center text-white">
                <FaUserPlus className="mr-1" />
                <span>Register</span>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-3 space-y-2 bg-purple-700 p-4 rounded-lg">
          {isLoggedIn ? (
            <>
              <p className="font-semibold">{userData.username}</p>
              <p className="text-sm text-gray-200">{userData.email}</p>
              <button
                onClick={handleLogout}
                className="flex items-center text-white hover:text-gray-300"
              >
                <FaSignOutAlt className="mr-2 text-red-300" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center text-white hover:text-gray-300">
                <FaUser className="mr-2" />
                Login
              </Link>
              <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center text-white hover:text-gray-300">
                <FaUserPlus className="mr-2" />
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
