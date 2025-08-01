// src/hooks/usePlan.js
import { useEffect, useState } from "react";
import { getPlanStatus } from "../services/planService";

const usePlan = () => {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const data = await getPlanStatus();
        setPlan(data);
      } catch (err) {
        console.error("Failed to fetch plan", err);
      } finally {  
        setLoading(false);
      }
    };

    fetchPlan();
  }, []);

  return { plan, loading };
};

export default usePlan;
