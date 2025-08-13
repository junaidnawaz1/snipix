import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { useRef, useEffect } from "react";

const SingleQRCode = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const qrRef = useRef();
  const link = location.state?.link;

  // Redirect if no link is passed
  useEffect(() => {
    if (!link) {
      navigate("/analytics");
    }
  }, [link, navigate]);

  if (!link) return null;

  // Always use your frontend domain for short link display
  const frontendBaseUrl = "https://www.snipix.tech";
  const shortLinkUrl = `${frontendBaseUrl}/${link.shortUrl}`;

  // Download QR as PNG
  const downloadQRCode = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `qrcode-${link.shortUrl}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md text-center">
      <div ref={qrRef} className="flex justify-center mb-4">
        <QRCodeCanvas
          value={shortLinkUrl}
          size={200}
          bgColor="#ffffff"
          fgColor="#000000"
          level="H"
        />
      </div>

      <a
        href={shortLinkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-600 hover:text-purple-800 underline break-all block mb-2"
      >
        {shortLinkUrl}
      </a>

      <p className="text-gray-600 text-sm mb-4 break-all">{link.originalUrl}</p>

      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <button
          onClick={downloadQRCode}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Download QR Code
        </button>
        <button
          onClick={() => navigate("/analytics")}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
        >
          Back to Analytics
        </button>
      </div>
    </div>
  );
};

export default SingleQRCode;
