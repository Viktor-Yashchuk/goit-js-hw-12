import axios from "axios";

const searchPhotos = axios.create({
    baseURL: 'https://pixabay.com/api/',
    params: {
        key: import.meta.env.VITE_PIXABAY_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    },
});

export function getImagesByQuery(query) {
    return searchPhotos.get('', { params: { q: query } })
        .then(res => res.data.hits)
        .catch(error => {
            throw error
        });
}


