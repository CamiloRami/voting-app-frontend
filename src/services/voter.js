import { apiFetching } from "./apiFetching";
const BASE_ENDPOINT = 'voters';

export const getVoters = async () => {
  try {
    const data = await apiFetching({ endpoint: BASE_ENDPOINT });
    return data;
  } catch (error) {
    console.error('Error fetching voters:', error);
  }
}

export const getVoter = async (voterDocument) => {
  try {
    const data = await apiFetching({ endpoint: `${BASE_ENDPOINT}/${voterDocument}` });
    return data;
  } catch (error) {
    console.error('Error fetching voter:', error);
  }
}
