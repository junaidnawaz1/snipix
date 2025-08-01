import { 
  FaLink, 
  FaQrcode, 
  FaChartLine, 
  FaPenAlt, 
  FaClock, 
  FaStar 
} from "react-icons/fa";
import { Link } from "react-router-dom";

const OurServices = () => {
  const services = [
    {
      title: "URL Shortening",
      description: "Transform long, complex URLs into short, memorable links with our powerful shortening technology.",
      icon: <FaLink className="text-3xl" />,
      path: "/custom-features"
    },
    {
      title: "QR Code Generation",
      description: "Automatically generate QR codes for every shortened link to bridge the physical-digital gap.",
      icon: <FaQrcode className="text-3xl" />,
      path: "/myqrcodes"
    },
    {
      title: "Advanced Analytics",
      description: "Gain insights with detailed click tracking, geographic data, and referral sources.",
      icon: <FaChartLine className="text-3xl" />,
      path: "/analytics"
    },
    {
      title: "Custom Alias",
      description: "Use your own Link name for shortened links to maintain consistency.",
      icon: <FaPenAlt className="text-3xl" />,
      path: "/custom-features"
    },
    {
      title: "Set Expiry",
      description: "Set the Expiry of your Shortened links to take control on your links.",
      icon: <FaClock className="text-3xl" />,
      path: "/custom-features"
    },
    {
      title: "Top 5 Links",
      description: "See your Top 5 Links which are most clicked worldwide and view the QR Code of each link.",
      icon: <FaStar className="text-3xl" />,
      path: "/analytics"
    }
  ];

  return (
    <div className="mt-16 py-12 px-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl shadow-xl">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-2 text-center text-purple-800">Our Premium Services</h2>
        <p className="text-lg text-purple-600 text-center mb-12">Everything you need to manage and optimize your links</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-gradient-to-b from-purple-100 to-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-200 hover:border-purple-400 flex flex-col h-full"
            >
              <div className="w-12 h-12 flex items-center justify-center mb-4 rounded-full bg-purple-100 text-purple-600">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-purple-800">{service.title}</h3>
              <p className="text-gray-700 flex-grow">{service.description}</p>
              <div className="mt-4 pt-4 border-t border-purple-200">
                <Link
                  to={service.path}
                  className="text-purple-600 hover:text-purple-800 font-medium text-sm flex items-center transition-colors"
                >
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurServices;