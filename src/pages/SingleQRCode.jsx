import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaDownload, FaLink } from 'react-icons/fa';
import { QRCodeCanvas } from 'qrcode.react';
import toast from 'react-hot-toast';
import PageWrapper from '../components/PageWrapper';

const SingleQRCode = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { link } = location.state || {};

  if (!link) {
    return (
      <PageWrapper>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-purple-100 text-center">
          <p className="text-purple-600 mb-6">No QR Code found</p>
          <button
            onClick={() => navigate("/analytics")}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-2 px-6 rounded-lg flex items-center mx-auto"
          >
            <FaArrowLeft className="mr-2" />
            Back to Analytics
          </button>
        </div>
      </div>
      </PageWrapper>
    );
  }

  const handleDownload = () => {
    toast.success('QR Code downloaded!');
  };

  return (
    <PageWrapper>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-purple-100">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            Your QR Code
          </h2>
          <p className="text-purple-500 mt-2">Scan to visit your link</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg border border-purple-200">
            <div className="flex justify-center mb-4">
              <QRCodeCanvas
                value={`${import.meta.env.VITE_BACKEND_URL}/${link.shortUrl}`}
                size={180}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
              />
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-purple-600 mb-1">Original URL</p>
                <p className="text-sm break-all font-semibold">{link.originalUrl}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-purple-600 mb-1">Short URL</p>
                <a 
                  href={`${import.meta.env.VITE_BACKEND_URL}/${link.shortUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-800 underline break-all text-sm"
                >
                  {`${import.meta.env.VITE_BACKEND_URL}/${link.shortUrl}`}
                </a>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              const canvas = document.querySelector('canvas');
              const pngUrl = canvas.toDataURL("image/png");
              const downloadLink = document.createElement("a");
              downloadLink.href = pngUrl;
              downloadLink.download = `${link.shortUrl}-qrcode.png`;
              document.body.appendChild(downloadLink);
              downloadLink.click();
              document.body.removeChild(downloadLink);
              handleDownload();
            }}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all flex items-center justify-center"
          >
            <FaDownload className="mr-2" />
            Download QR Code
          </button>

          <button
            onClick={() => navigate(-1)}
            className="w-full bg-white text-purple-600 border border-purple-200 hover:bg-purple-50 font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center"
          >
            <FaArrowLeft className="mr-2" />
            Back to Links
          </button>
        </div>
      </div>
    </div>
    </PageWrapper>
  );
};

export default SingleQRCode;