'use strict';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { searchPhoto } from './js/pixabay-api.js';
import { markUpRequest } from './js/render-function.js';
import { toggleLoader } from './js/loader.js';
import ButtonService from './js/loadmoreservice.js';

// const loadingText = document.querySelector('.textloader');
const loadMoreBtnEl = document.querySelector('.btn');
const loadMoreBtn = new ButtonService(loadMoreBtnEl, 'is-hidden');
loadMoreBtn.hide();

const params = {
  q: '',
  page: 1,
  per_page: 15,
  maxPage: 0,
};

const picturesList = document.querySelector('.list');
// console.log(picturesList);

const loader = document.querySelector('.loader');
const form = document.querySelector('.js-form');

form.addEventListener('submit', searchQuery);

async function searchQuery(event) {
  event.preventDefault();
  picturesList.innerHTML = '';
  const searchForm = event.currentTarget;
  // params.q = form.elements.search.value.toLowerCase().trim();

  params.q = event.target.request.value.trim().toLowerCase();

  if (!params.q) {
    loadMoreBtn.hide();
    iziToast.error({
      message: 'Please enter the data in the input field',
      position: 'topRight',
      messageColor: '#ffffff',
      backgroundColor: '#EF4040',
    });
    return;
  }

  params.page = 1;

  loadMoreBtn.show();
  loadMoreBtn.disable();

  try {
    toggleLoader(true);
    const { total, hits } = await searchPhoto(params);
    params.maxPage = Math.ceil(total / params.per_page);

    if (params.maxPage > 1) {
      loadMoreBtn.enable();
      loadMoreBtnEl.addEventListener('click', handleLoadMore);
    } else {
      loadMoreBtn.hide();
    }
    if (!hits.length) {
      loadMoreBtn.hide();
      iziToast.error({
        message: `Sorry, there was an error fetching the images. Please try again later!`,
        position: 'topRight',
        messageColor: '#ffffff',
        backgroundColor: '#EF4040',
      });
      return;
    }
    markUpRequest(hits);
  } catch (err) {
    loadMoreBtn.hide();
    iziToast.error({
      message: 'Sorry, there are no images matching your search',
      position: 'topRight',
      messageColor: '#ffffff',
      backgroundColor: '#EF4040',
    });
  } finally {
    toggleLoader(false);
    if (params.page === params.maxPage) {
      loadMoreBtn.hide();
      loadMoreBtnEl.removeEventListener('click', handleLoadMore);
    } else {
      loadMoreBtn.enable();
    }
    searchForm.reset();
  }
}

async function handleLoadMore() {
  loadMoreBtn.disable();
  params.page += 1;
  try {
    toggleLoader(true);
    const { hits } = await searchPhoto(params);
    markUpRequest(hits);

    let elem = document.querySelector('.list');
    let rect = elem.getBoundingClientRect();

    window.scrollBy({
      top: rect.height * 2,
      left: rect.width,
      behavior: 'smooth',
    });

    // console.log(rect.height);
  } catch (error) {
    console.log(error);
  } finally {
    toggleLoader(false);
    if (params.page >= params.maxPage) {
      loadMoreBtn.hide();
      iziToast.info({
        message: 'You have reached the end of search results.',
        position: 'topRight',
        messageColor: '#ffffff',
        backgroundColor: '#4e75ff',
      });

      loadMoreBtn.hide();
      loadMoreBtnEl.removeEventListener('click', handleLoadMore);
    } else {
      loadMoreBtn.enable();
    }
  }
}
