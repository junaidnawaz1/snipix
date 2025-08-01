import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-400 via-purple-700 to-pink-400 text-white py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
           <Link to="/" className="flex items-center space-x-2  p-1 rounded">
  <img
    src="/logo.png"
    alt="SnipiX Logo"
    className="h-24 relative bottom-6 w-96 object-contain"
  />
</Link>
          <p className="text-purple-100 ">The smart way to shorten links, track analytics, and grow your business.</p>
          <div className="container mx-auto px-4 mt-4 text-center">
    <p className="text-white">
      Need custom development?{' '}
      <a 
        href="/hire-me" 
        className="text-white hover:underline font-medium"
      >
        Hire the developer
      </a>
    </p>
  </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/" className="hover:underline text-purple-100 hover:text-white">Home</a></li>
            <li><a href="/about-us" className="hover:underline text-purple-100 hover:text-white">About Us</a></li>
            <li><a href="/feedback" className="hover:underline text-purple-100 hover:text-white">Feedback</a></li>
                        <li><a href="/hire-me" className="hover:underline text-purple-100 hover:text-white">Hire developer</a></li>

          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Services</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/custom-features" className="hover:underline text-purple-100 hover:text-white">Custom Features</a></li>
            <li><a href="/myqrcodes" className="hover:underline text-purple-100 hover:text-white">My QRCodes</a></li>
            <li><a href="/analytics" className="hover:underline text-purple-100 hover:text-white">Analytics</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Coming Soon</h3>
          <p className="text-purple-100">Premium plans with exclusive features and extended analytics.</p>
        </div>
      </div>

      <div className="text-center text-purple-200 text-xs mt-6">
        &copy; {new Date().getFullYear()} Snipix. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;