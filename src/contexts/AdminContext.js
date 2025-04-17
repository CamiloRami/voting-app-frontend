import { getVotes } from '@/services/vote';
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
  const [votes, setVotes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  console.log('AdminProvider votes:', votes);
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
    <AdminContext.Provider value={{ votes, loading, error }}>
      {children}
    </AdminContext.Provider>
  );
};

export { AdminProvider, useAdmin };