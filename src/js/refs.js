export default {
  searchForm: document.querySelector('.search-form'),
  articlesContainer: document.querySelector('.articles'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
  spinner: document.querySelector('.spinner'),
};

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
