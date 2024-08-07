'use strict';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const picturesList = document.querySelector('.list');
const lightbox = new SimpleLightbox('.list  a', {
  captionsData: 'alt',
});

export function markUpRequest(hits) {
  const markUp = hits
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
  picturesList.innerHTML = markUp;
  lightbox.refresh();
}
