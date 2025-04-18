'use client'
import styles from '../admin-pages.module.css'
import { useAdmin } from '@/contexts/AdminContext'
import { useState } from 'react'
import DataTable from '@/app/ui/DataTable'
import { SlArrowDown } from 'react-icons/sl'

export default function VotesList () {
  const { votesData, handleNextStep, loading, error, mostVotedCandidate } = useAdmin()
  const [expandedVoteId, setExpandedVoteId] = useState(null)

  const columns = [
    { key: 'vote_id', header: 'Vote ID' },
    {
      key: 'candidate_name',
      header: 'Voted Candidate',
      render: (row) => `${row.candidate_name} ${row.candidate_last_name}`
    },
    {
      key: 'date',
      header: 'Date',
      render: (row) => new Date(row.date).toLocaleString()
    }
  ]

  const renderExpandedRow = (vote) => (
    <dl className={styles.voteDetails}>
      <dt>Voter Document</dt>
      <dd>{vote.voter_document}</dd>
      <dt>Voter Name</dt>
      <dd>{`${vote.voter_name} ${vote.voter_last_name}`}</dd>
      <dt>Voter Birth</dt>
      <dd>{new Date(vote.voter_birth).toLocaleDateString()}</dd>
      <dt>Voter Address</dt>
      <dd>{vote.voter_address}</dd>
      <dt>Voter Phone</dt>
      <dd>{vote.voter_phone}</dd>
      <dt>Voter Sex</dt>
      <dd>{vote.voter_sex}</dd>
    </dl>
  )

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>List Submitted Votes</h1>
      <div className={styles.section}>
        <h2 className={styles.subtitle}>Votes</h2>
        {mostVotedCandidate && (
          <h3 className={styles.subtitle}>
            Most Voted Candidate: {`${mostVotedCandidate.candidate_name} ${mostVotedCandidate.candidate_last_name}`}
          </h3>
        )}
        <DataTable
          columns={columns}
          data={votesData?.votes?.map(vote => ({ ...vote, id: vote.vote_id })) || []}
          loading={loading}
          error={error?.message}
          expandedRowId={expandedVoteId}
          onRowClick={(voteId) => setExpandedVoteId(expandedVoteId === voteId ? null : voteId)}
          renderExpandedRow={renderExpandedRow}
          clickable={true}
        />
        { votesData?.totalVotes > votesData?.votes?.length && (
          <button className={styles.nextButton} onClick={handleNextStep}>
            <SlArrowDown />
          </button>
        )
        }
      </div>
    </div>
  )
}
