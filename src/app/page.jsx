"use client";
import styles from "./page.module.css";
import VoteForm from "./ui/VoteForm";
import { ToastContainer } from "react-toastify";
export default function Home() {
  return (
    <div className={styles.page}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <main className={styles.main}>
        <VoteForm />
      </main>
      <footer className={styles.footer}>
        // TODO
      </footer>
    </div>
  );
}
