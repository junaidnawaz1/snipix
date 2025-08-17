import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast"; // Import react-hot-toast

const AuthProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const { setIsLoggedIn } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("/api/auth/check");
        setIsLoggedIn(true);
        setChecking(false);
      } catch (err) {
        setIsLoggedIn(false);
        toast.error("Please login to access this page"); // Show error toast
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate, setIsLoggedIn]);

  if (checking) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return children;
};

export default AuthProtectedRoute;
