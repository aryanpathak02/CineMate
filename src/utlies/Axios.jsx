import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer  ${import.meta.env.VITE_API_KEY}`  
    }
});

export default axiosInstance;
