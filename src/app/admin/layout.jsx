'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './admin.module.css';

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const menuItems = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/top-candidates', label: 'Most Voted Candidates' },
    { href: '/admin/votes', label: 'List Submitted Votes' },
    { href: '/admin/vote-details', label: 'View Vote Details' },
    { href: '/admin/new-voter', label: 'Add New Voter' },
    { href: '/admin/change-password', label: 'Change Admin Password' },
  ];

  return (
    <div className={styles.container}>
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
        {children}
      </main>
    </div>
  );
}