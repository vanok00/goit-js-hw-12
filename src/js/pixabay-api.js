import axios from 'axios';

export default async function searchPhotoQuery(params) {
  try {
    const response = await axios.get('https://pixabay.com/api/', params);
    return response.data;
  } catch (error) {
    throw error;
  }
}
