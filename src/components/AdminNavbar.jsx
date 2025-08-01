import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav className="bg-gray-800 p-4 flex gap-4 text-white">
      <Link to="/admin/users" className="hover:underline">
        All Users
      </Link>
      <Link to="/admin/links" className="hover:underline">
        All Links
      </Link>
     
    </nav>
  );
};

export default AdminNavbar;
