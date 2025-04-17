import { getVotes } from '@/services/vote';
import Cookies from 'js-cookie';
import useCandidateVotes from '@/hooks/useCandidateVotes';
import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}

const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [votes, setVotes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ [ mostVotedCandidate ], candidateLoading, candidateError ] = useCandidateVotes();
  
  useEffect(() => {
    const storedAdmin = Cookies.get('admin');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    } else {
      setAdmin(null);
    }
  }, []);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const data = await getVotes();
        setVotes(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVotes();
  }
  , []);

  return (
    <AdminContext.Provider value={{ votes, admin, loading, error, mostVotedCandidate, candidateLoading, candidateError }}>
      {children}
    </AdminContext.Provider>
  );
};

export { AdminProvider, useAdmin };