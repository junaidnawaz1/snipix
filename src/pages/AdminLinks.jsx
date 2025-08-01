import { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import toast from "react-hot-toast";

// No change in imports
const AdminLinks = () => {
  const [links, setLinks] = useState([]);
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

  const fetchLinks = async () => {
    try {
      const res = await axios.get("/api/admin/links");
      if (Array.isArray(res.data)) {
        setLinks(res.data);
      } else {
        setLinks([]);
        toast.error("Invalid links data received");
      }
    } catch {
      toast.error("Failed to fetch links");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/admin/link/${id}`);
      fetchLinks();
    } catch {
      toast.error("Failed to delete link");
    }
  };

  const filteredLinks = links.filter(
    (link) =>
      link.userId?.username?.toLowerCase().includes(search.toLowerCase()) ||
      link.userId?._id?.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    checkAdmin();
    fetchLinks();
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">All Shortened Links</h2>
        <input
          type="text"
          placeholder="Filter by username or user ID"
          className="border p-2 w-full mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Original URL</th>
              <th className="border px-4 py-2">Short URL</th>
              <th className="border px-4 py-2">Clicks</th>
              <th className="border px-4 py-2">User</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLinks.length > 0 ? (
              filteredLinks.map((link) => (
                <tr key={link._id}>
                  <td className="border px-4 py-2">{link.originalUrl}</td>
                  <td className="border px-4 py-2">{link.shortUrl}</td>
                  <td className="border px-4 py-2">{link.clicks}</td>
                  <td className="border px-4 py-2">{link.userId?.username || link.userId?._id || "Unknown"}</td>
                  <td className="border px-4 py-2">
                    <button onClick={() => handleDelete(link._id)} className="bg-red-600 text-white px-2 py-1">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border px-4 py-2 text-center" colSpan="5">No Links Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminLinks;
