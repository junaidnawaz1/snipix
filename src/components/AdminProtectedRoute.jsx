import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "../axiosConfig";

const AdminProtectedRoute = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axios.get("/api/auth/check");
        if (res.data.isAdmin) {
          setIsAdmin(true);
        }
      } catch {}
      setChecking(false);
    };
    checkAdmin();
  }, []);

  if (checking) return <p className="text-center p-4">Checking Admin...</p>;

  return isAdmin ? children : <Navigate to="/" />;
};

export default AdminProtectedRoute;
