import { useState, useEffect } from "react";
import { getCandidateVotes } from "@/services/candidates";

export default function useCandidateVotes() {
  const [candidateVotes, setCandidateVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await getCandidateVotes();
        setCandidateVotes(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  return [candidateVotes, loading, error];
}
