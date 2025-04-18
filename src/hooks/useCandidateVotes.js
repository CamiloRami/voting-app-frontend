import { useState, useEffect } from "react";
import { getCandidateVotes } from "@/services/candidates";

export default function useCandidateVotes({offset = 0, limit = 10 } = {}) {
  const [candidateVotesData, setCandidateVotesData] = useState({
    candidates: [],
    totalCandidates: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await getCandidateVotes({ offset, limit });
        if (!response || !response.candidates || response.candidates.length === 0) {
          throw new Error("No candidates found");
        }
        setCandidateVotesData({
          candidates: response.candidates,
          totalCandidates: response.pagination.total
        });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [offset, limit]);

  const handleNextStep = async () => {
    const newOffset = candidateVotesData.candidates.length;
    const newLimit = newOffset + limit;
    try {
      const response = await getCandidateVotes({ offset: newOffset, limit: newLimit });
      if (!response || !response.candidates || response.candidates.length === 0) {
        throw new Error("No candidates found");
      }
      setCandidateVotesData(prev => {
        return {
          candidates: [...prev.candidates, ...response.candidates],
          totalCandidates: response.total
        }
      });
    } catch (err) {
      setError(err);
    }
  };

  return {candidateVotesData, handleNextStep, loading, error};
}
