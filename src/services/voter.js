import { apiFetching } from "./apiFetching";
const BASE_ENDPOINT = 'voters';

export const getVoters = async () => {
  try {
    const data = await apiFetching({ endpoint: BASE_ENDPOINT });
    return data;
  } catch (error) {
    throw new Error('Error fetching voters:', error.message);
  }
}

export const getVoter = async (voterDocument) => {
  try {
    const data = await apiFetching({ endpoint: `${BASE_ENDPOINT}/${voterDocument}` });
    return data;
  } catch (error) {
    throw new Error('Error fetching voter:', error.message);
  }
}
