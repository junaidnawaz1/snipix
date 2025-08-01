import { useState } from 'react';
import { FaPaperPlane, FaUser, FaEnvelope, FaComment } from 'react-icons/fa';
import toast from 'react-hot-toast';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendFeedback = async (e) => {
    e.preventDefault();
    toast.loading('Sending feedback...');
    try {
      const response = await fetch('https://formspree.io/f/xqalaywk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      toast.dismiss();

      if (response.ok) {
        toast.success('Feedback sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error('Failed to send feedback.');
      }
    } catch {
      toast.dismiss();
      toast.error('Error sending feedback. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-purple-100 overflow-hidden">
    {/* Header Section */}
    <div className="px-6 pt-8 pb-2 text-center">
      <div className="inline-block bg-gradient-to-r from-purple-100 to-blue-100 rounded-full px-4 py-1 mb-3">
        <span className="text-xs font-medium text-purple-600">HELP US IMPROVE</span>
      </div>
      
      <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-2">
        Share Your Feedback
      </h2>
      
      <p className="text-sm md:text-base text-purple-500 mb-4">
        We'd love to hear from you!
      </p>
      
      <div className="bg-gradient-to-r from-purple-700 to-blue-700 rounded-lg p-3 md:p-4 shadow-lg mx-2">
        <p className="text-white text-sm md:text-base leading-snug">
          If you think <span className="font-bold bg-white/20 px-1.5 py-0.5 rounded">any feature should be added</span> then share your thoughts. 
          We value your feedback and will <span className="font-bold bg-white/20 px-1.5 py-0.5 rounded">prioritize features</span> based on your needs.
        </p>
      </div>
    </div>

    {/* Form Section */}
    <form onSubmit={sendFeedback} className="px-6 pb-8 space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaUser className="text-purple-500 text-sm" />
        </div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border-2 border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaEnvelope className="text-purple-500 text-sm" />
        </div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border-2 border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
          <FaComment className="text-purple-500 text-sm" />
        </div>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Feedback"
          required
          className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border-2 border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all h-28"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-2.5 px-4 rounded-lg shadow transition-all flex items-center justify-center text-sm"
      >
        <FaPaperPlane className="mr-2 text-xs" />
        Send Feedback
      </button>
    </form>
  </div>
</div>
  );
};

export default FeedbackForm;