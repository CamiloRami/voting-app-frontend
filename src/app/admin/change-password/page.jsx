'use client';
import { useState } from 'react';
import styles from '@/app/ui/AdminLoginForm/AdminLoginForm.module.css';
import { changePassword } from '@/services/auth';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function ChangePassword() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.target);
      const oldPassword = formData.get('oldPassword');
      const newPassword = formData.get('newPassword');
      const confirmPassword = formData.get('confirmPassword');

      if (newPassword !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }

      await changePassword({ oldPassword, newPassword });
      toast.success('Password changed successfully!');
      router.push('/admin');
    } catch (error) {
      toast.error('Error changing password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.title}>Change Password</h1>
        
        <label className={styles.label}>
          Current Password:
          <input
            type="password"
            name="oldPassword"
            required
            className={styles.input}
            disabled={isLoading}
          />
        </label>

        <label className={styles.label}>
          New Password:
          <input
            type="password"
            name="newPassword"
            required
            className={styles.input}
            disabled={isLoading}
          />
        </label>

        <label className={styles.label}>
          Confirm New Password:
          <input
            type="password"
            name="confirmPassword"
            required
            className={styles.input}
            disabled={isLoading}
          />
        </label>

        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? 'Cambiando...' : 'Cambiar Contraseña'}
        </button>
      </form>
    </div>
  );
}