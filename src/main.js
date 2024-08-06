'use strict';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { markUpRequest } from './js/render-function.js';
import { searchPhotoByQuery } from './js/pixabay-api.js';
const picturesList = document.querySelector('.list');
const loader = document.querySelector('.loader');
const form = document.querySelector('.js-form');
import refs from './js/refs.js';
loader.style.display = 'none';
form.addEventListener('submit', searchQuery);

function searchQuery(event) {
  event.preventDefault();
  picturesList.innerHTML = '';
  const inputValue = event.target.request.value.trim().toLowerCase();
  if (!inputValue) {
    return;
  }
  loadCondition(loader, true);
  searchPhotoByQuery(inputValue)
    .then(data => {
      if (data.hits.length === 0) {
        throw new Error(response.status);
      }
      loadCondition(loader, false);
      markUpRequest(data.hits);
    })
    .catch(error => {
      loadCondition(loader, false);
      catchError(error);
    })
    .finally(form.reset());
}
function catchError(error) {
  return iziToast.show({
    message:
      'Sorry, there are no images matching your search query. Please try again!',
    color: 'red',
    position: 'topRight',
    closeOnClick: true,
  });
}
function loadCondition(element, status) {
  if (status) {
    element.style.display = 'block';
  } else {
    element.style.display = 'none';
  }
}

import ButtonService from './js/loadmoreservice.js';
const loadMoreBtn = new ButtonService(refs.loadMoreBtn, 'is-hidden');
console.log(loadMoreBtn);
loadMoreBtn.hide();
