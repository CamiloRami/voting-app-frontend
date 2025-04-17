'use client';
import PasswordChangeForm from '@/app/ui/PasswordChangeForm';
import styles from '@/app/ui/AdminLoginForm/AdminLoginForm.module.css';
import { useRouter } from 'next/navigation';

export default function ChangePassword() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/admin');
  };

  return (
    <div className={styles.container}>
      <PasswordChangeForm onSuccess={handleSuccess} />
    </div>
  );
}