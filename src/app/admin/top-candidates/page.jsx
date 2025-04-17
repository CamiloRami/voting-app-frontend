'use client';
import styles from '../admin-pages.module.css';
import useCandidateVotes from '@/hooks/useCandidateVotes';
import { toast } from 'react-toastify';

export default function TopCandidates() {
  const [ candidateVotes, loading, error ] = useCandidateVotes();

  if (error) {
    toast.error('Error fetching candidate votes');
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Most Voted Candidates</h1>
      <div className={styles.section}>
        {loading && <div className={styles.loading}>Loading...</div>}
        {candidateVotes && candidateVotes.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Candidate ID</th>
                <th>Candidate Name</th>
                <th>Votes</th>
              </tr>
            </thead>
            <tbody>
              {candidateVotes.map((candidate) => (
                <tr key={candidate.candidate_id}>
                  <td>{candidate.candidate_id}</td>
                  <td>{`${candidate.candidate_name} ${candidate.candidate_last_name}`}</td>
                  <td>{candidate.vote_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={styles.noVotes}>No votes submitted yet.</div>
        )}
      </div>
    </div>
  );
}