import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export const refs = {
    galleryEl: document.querySelector('.gallery'),
    loaderEl: document.querySelector('.loader'),
    btnLoadEl: document.querySelector('.btn-load-more'),
    formEl: document.querySelector('.form')
}

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
    
    refs.galleryEl.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
}

export function clearGallery() {
    refs.galleryEl.innerHTML = '';
}

export function showLoader() {
    refs.loaderEl.classList.remove('hidden');
    refs.loaderEl.setAttribute('aria-busy', 'true');
}

export function hideLoader() {
    refs.loaderEl.classList.add('hidden');
    refs.loaderEl.setAttribute('aria-busy', 'false');
}

export function showLoadMoreButton() {
    refs.btnLoadEl.classList.remove('hidden');
}

export function hideLoadMoreButton() {
    refs.btnLoadEl.classList.add('hidden');
}