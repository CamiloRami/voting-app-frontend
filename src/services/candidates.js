import { apiFetching } from './apiFetching'
const BASE_ENDPOINT = 'candidates'

export const getCandidates = async ({ offset = 0, limit = 10 } = {}) => {
  const data = await apiFetching({ endpoint: `${BASE_ENDPOINT}?offset=${offset}&limit=${limit}` })
  return data
}

export const getCandidateVotes = async ({ offset = 0, limit = 10 } = {}) => {
  const data = await apiFetching({ endpoint: `${BASE_ENDPOINT}/votes?offset=${offset}&limit=${limit}` })
  return data
}
