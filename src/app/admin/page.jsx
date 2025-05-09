'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { checkAuth, logout } from '@/services/auth'
import { toast } from 'react-toastify'
import styles from './home.module.css'
import { useAdmin } from '@/contexts/AdminContext'
import Cookies from 'js-cookie'

export default function AdminHome () {
  const { admin } = useAdmin()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  const handleLogout = () => {
    const response = logout()
    if (!response) {
      toast.error('Logout failed')
      return
    }
    Cookies.remove('admin')
    toast.success('Logout successful')
    router.push('/admin/login')
  }

  useEffect(() => {
    const validateAuth = async () => {
      try {
        const authStatus = await checkAuth()
        if (!authStatus) {
          router.push('/admin/login')
        }
      } catch (error) {
        toast.error('Authentication error')
        router.push('/admin/login')
      } finally {
        setIsLoading(false)
      }
    }

    validateAuth()
  }, [router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Welcome, {admin.username}</h1>
        <div className={styles.buttonsContainer}>
          <button
            onClick={() => router.push('/admin/change-password')}
            className={styles.changePasswordButton}
          >
            Change Password
          </button>
          <button
            onClick={handleLogout}
            className={styles.logoutButton}
          >
            Logout
          </button>
        </div>
      </header>
    </section>
  )
}
