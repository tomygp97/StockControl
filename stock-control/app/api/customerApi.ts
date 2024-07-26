import axios from 'axios';

export const customerApi = axios.create({
    baseURL: 'http://localhost:5000/customers'
    // baseURL: 'remplazar-urlProduccion'
})