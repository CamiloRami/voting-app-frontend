'use client';
import styles from '../admin-pages.module.css';
import { useAdmin } from '@/contexts/AdminContext';

export default function VotesList() {
  const { votes, loading, error } = useAdmin();

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }
  if (error) {
    return <div className={styles.error}>Error: {error.message}</div>;
  }
  if (!votes || votes.length === 0) {
    return <div className={styles.noVotes}>No votes submitted yet.</div>;
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>List Submitted Votes</h1>
      <div className={styles.section}>
        <h2 className={styles.subtitle}>Votes</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Voter ID</th>
              <th>Candidate ID</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {votes.map((vote) => (
              <tr key={vote.vote_id}>
                <td>{vote.voter_id}</td>
                <td>{vote.candidate_id}</td>
                <td>{new Date(vote.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}