'use strict';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function createImages(data) {
  const gallery = document.querySelector('.js-gallery');
  let markUp = data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class = "list-item">
  <a href="${largeImageURL}">
    <div class = "preview-photo"><img src="${webformatURL}" alt="${tags}"></div>
     <ul class="img-desc">
    <li>
      <h2>Likes</h2>
      <p>${likes}</p>
    </li>
    <li>
      <h2>Views</h2>
      <p>${views}</p>
    </li>
    <li>
      <h2>Comments</h2>
      <p>${comments}</p>
    </li>
    <li>
      <h2>Downloads</h2>
      <p>${downloads}</p>
    </li>
  </ul>
  </a>

</li>`;
      }
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markUp);

  const lightbox = new SimpleLightbox('.gallery  a', {
    captions: true,
    captionsDelay: 250,
    captionsData: 'alt',
  });
  lightbox.refresh();
}

export function clearImages() {
  const galleryList = document.querySelector('.gallery');
  galleryList.innerHTML = '';
}
