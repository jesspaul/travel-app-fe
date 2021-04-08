const API_KEY = process.env.REACT_APP_API_KEY;

export function searchPhoto(country) {
    return fetch(`https://api.unsplash.com/search/photos?page=1&query=${country}&orientation=landscape&client_id=${API_KEY}`)
    .then(res => res.json())
}