import { useState } from 'react';
import { FaPaperPlane, FaUser, FaEnvelope, FaComment, FaCode, FaWordpress, FaServer } from 'react-icons/fa';
import toast from 'react-hot-toast';
import PageWrapper from '../components/PageWrapper';

const HireMe = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    toast.loading('Sending your message...');
    try {
      const response = await fetch('https://formspree.io/f/xqalaywk', { // Reuse your existing endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          subject: 'New Freelance Inquiry from SaaS Site'
        }),
      });

      toast.dismiss();

      if (response.ok) {
        toast.success('Message sent successfully! I\'ll respond within 24 hours.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error('Failed to send message.');
      }
    } catch {
      toast.dismiss();
      toast.error('Error sending message. Please try again.');
    }
  };

  return (
    <PageWrapper>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
      <div className="w-full max-w-3xl p-8 bg-white rounded-2xl shadow-xl border border-purple-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            Custom Development Services
          </h2>
          <p className="text-purple-500 mt-2">The developer behind this SaaS is available for hire</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Developer Info Section */}
          <div className="space-y-6">
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">About Me</h3>
              <p className="text-purple-600 mb-4">
                Full-stack developer specializing in:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <FaCode className="text-purple-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-purple-700">MERN Stack Development</span>
                </li>
                <li className="flex items-start">
                  <FaWordpress className="text-purple-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-purple-700">WordPress + Elementor</span>
                </li>
                <li className="flex items-start">
                  <FaServer className="text-purple-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-purple-700">SaaS Application Development</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Why Hire Me?</h3>
              <ul className="space-y-2 text-blue-700">
                <li>• Built this production-ready SaaS platform</li>
                <li>• 100% code ownership (no templates)</li>
                <li>• Focus on clean, maintainable code</li>
                <li>• Responsive design expertise</li>
              </ul>
            </div>
          </div>

          {/* Contact Form (Reused from Feedback) */}
          <div>
            <form onSubmit={sendMessage} className="space-y-6">
                 <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            Contact Me via Email
          </h2>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-purple-500" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-purple-500" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                  <FaComment className="text-purple-500" />
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your project needs..."
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all h-32"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center"
              >
                <FaPaperPlane className="mr-2" />
                Request Quote
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </PageWrapper>
  );
};

export default HireMe;