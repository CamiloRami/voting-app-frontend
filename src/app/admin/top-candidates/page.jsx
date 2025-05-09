'use client'
import styles from '../admin-pages.module.css'
import useCandidateVotes from '@/hooks/useCandidateVotes'
import DataTable from '@/app/ui/DataTable'
import { SlArrowDown } from 'react-icons/sl'

export default function TopCandidates () {
  const { candidateVotesData, handleNextStep, loading, error } = useCandidateVotes()

  const columns = [
    { key: 'candidate_id', header: 'Candidate ID' },
    {
      key: 'candidate_name',
      header: 'Candidate Name',
      render: (row) => `${row.candidate_name} ${row.candidate_last_name}`
    },
    { key: 'vote_count', header: 'Number of Votes' }
  ]

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Top Voted Candidates</h1>
      <div className={styles.section}>
        <DataTable
          clickable={false}
          columns={columns}
          data={
            candidateVotesData?.candidates?.map(candidate => ({ ...candidate, id: candidate.candidate_id })) || []
          }
          loading={loading}
          error={error?.message}
        />
        { candidateVotesData?.totalCandidates > candidateVotesData?.candidates?.length && (
          <button className={styles.nextButton} onClick={handleNextStep}>
            <SlArrowDown />
          </button>
        )
        }
      </div>
    </div>
  )
}
