import { AxiosError } from 'axios';
// Apis
import { costApi } from './costApi';
import { saleApi } from './saleApi';
import { productApi } from './productApi';
import { variantApi } from './variantApi';
import { customerApi } from './customerApi';
// Types
import { Product, Variant } from '@/types';

type ProductUpdate = Omit<Product, 'quantityInStock' | 'createdAt' | 'updatedAt' | 'variants'>;


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

export const createProduct = async(product: Product) => {
    try {
        const response = await productApi.post('/', product);
        const newProduct = response.data.newProduct;

        if( response.status === 201 && newProduct && newProduct._id) {
            return { product: newProduct };
        } else {
            console.error('Error: La respuesta no contiene un producto válido o el estado no es 201');
            return null;
        }
    } catch (error) {
        console.log("Error en el catch: ", error);
        return null;
    }
}

export const updateProduct = async(productId: string, newData: ProductUpdate) => {
    try {
        const response = await productApi.put(`/${productId}`, {...newData});
        const updatedProduct = response.data.product;
        if ( response.status === 200 && updatedProduct ) {
            return { product: updatedProduct }
        } else {
            throw new Error( response.data.msg || 'No se pudo actualizar el producto');
        }
    } catch (error) {
        console.log("Error modificando Producto", error);
    }
}

export const deleteProduct = async(productId: string) => {
    try {
        const response = await productApi.delete(`/${productId}`);
        if ( response.status === 200 ) {
            return response.data.product
        } else {
            throw new Error( response.data.msg || 'No se pudo eliminar el producto');
        }
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
        console.log("Error creando Variante", error)
    }
}

export const deleteVariant = async(productId: string, variantId: string) => {
    try {
        const response = await productApi.delete(`/${productId}/variants/${variantId}`);
        if (response.status === 200) {
            response.data.variant
        } else {
            throw new Error( response.data.msg || 'No se pudo eliminar la variante');
        }
    } catch (error) {
        console.log(error);
    }
}

//* Customers
export const fetchAllCustomers = async() => {
    try {
        const response = await customerApi.get('/');
        return response.data.customers;
    } catch (error) {
        console.log(error);
    }
}

//* Sales
export const fetchAllSales = async() => {
    try {
        const response = await saleApi.get('/');
        return response.data.sales
    } catch (error) {
        console.log(error);
    }
}

export const fetchSingleSale = async(saleId: string) => {
    try {
        const response = await saleApi.get(`/${saleId}`);        
        return response.data.sale
    } catch (error) {
        console.log(error);
    }
}