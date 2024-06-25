import axios from 'axios';

export const costApi = axios.create({
    baseURL: 'http://localhost:5000/costs'
    // baseURL: 'remplazar-urlProduccion'
})