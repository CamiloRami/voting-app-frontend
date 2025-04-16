import { useState, useEffect } from "react";
import { getCandidates } from "@/services/candidates";

export default function useCandidates() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await getCandidates();
        setCandidates(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  return [candidates, loading, error];
}
