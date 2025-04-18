'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import styles from './admin.module.css'
import { AdminProvider } from '@/contexts/AdminContext'
import { ToastContainer } from 'react-toastify'
import { FiMenu, FiX } from 'react-icons/fi'

export default function AdminLayout ({ children }) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { href: '/admin', label: 'Home' },
    { href: '/admin/top-candidates', label: 'Most Voted Candidates' },
    { href: '/admin/votes', label: 'List Submitted Votes' },
    { href: '/admin/new-voter', label: 'Add New Voter' }
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  if (pathname === '/admin/login') {
    return (
      <div className={styles.container}>
        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    )
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
      <button
        className={`${styles.menuButton} ${isMenuOpen ? styles.open : ''}`}
        onClick={toggleMenu}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
      >
        {isMenuOpen ? <FiX /> : <FiMenu />}
      </button>
      <nav className={`${styles.sidebar} ${isMenuOpen ? styles.open : ''}`}>
        <div className={styles.sidebarTitle}>
          Admin Panel
        </div>
        <ul className={styles.nav}>
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`${styles.navLink} ${
                  pathname === item.href ? styles.activeLink : ''
                }`}
                onClick={closeMenu}
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
  )
}
