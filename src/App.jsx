import { BrowserRouter, Routes, Route } from "react-router-dom";
import LinkShortner from "./pages/LinkShortner";
import Analytics from "./pages/Analytics";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import AdminLinks from "./pages/AdminLinks";
import AdminUsers from "./pages/AdminUser";
import MyQRCodes from "./pages/MyQRCodes";
import CustomFeatures from "./pages/CustomFeatures";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import SingleQRCode from "./pages/SingleQRCode";
import Feedback from "./pages/Feedback";
import AboutUs from "./pages/AboutUs";
import HireMe from "./pages/HireME";
import { AuthProvider } from "./components/AuthContext";

import toast, { Toaster } from "react-hot-toast";
import AuthProtectedRoute from "./components/AuthProtectedRoute";
toast
function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LinkShortner />} />
        <Route path="/analytics"  element={
    <AuthProtectedRoute>
      <Analytics />
    </AuthProtectedRoute>
  }/>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
  path="/admin/users"
  element={
    <AdminProtectedRoute>
      <AdminUsers />
    </AdminProtectedRoute>
  }
/>
      <Route
  path="/admin/links"
  element={
    <AdminProtectedRoute>
      <AdminLinks />
    </AdminProtectedRoute>
  }
/>
        
<Route path="/myqrcodes"  element={
    <AuthProtectedRoute>
      <MyQRCodes />
    </AuthProtectedRoute>
  } />
<Route path="/custom-features"  element={
    <AuthProtectedRoute>
      <CustomFeatures />
    </AuthProtectedRoute>
  } />
<Route path="/singleqrcode" element={<SingleQRCode />} />
<Route
  path="/feedback"
  element={
    <AuthProtectedRoute>
      <Feedback />
    </AuthProtectedRoute>
  }
/>

<Route
  path="/about-us"
  element={
    <AuthProtectedRoute>
      <AboutUs />
    </AuthProtectedRoute>
  }
/>
<Route
  path="/hire-me"
  element={
    <AuthProtectedRoute>
      <HireMe />
    </AuthProtectedRoute>
  }
/>




      </Routes>
    
      <Toaster position="top-right" reverseOrder={false} />
    </BrowserRouter>
     </AuthProvider>
  );
}

export default App;
