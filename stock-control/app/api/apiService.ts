import { AxiosError } from 'axios';
// Apis
import { costApi } from './costApi';
import { saleApi } from './saleApi';
import { productApi } from './productApi';
import { variantApi } from './variantApi';
// Types
import { Product } from '@/types';
import { Variant } from '@/types';

//* Products
export const fetchAllProducts = async() => {
    try {
        const response = await productApi.get('/');
        return response.data.products
    } catch (error) {
        console.log(error);
    }
}

export const fetchSingleProduct = async(productId: string) => {
    try {
        const response = await productApi.get(`/${productId}`);        
        return response.data.product
    } catch (error) {
        console.log(error);
    }
}

//* Variants
export const fetchAllVariantsByProductId = async(productId: string) => {
    try {
        const response = await productApi.get(`/${productId}/variants`);
        return response.data.variants
    } catch (error) {
        console.log(error);
    }
}

export const createVariant = async(productId: string, variant: Variant) => {
    try {
        const response = await productApi.post(`/${productId}/variants`, variant);
        const newVariant = response.data.variant;

        if( response.status === 201 && newVariant && newVariant._id) {
            return newVariant
        }
    } catch (error) {
        console.log("Error desde createVariant: ", error)
    }
}