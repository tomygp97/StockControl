import axios from 'axios';

//! BORRAR
export const variantApi = axios.create({
    baseURL: 'http://localhost:5000/products/:productId/variants'
    // baseURL: 'remplazar-urlProduccion'
})