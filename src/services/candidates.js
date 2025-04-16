import { apiFetching } from "./apiFetching";
const BASE_ENDPOINT = 'candidates';

export const getCandidates = async () => {
  try {
    const data = await apiFetching({ endpoint: BASE_ENDPOINT });
    return data;
  } catch (error) {
    console.error('Error fetching candidates:', error);
  }
}