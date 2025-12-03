import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api";
import { clearGallery, createGallery, hideLoader, hideLoadMoreButton, refs, showLoader, showLoadMoreButton } from "./js/render-functions";

let currentPage;
let query;
let maxPages;

refs.formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    query = (formData.get('search-text') || '').trim();
    if (!query) {
        iziToast.warning({
            message: 'Please enter a search query',
            position: 'topRight',
        });
        return;
    }
    showLoader();
    clearGallery();
    hideLoadMoreButton();
    currentPage = 1;
    try {
        const { hits, totalHits } = await getImagesByQuery(query, currentPage);
        const perPage = 15;
        maxPages = Math.ceil(totalHits / perPage);
        if (!hits.length) {
            iziToast.info({
                message: 'Sorry, there are no images matching <br> your search query. Please try again!',
                position: 'topRight',
                backgroundColor: '#ef4040',
                progressBarColor: '#b51b1b',
            });
            return;
        }
        createGallery(hits);
        if (maxPages > 1) {
            showLoadMoreButton();
        } else {
            hideLoadMoreButton()
        }
    }
        catch (error) {
            iziToast.error({
                message: 'Something went wrong.',
                position: 'topRight',
            });
        }
        finally {
            hideLoader();  
            refs.formEl.reset();
        }
});

refs.btnLoadEl.addEventListener('click', async () => {
    currentPage += 1;
    hideLoadMoreButton();
    showLoader();
    try {
        const { hits } = await getImagesByQuery(query, currentPage);
        createGallery(hits);
        const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
        window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
        });
        if (currentPage < maxPages) {
            showLoadMoreButton();
        } else {
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight',
                backgroundColor: '#ef4040',
                progressBarColor: '#b51b1b',
            });
        }
    } catch (error) {
        iziToast.error({
            message: 'Something went wrong.',
            position: 'topRight',
        });
        showLoadMoreButton();
    }
    finally {
        hideLoader();
    }
});
