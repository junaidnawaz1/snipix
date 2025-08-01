import PageWrapper from "../components/PageWrapper";

const ContactUs = () => {
  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-purple-100 my-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            Contact Snipix
          </h2>
          <p className="text-purple-500 mt-2">How can we help you?</p>
        </div>

        <div className="text-center space-y-4">
          <p className="text-gray-700">
            For <strong>product feedback or support</strong>, please use our{' '}
            <a href="/feedback" className="text-blue-600 hover:underline">
              Feedback Form
            </a>.
          </p>

          <p className="text-gray-700">
            For <strong>business inquiries</strong> or custom development services, visit{' '}
            <a href="/hire-me" className="text-blue-600 hover:underline">
              Hire the Developer
            </a>.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ContactUs;