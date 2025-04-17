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

export const getVotes = async () => {
  try {
    const data = await apiFetching({ endpoint: BASE_ENDPOINT });
    return data;
  } catch (error) {
    throw new Error('Error fetching votes:', error.message);
  }
}
