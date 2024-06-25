import axios from 'axios';

export const saleApi = axios.create({
    baseURL: 'http://localhost:5000/sales'
    // baseURL: 'remplazar-urlProduccion'
})