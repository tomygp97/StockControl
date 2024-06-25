import { AxiosError } from 'axios';
// Apis
import { costApi } from './costApi';
import { saleApi } from './saleApi';
import { productApi } from './productApi';
import { variantApi } from './variantApi';
// Types
import { Product } from '@/types';
import { Variant } from '@/types';


export const fetchAllProducts = async() => {
    try {
        const response = await productApi.get('/');
        return response.data.products
    } catch (error) {
        console.log(error);
    }
}