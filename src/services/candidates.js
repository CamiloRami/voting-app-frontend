const API_URL = 'http://localhost:3000/api/v1/';

export const getCandidates = async () => {
  try {
    const response = await fetch(`${API_URL}candidates`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching candidates:', error);
  }
}
