import { apiFetching } from "./apiFetching";
const BASE_ENDPOINT = 'votes';

export const castVote = async ({voterId, candidateId}) => {
  try {
    const data = await apiFetching({
      endpoint: BASE_ENDPOINT,
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ voterId, candidateId }),
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export const getVotes = async ({offset = 0, limit = 10 } = {}) => {
  try {
    const data = await apiFetching({ 
      endpoint: `${BASE_ENDPOINT}/detailed?offset=${offset}&limit=${limit}` 
    });
    return data;
  } catch (error) {
    throw error;
  }
}
