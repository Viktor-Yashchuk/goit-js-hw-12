import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader')

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    captionPosition: 'bottom',
    captions: true,
    });

export function createGallery(images) {
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
        `<li class="gallery-item">
    <a class="gallery-link" href="${largeImageURL}">
    <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
    </a>
    <dl class="gallery-stats-list">
        <dt class="title">Likes</dt><dd class="numbers">${likes}</dd>
        <dt class="title">Views</dt><dd class="numbers">${views}</dd>
        <dt class="title">Comments</dt><dd class="numbers">${comments}</dd>
        <dt class="title">Downloads</dt><dd class="numbers">${downloads}</dd>
    </dl>
        </li>`).join('');
    
    galleryEl.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
}

export function clearGallery() {
    galleryEl.innerHTML = '';
}

export function showLoader() {
    loaderEl.classList.remove('hidden');
    loaderEl.setAttribute('aria-busy', 'true');
}

export function hideLoader() {
    loaderEl.classList.add('hidden');
    loaderEl.setAttribute('aria-busy', 'false');
}