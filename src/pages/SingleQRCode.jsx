import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect } from "react";

const SingleQRCode = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const link = location.state?.link;

  // Redirect to analytics if no link is passed
  useEffect(() => {
    if (!link) {
      navigate("/analytics");
    }
  }, [link, navigate]);

  if (!link) return null;

  // Always use your frontend domain for short link display
  const frontendBaseUrl = "https://www.snipix.tech";
  const shortLinkUrl = `${frontendBaseUrl}/${link.shortUrl}`;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center">
      <QRCodeCanvas
        value={shortLinkUrl}
        size={180}
        bgColor="#ffffff"
        fgColor="#000000"
        level="H"
      />
      <a
        href={shortLinkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-600 hover:text-purple-800 underline break-all text-sm mt-2"
      >
        {shortLinkUrl}
      </a>
      <p className="text-gray-600 text-xs mt-1 break-all">
        {link.originalUrl}
      </p>
    </div>
  );
};

export default SingleQRCode;
