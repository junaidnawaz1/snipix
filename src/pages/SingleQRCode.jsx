import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const SingleQRCode = ({ link }) => {
  // Use your new frontend domain
  const frontendBaseUrl = "https://www.snipix.tech";

  // Prevent crash if link is undefined or missing shortUrl
  if (!link || !link.shortUrl) {
    return null; // or return a loading/placeholder UI
  }

  const shortLinkUrl = `${frontendBaseUrl}/${link.shortUrl}`;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center">
      {/* QR Code */}
      <QRCodeCanvas
        value={shortLinkUrl}
        size={180}
        bgColor="#ffffff"
        fgColor="#000000"
        level="H"
      />

      {/* Short URL */}
      <a
        href={shortLinkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-600 hover:text-purple-800 underline break-all text-sm mt-2"
      >
        {shortLinkUrl}
      </a>

      {/* Original URL */}
      <p className="text-gray-600 text-xs mt-1 break-all">
        {link.originalUrl}
      </p>
    </div>
  );
};

export default SingleQRCode;
