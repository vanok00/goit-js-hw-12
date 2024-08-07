'use strict';
import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
export async function searchPhoto({ q, page, per_page }) {
  const API_KEY = '45176158-e3d3b26982233790558f60971';
  const params = new URLSearchParams({
    key: API_KEY,
    q: q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page,
  });
  try {
    return await axios
      .get('', { params })
      .then(({ data }) => data)
      .catch(error => console.log(error));
  } catch (error) {}
}
