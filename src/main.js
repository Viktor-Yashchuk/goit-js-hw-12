import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api";
import { clearGallery, createGallery, hideLoader, showLoader } from "./js/render-functions";

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = (formData.get('search-text') || '').trim();
    if (!query) {
        iziToast.warning({
            message: 'Please enter a search query',
            position: 'topRight',
        });
        return;
    }
    showLoader();
    clearGallery();
    getImagesByQuery(query).then(res => {
    if (!res.length) {
        iziToast.info({
            message: 'Sorry, there are no images matching <br> your search query. Please try again!',
            position: 'topRight',
            backgroundColor: '#ef4040',
            progressBarColor: '#b51b1b',
        });
        return;
    }
        createGallery(res);
        })
        .catch(() => {
            iziToast.error({
                message: 'Something went wrong.',
                position: 'topRight',
            });
        })
        .finally(() => {
            hideLoader();           
        });
        e.currentTarget.reset();
});


