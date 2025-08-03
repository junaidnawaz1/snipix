import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer 
} from 'recharts';
import { FaLink, FaQrcode, FaTrash, FaChartBar, FaChartLine, FaChartPie } from 'react-icons/fa';
import toast from 'react-hot-toast';
import PageWrapper from '../components/PageWrapper';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Analytics = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [linkToDelete, setLinkToDelete] = useState(null);
  const navigate = useNavigate();
  const FRONTEND_URL = "https://snipix-app.vercel.app";

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/analytics/all`, {
          credentials: 'include',
        });

        const data = await res.json();
        if (res.ok) {
          setLinks(data);
          toast.success('Analytics loaded successfully');
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error('Failed to fetch analytics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  const handleDeleteClick = (id) => {
    setLinkToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!linkToDelete) return;
    
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/short/${linkToDelete}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await res.json();
      if (res.ok) {
        setLinks((prev) => prev.filter((l) => l._id !== linkToDelete));
        toast.success('Link deleted successfully');
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error('Failed to delete link');
      console.error(err);
    } finally {
      setShowDeleteModal(false);
      setLinkToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setLinkToDelete(null);
  };

  // Prepare data for charts
  const topLinks = [...links]
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 5)
    .map(link => ({
      name: link.shortUrl,
      clicks: link.clicks,
      originalUrl: link.originalUrl
    }));

  const lineChartData = links.map(link => ({
    date: new Date(link.createdAt).toLocaleDateString(),
    clicks: link.clicks,
    name: link.shortUrl
  }));

  if (loading) {
    return (
      <PageWrapper>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          <div className="text-center p-8 bg-white rounded-xl shadow-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-purple-800">Loading your analytics data...</p>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-purple-800 mb-2 flex items-center justify-center">
              <FaChartBar className="mr-3" /> Link Analytics Dashboard
            </h1>
            <p className="text-lg text-purple-600">Track and analyze your shortened links</p>
          </div>

          {/* If no links, show only friendly message */}
          {links.length === 0 ? (
            <div className="bg-white p-8 rounded-xl shadow text-center">
              <p className="text-purple-600 mb-4">
                You haven't created any shortened links yet.
              </p>
              <button
                onClick={() => navigate('/custom-features')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-bold shadow-lg transition-all transform hover:scale-[1.02]"
              >
                Create Your First Short Link
              </button>
            </div>
          ) : (
            <>
              {/* Charts Section */}
              <div className="space-y-6">
                {/* Top Row - Bar and Line Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Bar Chart */}
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-100">
                    <div className="flex items-center mb-4">
                      <FaChartBar className="text-purple-600 mr-2" />
                      <h3 className="text-xl font-semibold text-purple-800">Top Links by Clicks</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={topLinks}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="clicks" fill="#8884d8" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Line Chart */}
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-100">
                    <div className="flex items-center mb-4">
                      <FaChartLine className="text-purple-600 mr-2" />
                      <h3 className="text-xl font-semibold text-purple-800">Clicks Over Time</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={lineChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="clicks" stroke="#82ca9d" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Pie Chart - Bottom Row */}
                <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-100">
                  <div className="flex items-center mb-4">
                    <FaChartPie className="text-purple-600 mr-2" />
                    <h3 className="text-xl font-semibold text-purple-800">Top 5 Links Distribution</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <Pie
                        data={topLinks}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="clicks"
                        nameKey="name"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {topLinks.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Links List Section */}
              <div className="space-y-6 mt-12">
                <h2 className="text-2xl font-bold text-purple-800 mb-6 flex items-center">
                  <FaLink className="mr-3" /> Your Shortened Links
                </h2>
                
                {links.map((link) => (
                  <div key={link._id} className="bg-white p-6 rounded-xl shadow-lg border border-purple-100">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-purple-600 mb-1">Original URL</p>
                        <p className='break-all text-sm font-semibold'>
                          {link.originalUrl.length > 50 
                            ? `${link.originalUrl.slice(0, 40)}` 
                            : link.originalUrl}
                          .......
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-purple-600 mb-1">Short URL</p>
                        <a 
                          href={`${FRONTEND_URL}/${link.shortUrl}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-800 underline break-all text-sm"
                        >
                          {`${FRONTEND_URL}/${link.shortUrl}`}
                        </a>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-purple-600 mb-1">Created At</p>
                        <p className="text-gray-800">
                          {new Date(link.createdAt).toLocaleString()}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-purple-600 mb-1">Total Clicks</p>
                        <p className="text-2xl font-bold text-purple-700">{link.clicks}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                      <button 
                        onClick={() => navigate('/singleqrcode', { state: { link } })}
                        className="flex items-center bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-lg transition-colors"
                      >
                        <FaQrcode className="mr-2" /> View QR Code
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(link._id)}
                        className="flex items-center bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg transition-colors"
                      >
                        <FaTrash className="mr-2" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-xl shadow-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-purple-800 mb-4">Confirm Deletion</h3>
            <p className="text-gray-700 mb-6">Are you sure you want to delete this link? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 rounded-lg border border-purple-300 text-purple-700 hover:bg-purple-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
};

export default Analytics;
