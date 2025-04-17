import AdminLoginForm from '@/app/ui/AdminLoginForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminLoginPage() {
  return (
    <div>
      <ToastContainer />
      <AdminLoginForm />
    </div>
  );
}