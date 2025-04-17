'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkAuth } from '@/services/auth';
import { ToastContainer, toast } from 'react-toastify';
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
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid gap-4">
        <p>Welcome to the admin dashboard!</p>
      </div>
    </div>
  );
}