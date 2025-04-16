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
    console.error('Error casting vote:', error);
  }
}
