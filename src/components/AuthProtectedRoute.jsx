import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import { useAuth } from "./AuthContext";// Add this import

const AuthProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const { setIsLoggedIn } = useAuth(); // Get setter from context

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("/api/auth/check");
        setIsLoggedIn(true);
        setChecking(false);
      } catch (err) {
        setIsLoggedIn(false);
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate, setIsLoggedIn]);

  if (checking) return <div className="text-center p-4">Loading...</div>;

  return children;
};

export default AuthProtectedRoute;