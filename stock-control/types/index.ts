const mongoose = require('mongoose');

export interface Variant {
    _id?: string;
    color: string;
    size: string;
    quantity: number;
    availability?: string;
}

// export interface Product {
//     _id: string;
//     name: string;
//     price: number;
//     quantityInStock: number;
//     category: string;
//     description: string;
//     variants: Variant[];
//     customFields: {
//         material: string;
//         garantía: string;
//     };
//     createdAt: string;
//     updatedAt: string;
//     __v: number;
// }
export interface Product {
    _id?: string;
    name: string;
    price: number;
    quantityInStock: number;
    category: string;
    description?: string; // El campo es opcional
    // variants: mongoose.Schema.Types.ObjectId[]; // Puedes ajustar el tipo según tu esquema
    variants: string[]; // Puedes ajustar el tipo según tu esquema
    customFields?: Record<string, any>; // Puedes usar cualquier tipo para customFields
    createdAt: Date;
    updatedAt: Date;
}

export interface Sale {
    _id: string;
    productsSold: {
        product: Product;
        variant: Variant;
        // product: string;
        // variant: string;
        quantitySold: number;
        totalPrice: number;
    }[];
    customer: {
        name: string;
        contact?: string;
        phone?: number;
        email?: string | undefined;
        address?: string | undefined;
        notes?: string | undefined;
    };
    paymentDetails: {
        method: 'Efectivo' | 'Transferencia' | 'Mercadopago';
    };
    bill: boolean;
    status: 'Pendiente' | 'Completado' | 'Cancelada';
    date: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}