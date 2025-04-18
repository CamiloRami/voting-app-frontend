import { getVotes } from '@/services/vote'
import Cookies from 'js-cookie'
import useCandidateVotes from '@/hooks/useCandidateVotes'
import { createContext, useContext, useState, useEffect } from 'react'

const AdminContext = createContext()

const useAdmin = () => {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}

const offset = 0
const limit = 10
const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null)
  const [votesData, setVotesData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { candidates, candidatesLoading, candidatesError } = useCandidateVotes()

  useEffect(() => {
    const storedAdmin = Cookies.get('admin')
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin))
    } else {
      setAdmin(null)
    }
  }, [])

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const response = await getVotes({ offset, limit })
        if (!response || !response.votes || response.votes.length === 0) {
          throw new Error('No votes found')
        }
        setVotesData({
          votes: response.votes,
          totalVotes: response.pagination.total
        })
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchVotes()
  }
  , [])

  const handleNextStep = async () => {
    const newOffset = votesData.votes.length
    const newLimit = newOffset + limit
    try {
      const response = await getVotes({ offset: newOffset, limit: newLimit })
      if (!response || !response.votes || response.votes.length === 0) {
        throw new Error('No votes found')
      }
      setVotesData((prev) => {
        return {
          ...prev,
          votes: [...prev.votes, ...response.votes]
        }
      })
    } catch (err) {
      setError(err)
    }
  }

  const mostVotedCandidate = candidates?.at(0) || null
  return (
    <AdminContext.Provider value={{ votesData, handleNextStep, admin, loading, error, mostVotedCandidate, candidatesLoading, candidatesError }}>
      {children}
    </AdminContext.Provider>
  )
}

export { AdminProvider, useAdmin }
