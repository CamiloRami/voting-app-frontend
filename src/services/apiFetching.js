const API_URL = 'http://localhost:3000/api/v1/';

export const apiFetching = async ({endpoint, options}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
