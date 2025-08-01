import FeedbackForm from "../components/FeedbackForm";
import PageWrapper from "../components/PageWrapper";

const Feedback = () => {
  return (
    <PageWrapper>

    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <FeedbackForm />
    </div>
    </PageWrapper>
  );
};

export default Feedback;
