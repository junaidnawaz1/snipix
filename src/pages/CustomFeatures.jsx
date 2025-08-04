// CustomFeatures.jsx
import React, { useState } from "react";
import axios from '../axiosConfig';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { QRCodeCanvas } from 'qrcode.react';
import { FaLink, FaCopy, FaQrcode, FaPenAlt, FaCalendarAlt } from "react-icons/fa";
import PageWrapper from "../components/PageWrapper";
import toast from "react-hot-toast";

const CustomFeatures = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [expiry, setExpiry] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleShorten = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("token");
      const res = await axios.post('/api/short', {
        originalUrl,
        customAlias: customAlias,
        expiry
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        setShortUrl(res.data.shortUrl);
        setError("");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error creating short URL");
      console.error("Error:", err);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Copied To Clipboard")
  };

  return (
    <PageWrapper>
      <div className="w-full px-4 sm:max-w-2xl sm:mx-auto mt-4 sm:mt-8 p-4 sm:p-8 rounded-2xl shadow-xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-purple-800 mb-2 flex items-center justify-center">
            <FaLink className="mr-3" /> Custom URL Shortener
          </h2>
          <p className="text-purple-600 text-sm sm:text-base">Create personalized links with advanced options</p>
        </div>
        
        <form onSubmit={handleShorten} className="space-y-4">
          <div>
            <label className="block text-purple-700 mb-2 text-sm sm:text-base">Long URL</label>
            <input
              type="url"
              placeholder="https://example.com/very-long-url"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              className="w-full p-3 text-sm sm:text-base border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              required
            />
          </div>
          
          <div>
            <label className="block text-purple-700 mb-2 text-sm sm:text-base">Custom Alias</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border-2 border-r-0 border-purple-200 bg-purple-100 text-purple-700 text-xs sm:text-sm truncate max-w-[90px]">
                snipix/
              </span>
              <input
                type="text"
                placeholder="my-custom-link"
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value)}
                className="flex-1 p-3 text-sm sm:text-base border-2 border-purple-200 rounded-r-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-purple-700 mb-2 text-sm sm:text-base">Expiration</label>
            <div className="relative">
              <select
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="w-full p-3 text-sm sm:text-base border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none transition-all pr-10"
              >
                <option value="">No expiration</option>
                <option value="1">1 day</option>
                <option value="7">7 days</option>
                <option value="30">30 days</option>
              </select>
              <FaCalendarAlt className="absolute right-3 top-4 text-purple-400 pointer-events-none" />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-bold shadow-lg transition-all transform hover:scale-[1.02] text-sm sm:text-base"
          >
            Create Custom URL
          </button>
        </form>

        {error && <p className="text-red-500 mt-4 text-center text-sm sm:text-base">{error}</p>}

        {shortUrl && (
          <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
            <div className="p-3 sm:p-4 bg-white rounded-xl border border-purple-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-purple-600 mb-1">Your Custom URL</p>
                  <a 
                    href={shortUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline break-all text-sm sm:text-base"
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

            <div className="p-4 sm:p-6 bg-white rounded-xl border border-purple-200 shadow-sm flex flex-col items-center">
              <div className="flex items-center mb-2 sm:mb-3">
                <FaQrcode className="text-purple-600 mr-2" />
                <p className="font-medium text-purple-700 text-sm sm:text-base">QR Code</p>
              </div>
              <QRCodeCanvas 
                value={shortUrl}
                size={140}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
                className="border-4 border-white rounded-lg"
              />
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-purple-500">Scan to visit the URL</p>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default CustomFeatures;
