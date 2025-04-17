'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkAuth } from '@/services/auth';
import { ToastContainer, toast } from 'react-toastify';
import styles from './dashboard.module.css';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateAuth = async () => {
      try {
        const authStatus = await checkAuth();
        if (!authStatus) {
          router.push('/admin/login');
        }
      } catch (error) {
        toast.error('Authentication error');
        router.push('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    validateAuth();
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <ToastContainer />
      <h1 className={styles.title}>Admin Dashboard</h1>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Vote Summary</h2>
          {/* TODO: Implement vote summary statistics */}
        </div>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Featured Candidates</h2>
          {/* TODO: Implement top candidates summary */}
        </div>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Recent Activity</h2>
          {/* TODO: Implement recent activity feed */}
        </div>
      </div>
    </div>
  );
}