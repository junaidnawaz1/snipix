const DataTable = ({ data, onDownloadQR }) => {
  return (
   <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left border border-gray-200">
        <thead className="bg-gray-100 text-gray-700 uppercase">
          <tr>
            <th className="px-4 py-2 border">Short URL</th>
            <th className="px-4 py-2 border">Clicks</th>
            <th className="px-4 py-2 border">Created</th>
            <th className="px-4 py-2 border">QR Code</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={item._id} className="hover:bg-gray-50 even:bg-gray-50">
              <td className="px-4 py-2 border text-blue-600 underline">
                <a href={`/${item.shortUrl}`} target="_blank" rel="noreferrer">
                  {item.shortUrl}
                </a>
              </td>
              <td className="px-4 py-2 border">{item.clicks}</td>
              <td className="px-4 py-2 border">{new Date(item.createdAt).toLocaleString()}</td>
              <td className="px-4 py-2 border space-x-2">
                {item.qrCode && (
                  <>
                    <button
                      onClick={() => onDownloadQR(item.qrCode, `${item.shortUrl}.png`)}
                      className="bg-blue-600 text-white px-2 py-1 rounded"
                    >
                      Download
                    </button>
                    <a href={item.qrCode} target="_blank" rel="noreferrer" className="bg-green-600 text-white px-2 py-1 rounded">
                      View
                    </a>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
