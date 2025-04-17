'use client';
import styles from '../admin-pages.module.css';
import { useAdmin } from '@/contexts/AdminContext';
import { useState } from 'react';

export default function VotesList() {
  const { votes, loading, error, mostVotedCandidate, candidateLoading, candidateError } = useAdmin();
  const [expandedVoteId, setExpandedVoteId] = useState(null);

  if (loading || candidateLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }
  if (error) {
    return <div className={styles.error}>Error: {error.message}</div>;
  }
  if (!votes || votes.length === 0) {
    return <div className={styles.noVotes}>No votes submitted yet.</div>;
  }

  const handleRowClick = (voteId) => {
    setExpandedVoteId(expandedVoteId === voteId ? null : voteId);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>List Submitted Votes</h1>
      <div className={styles.section}>
        <h2 className={styles.subtitle}>Votes</h2>
        <h3 className={styles.subtitle}>Most Voted Candidate: {`${mostVotedCandidate.candidate_name} ${mostVotedCandidate.candidate_last_name}`}</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Vote ID</th>
              <th>Voted Candidate</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {votes.map((vote) => (
              <>
                <tr key={vote.vote_id} onClick={() => handleRowClick(vote.vote_id)}>
                  <td>{vote.vote_id}</td>
                  <td>{`${vote.candidate_name} ${vote.candidate_last_name}`}</td>
                  <td>{new Date(vote.date).toLocaleString()}</td>
                </tr>
                {expandedVoteId === vote.vote_id && (
                  <tr>
                    <td colSpan="3" className={styles.voteDetails}>
                      <dl>                      
                        <dt>Voter Document</dt>
                        <dd>{vote.voter_document}</dd>
                        
                        <dt>Voter Name</dt>
                        <dd>{`${vote.voter_name} ${vote.voter_last_name}`}</dd>

                        <dt>Voter Birth</dt>
                        <dd>{new Date(vote.voter_birth).toLocaleDateString()}</dd>

                        <dt>Voter Address</dt>
                        <dd>{vote.voter_address}</dd>

                        <dt>Voter Phone</dt>
                        <dd>{vote.voter_phone}</dd>

                        <dt>Voter Sex</dt>
                        <dd>{vote.voter_sex}</dd>
                      </dl>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}