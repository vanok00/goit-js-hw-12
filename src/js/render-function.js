'use strict';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsDelay: 250,
  captionsData: 'alt',
});

export default function createImages(images) {
  const gallery = document.querySelector('.js-gallery');
  const markUp = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class = "list-item">
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

</li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markUp);
  lightbox.refresh();
}

export function toggleLoader(isVisible) {
  const loader = document.querySelector('.js-loader');
  if (loader) {
    if (isVisible) {
      loader.style.display = 'inline-block';
    } else {
      loader.style.display = 'none';
    }
  }
}
