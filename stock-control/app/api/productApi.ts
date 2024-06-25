import axios from 'axios';

export const productApi = axios.create({
    baseURL: 'http://localhost:5000/products'
    // baseURL: 'remplazar-urlProduccion'
})