'use strict';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import searchPhotoQuery from './js/pixabay-api.js';
import createImages from './js/render-function.js';
import { toggleLoader } from './js/render-function.js';

const form = document.querySelector('.form');
const loader = document.querySelector('.js-loader');
const gallery = document.querySelector('.js-gallery');
const loadMoreBtnEl = document.querySelector('.loadmore-btn');

const KEY = '45176158-e3d3b26982233790558f60971';
let currentPage = 1;
let query = '';
let totalHits = 0;
let totalPagesToLoad = 0;

form.addEventListener('submit', searchPhoto);
loadMoreBtnEl.addEventListener('click', handleLoadMore);

async function searchPhoto(event) {
  event.preventDefault();

  query = form.elements[0].value.toLowerCase().trim();
  currentPage = 1;
  gallery.innerHTML = '';

  if (query === '' || query.length < 2) {
    iziToast.error({
      message: 'Please enter the data in the input field',
      position: 'topRight',
      messageColor: '#ffffff',
      backgroundColor: '#EF4040',
    });
    loadMoreBtnEl.style.display = 'none';
    toggleLoader(false);
    return;
  }

  const options = {
    params: {
      key: KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      page: currentPage,
      per_page: 15,
      maxPage: 0,
    },
  };

  try {
    toggleLoader(true);
    const data = await searchPhotoQuery(options);
    loader.style.display = 'none';

    if (data.hits.length === 0) {
      iziToast.error({
        title: '',
        message: 'Sorry, there are no images matching your search!',
      });
      loadMoreBtnEl.style.display = 'none';
    } else {
      createImages(data.hits);
      loadMoreBtnEl.style.display = 'block';
      totalHits = data.totalHits;
      totalPagesToLoad = totalHits / 15;
    }
  } catch (error) {
    loader.style.display = 'none';
    iziToast.error({
      title: '',
      message: `Sorry, there was an error fetching the images: ${
        error.message || error
      }`,
    });
  } finally {
    toggleLoader(false);
    if (totalHits < 15) {
      loadMoreBtnEl.style.display = 'none';
    }
    form.reset();
  }
}

async function handleLoadMore() {
  loader.style.display = 'block';
  currentPage += 1;

  const options = {
    params: {
      key: KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      page: currentPage,
      per_page: 15,
    },
  };

  try {
    const data = await searchPhotoQuery(options);
    loader.style.display = 'none';

    createImages(data.hits);

    const galleryItem = document.querySelector('.gallery li');
    const galleryItemParams = galleryItem.getBoundingClientRect();
    window.scrollBy({
      top: galleryItemParams.height * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    loader.style.display = 'none';
    iziToast.error({
      title: '',
      message: `Sorry, there was an error fetching the images: ${
        error.message || error
      }`,
    });
  } finally {
    toggleLoader(false);
    if (currentPage >= totalPagesToLoad) {
      loadMoreBtnEl.style.display = 'none';
      iziToast.info({
        title: '',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  }
}
