import PageWrapper from "../components/PageWrapper";

const AboutUs = () => {
  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-purple-100 my-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            About Snipix
          </h2>
          <p className="text-purple-500 mt-2">Shorten. Share. Succeed.</p>
        </div>

        <div className="space-y-6 text-gray-700">
          <p>
            <strong>Snipix</strong> is a modern URL shortener and QR code platform designed for businesses, creators, and developers. 
            We focus on delivering essential features without clutter — fast links, reliable analytics, and seamless sharing.
          </p>

          <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <h3 className="text-xl font-semibold text-purple-800 mb-3">Why Choose Snipix?</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>Lightning-fast link shortening with 99.9% uptime</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>Customizable QR codes with built-in analytics</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>No unnecessary features — just what you actually need.
                  <div>
                    If you think some feature should add then give feed back we respect about your feed backs and also add feature with your intrests
                   <a href="/feedback" className="text-purple-600 mx-3 hover:underline font-medium">
                 Feed Back
              </a>
                  </div>
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>Secure and privacy-focused</span>
              </li>
            </ul>
          </div>

          <p>
            Whether you're sharing links on social media, in presentations, or print materials, 
            Snipix helps you make every click count.
          </p>

          <div className="text-center mt-8">
            <p className="text-purple-600">
              Need custom solutions?{' '}
              <a href="/hire-me" className="text-purple-600 hover:underline font-medium">
                Explore developer services
              </a>
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default AboutUs;