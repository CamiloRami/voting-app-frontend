'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './AdminLoginForm.module.css';
import { login } from '@/services/auth';
import { toast } from 'react-toastify';

export default function AdminLoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.target);
      const email = formData.get('email');
      const password = formData.get('password');

      const response = await login({ email, password });
      if (response) {
        toast.success('Login successful!');
        router.push('/admin');
      }
    } catch (error) {
      toast.error('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Admin Login</h1>
      <label className={styles.label}>
        Email:
        <input
          type="email"
          name="email"
          required
          className={styles.input}
          disabled={isLoading}
        />
      </label>
      <label className={styles.label}>
        Password:
        <input
          type="password"
          name="password"
          required
          className={styles.input}
          disabled={isLoading}
        />
      </label>
      <button type="submit" className={styles.button} disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}