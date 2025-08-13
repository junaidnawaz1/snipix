import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const SingleQRCode = ({ link }) => {
  // Your main frontend domain for short links
  const frontendBaseUrl = "https://snipix.tech";

  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center">
      {/* QR Code */}
      <QRCodeCanvas
        value={`${frontendBaseUrl}/${link.shortUrl}`}
        size={180}
        bgColor="#ffffff"
        fgColor="#000000"
        level="H"
      />

      {/* Short URL */}
      <a
        href={`${frontendBaseUrl}/${link.shortUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-600 hover:text-purple-800 underline break-all text-sm mt-2"
      >
        {`${frontendBaseUrl}/${link.shortUrl}`}
      </a>

      {/* Original URL */}
      <p className="text-gray-600 text-xs mt-1 break-all">
        {link.originalUrl}
      </p>
    </div>
  );
};

export default SingleQRCode;
