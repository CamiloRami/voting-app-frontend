import styles from './VoteForm.module.css';

export default function VoteForm() {
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
        />
        <datalist id="candidate-list">
          <option value="José" />
          <option value="Paco" />
          <option value="María" />
        </datalist>
      </label>
      <button type="submit" className={styles.button}>
        Vote
      </button>
    </form>
  );
}