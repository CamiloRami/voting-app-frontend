"use client";
import styles from './VoteForm.module.css';
import useCandidates from '@/hooks/useCandidates';

export default function VoteForm() {
  const { candidates, candidateLoading, candidateError } = useCandidates();

  return (
    <form className={styles.form}>
      <h2 className={styles.title}>Cast Your Vote</h2>
      <p className={styles.description}>
        Please fill in your document and select your preferred candidate.
      </p>
      <label htmlFor="document" className={styles.label}>
        Document:
        <input
          type="text"
          name="document"
          id="document"
          className={styles.input}
          required
          placeholder="Enter your document or ID"
        />
      </label>
      <label htmlFor="candidate" className={styles.label}>
        Candidate:
        <input
          type="text"
          id="candidate"
          name="candidate"
          className={styles.input}
          required
          list="candidate-list"
          placeholder="Select a candidate"
          autoComplete="off"
          disabled={candidateLoading || candidateError}
        />
        <datalist id="candidate-list">
          {loading && <option value="Loading..." />}
          {error && <option value="Error loading candidates" />}
          {!loading &&
            !error &&
            candidates.map((candidate) => (
              <option key={candidate.voter_id} value={candidate.name} />
            ))}
        </datalist>
      </label>
      <button type="submit" className={styles.button}>
        Vote
      </button>
    </form>
  );
}