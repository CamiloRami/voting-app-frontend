import { apiFetching } from './apiFetching'
const BASE_ENDPOINT = 'votes'

export const castVote = async ({ voterId, candidateId }) => {
  return await apiFetching({
    endpoint: BASE_ENDPOINT,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ voterId, candidateId })
    }
  })
}

export const getVotes = async ({ offset = 0, limit = 10 } = {}) => {
  return await apiFetching({
    endpoint: `${BASE_ENDPOINT}/detailed?offset=${offset}&limit=${limit}`
  })
}
