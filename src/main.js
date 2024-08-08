'use strict';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { searchPhotoQuery } from './js/pixabay-api.js';
import { createImages, clearImages } from './js/render-function.js';
import { toggleLoader } from './js/loader.js';
import ButtonService from './js/loadmoreservice.js';

const loadMoreBtnEl = document.querySelector('.btn');
const loadMoreBtn = new ButtonService(loadMoreBtnEl, 'is-hidden');
loadMoreBtn.hide();

const params = {
  q: '',
  page: 1,
  per_page: 15,
  maxPage: 0,
};

const form = document.querySelector('.js-form');
form.addEventListener('submit', searchPhoto);

async function searchPhoto(event) {
  event.preventDefault();
  clearImages();

  const searchForm = event.currentTarget;
  params.q = searchForm.elements.request.value.toLowerCase().trim();

  if (!params.q) {
    loadMoreBtn.hide();
    iziToast.error({
      message: 'Please enter the data in the input field',
      position: 'topRight',
      messageColor: '#ffffff',
      backgroundColor: '#EF4040',
    });
    toggleLoader(false);
    return;
  }

  params.page = 1;

  loadMoreBtn.show();
  loadMoreBtn.disable();

  try {
    toggleLoader(true);
    const { total, hits } = await searchPhotoQuery(params);
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
    createImages(hits);
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
    const { hits } = await searchPhotoQuery(params);
    createImages(hits);

    let elem = document.querySelector('.list-item');
    let rect = elem.getBoundingClientRect();

    window.scrollBy({
      top: rect.height * 2,
      left: rect.width,
      behavior: 'smooth',
    });
  } catch (error) {
    console.log(error);
  } finally {
    toggleLoader(false);
    if (params.page >= params.maxPage) {
      loadMoreBtn.hide();
      iziToast.info({
        message: 'We`re sorry, but you`ve reached the end of search results.',
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
