import { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import toast from 'react-hot-toast';
import PageWrapper from '../components/PageWrapper';
import { FaQrcode, FaDownload, FaLink, FaArrowRight } from "react-icons/fa";

const MyQRCodes = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await axios.get("/analytics/all");
        setLinks(res.data);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to fetch QR codes");
        if (err.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchLinks();
  }, [navigate]);

  const downloadQRCode = (id) => {
    const canvas = document.getElementById(`qr-${id}`);
    if (!canvas) return toast.error('QR code not found');
    const pngUrl = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `${id}-qrcode.png`;
    downloadLink.click();
    toast.success('QR code downloaded!');
  };

  if (loading) {
    return (
      <PageWrapper>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          <div className="text-center p-8 bg-white rounded-xl shadow-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-purple-800">Loading your QR codes...</p>
          </div>
        </div>
      </PageWrapper>
    );
  }

  if (links.length === 0) {
    return (
      <PageWrapper>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md w-full">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaQrcode className="text-3xl text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-purple-800 mb-2">No QR Codes Yet</h2>
            <p className="text-purple-600 mb-6">You haven't created any QR Codes yet.</p>
            <button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-bold shadow-lg transition-all transform hover:scale-[1.02] flex items-center mx-auto"
            >
              Create Short Link
              <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-purple-800 mb-2 flex items-center justify-center">
              <FaQrcode className="mr-3" /> My QR Codes
            </h1>
            <p className="text-lg text-purple-600">All your generated QR codes in one place</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {links.map((link) => (
              <div key={link._id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-purple-100">
                <div className="p-6">
                  <div className="mb-4">
                    <p className="text-sm font-medium text-purple-600 mb-1">Original URL</p>
                                       <p className='break-all text-sm font-semibold'>
  {link.originalUrl.length > 50 
    ? `${link.originalUrl.slice(0, 40)}` 
    : link.originalUrl}
    .......
</p>   

                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-purple-600 mb-1">Short URL</p>
                    <a 
                      href={`${window.location.origin}/${link.shortUrl}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-800 underline break-all text-sm"
                    >
                      {`${window.location.origin}/${link.shortUrl}`}
                    </a>
                  </div>

                  <div className="flex flex-col items-center my-4">
                    <div className="p-2 bg-white border-4 border-white rounded-lg shadow-sm">
                      <QRCodeCanvas
                        id={`qr-${link._id}`}
                        value={`${window.location.origin}/${link.shortUrl}`}
                        size={160}
                        bgColor="#ffffff"
                        fgColor="#000000"
                        level="H"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => downloadQRCode(link._id)}
                    className="w-full bg-gradient-to-r from-purple-100 to-blue-100 hover:from-purple-200 hover:to-blue-200 text-purple-800 px-4 py-3 rounded-lg font-medium flex items-center justify-center transition-all"
                  >
                    <FaDownload className="mr-2" />
                    Download QR Code
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default MyQRCodes;