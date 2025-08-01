import { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import toast from "react-hot-toast";

// No change in imports
const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const checkAdmin = async () => {
    try {
      await axios.get("/api/auth/admin-check");
    } catch {
      toast.error("Unauthorized! Admin only.");
      navigate("/login");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/admin/users");
      if (!Array.isArray(res.data)) {
        toast.error("Invalid users data received");
        return;
      }
      setUsers(res.data);
    } catch {
      toast.error("Failed to fetch users");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/admin/user/${id}`);
      fetchUsers();
    } catch {
      toast.error("Failed to delete user");
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    checkAdmin();
    fetchUsers();
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">All Users</h2>
        <input
          type="text"
          placeholder="Search by username or email"
          className="border p-2 w-full mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Is Admin</th>
              <th className="border px-4 py-2">Plan</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((u) => (
                <tr key={u._id}>
                  <td className="border px-4 py-2">{u.username}</td>
                  <td className="border px-4 py-2">{u.email}</td>
                  <td className="border px-4 py-2">{u.isAdmin ? "Yes" : "No"}</td>
                  <td className="border px-4 py-2">{u.plan}</td>
                  <td className="border px-4 py-2">
                    <button onClick={() => handleDelete(u._id)} className="bg-red-600 text-white px-2 py-1">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border px-4 py-2 text-center" colSpan="5">No Users Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminUsers;
