'use client'
import styles from './VoteForm.module.css'
import useCandidates from '@/hooks/useCandidates'
import { getVoter } from '@/services/voter'
import { castVote } from '@/services/vote'
import { toast } from 'react-toastify'

export default function VoteForm () {
  const { candidates, loading, error } = useCandidates({ limit: 100 })

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const document = formData.get('document')
    const candidateValue = formData.get('candidate')

    try {
      const voter = await getVoter(document)

      if (!voter) {
        toast.error('Voter not found. Please check your document.')
        return
      }

      const voterId = voter.voter_id

      const selectedCandidate = candidates.find(
        (candidate) => `${candidate.name} ${candidate.last_name}` === candidateValue
      )
      if (!selectedCandidate) {
        toast.error('Please select a valid candidate.')
        return
      }
      const candidateId = selectedCandidate.voter_id
      const response = await castVote({ voterId, candidateId })

      if (!response) {
        toast.error('Error casting vote. Please try again.')
        return
      }
      toast.success('Vote submitted successfully!')
    } catch (error) {
      if (error.message) {
        toast.error(error.message)
        return
      }
      toast.error('An error occurred while submitting your vote.')
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Cast Your Vote</h2>
      <p className={styles.description}>
        Please fill in your document and select your preferred candidate.
      </p>
      <label htmlFor="document" className={styles.label}>
        Document:
        <input
          type="text"
          name="document"
          id="document"
          className={styles.input}
          required
          placeholder="Enter your document or ID"
        />
      </label>
      <label htmlFor="candidate" className={styles.label}>
        Candidate:
        <input
          type="text"
          id="candidate"
          name="candidate"
          className={styles.input}
          required
          list="candidate-list"
          placeholder="Select a candidate"
          autoComplete="off"
          disabled={loading || error}
        />
        <datalist id="candidate-list">
          {!loading &&
            !error &&
            candidates.map((candidate) => (
              <option key={candidate.voter_id} value={`${candidate.name} ${candidate.last_name}`} />
            ))}
        </datalist>
      </label>
      <button type="submit" className={styles.button}>
        Vote
      </button>
    </form>
  )
}
