// LinkShortner.jsx
import React, { useState } from "react";
import axios from '../axiosConfig';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { QRCodeCanvas } from 'qrcode.react';
import { FaLink, FaCopy, FaQrcode } from "react-icons/fa";
import PageWrapper from "../components/PageWrapper";
import OurServices from"../components/OurServices"
import Plans from "../components/Plans"
import toast from "react-hot-toast";

const LinkShortner = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleShorten = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("token");
      const res = await axios.post('/api/short', { originalUrl }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        setShortUrl(res.data.shortUrl);
        setError("");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error shortening URL");
      console.error("Error:", err);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Copyied To ClipBoard")
  };

  return (
    <PageWrapper>
    <div className="max-w-2xl mx-auto mt-8 p-8 rounded-2xl shadow-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-purple-800 mb-2 flex items-center justify-center">
          <FaLink className="mr-3" /> URL Shortener
        </h2>
        <p className="text-purple-600">Create short, memorable links instantly</p>
      </div>
      
      <form onSubmit={handleShorten} className="space-y-4">
        <div>
          <label className="block text-purple-700 mb-2">Enter your long URL</label>
          <input
            type="url"
            placeholder="https://example.com/very-long-url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            className="w-full p-3 border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
            required
          />
        </div>
        
        <button 
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-bold shadow-lg transition-all transform hover:scale-[1.02]"
        >
          Shorten URL
        </button>
      </form>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {shortUrl && (
        <div className="mt-8 space-y-6">
          <div className="p-4 bg-white rounded-xl border border-purple-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 mb-1">Your Short URL</p>
                <a 
                  href={shortUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline break-all"
                >
                  {shortUrl}
                </a>
              </div>
              <button 
                onClick={handleCopy}
                className="ml-4 p-2 bg-purple-100 hover:bg-purple-200 rounded-full text-purple-700 transition-colors"
                title="Copy to clipboard"
              >
                <FaCopy />
              </button>
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl border border-purple-200 shadow-sm flex flex-col items-center">
            <div className="flex items-center mb-3">
              <FaQrcode className="text-purple-600 mr-2" />
              <p className="font-medium text-purple-700">QR Code</p>
            </div>
            <QRCodeCanvas 
              value={shortUrl}
              size={160}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
              className="border-4 border-white rounded-lg"
            />
            <p className="mt-3 text-sm text-purple-500">Scan to visit the URL</p>
          </div>
        </div>
      )}
    </div>
    <OurServices/>
    <Plans/>
    </PageWrapper>
  );
};

export default LinkShortner;
