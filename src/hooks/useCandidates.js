import { useState, useEffect } from "react";
import { getCandidates } from "@/services/candidates";

export default function useCandidates({offset = 0, limit = 10 } = {}) {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await getCandidates({ offset, limit });
        if (!response || !response.candidates ||response.candidates.length === 0) {
          throw new Error("No candidates found");
        }
        setCandidates(response.candidates);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [offset, limit]);

  return {candidates, loading, error};
}
