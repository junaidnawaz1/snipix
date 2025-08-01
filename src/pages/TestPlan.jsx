// src/pages/TestPlan.jsx
import usePlan from "../hooks/usePlan";
import { startTrial } from "../services/planService";

const TestPlan = () => {
  const { plan, loading } = usePlan();

  const handleTrial = async () => {
    try {
      const res = await startTrial();
      alert(res.message);
      window.location.reload(); // Refresh to get updated plan
    } catch {
      alert("Trial failed or already used");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📝 Plan Test Page</h2>

      <p><strong>Plan:</strong> {plan?.plan}</p>
      <p><strong>Trial Active:</strong> {plan?.trialActive ? "Yes" : "No"}</p>
      <p><strong>Trial Expiry:</strong> {plan?.trialExpiry ? new Date(plan.trialExpiry).toLocaleString() : "Not started"}</p>

      {plan?.plan === "free" && !plan?.trialActive && (
        <button onClick={handleTrial} className="bg-blue-600 text-white px-4 py-2 mt-4">
          Start Trial
        </button>
      )}
    </div>
  );
};

export default TestPlan;
