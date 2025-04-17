'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './admin.module.css';
import { AdminProvider } from '@/contexts/AdminContext';
import { ToastContainer } from 'react-toastify';

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const menuItems = [
    { href: '/admin', label: 'Home' },
    { href: '/admin/top-candidates', label: 'Most Voted Candidates' },
    { href: '/admin/votes', label: 'List Submitted Votes' },
    { href: '/admin/new-voter', label: 'Add New Voter' },
  ];

  if (pathname === '/admin/login') {
    return (
      <div className={styles.container}>
        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
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
      <nav className={styles.sidebar}>
        <div className={styles.sidebarTitle}>Admin Panel</div>
        <ul className={styles.nav}>
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link 
                href={item.href}
                className={`${styles.navLink} ${
                  pathname === item.href ? styles.activeLink : ''
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <main className={styles.mainContent}>
        <AdminProvider>
          {children}
        </AdminProvider>
      </main>
    </div>
  );
}