'use client';
import styles from '../admin-pages.module.css';

export default function TopCandidates() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Most Voted Candidates</h1>
      <div className={styles.section}>
        {/* TODO: Implement candidates listing with vote counts */}
      </div>
    </div>
  );
}