import axios from "axios";

const searchPhotos = axios.create({
    baseURL: 'https://pixabay.com/api/',
    params: {
        key: import.meta.env.VITE_PIXABAY_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15,
    },
});

export async function getImagesByQuery(query, currentPage) {
    try {
        const res = await searchPhotos.get('', { params: { q: query, page: currentPage } });
        return res.data;
    } catch (error) {
        throw error;
        }
}


