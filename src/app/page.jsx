import styles from "./page.module.css";
import VoteForm from "./ui/VoteForm";
export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <VoteForm />
      </main>
      <footer className={styles.footer}>
        // TODO
      </footer>
    </div>
  );
}
