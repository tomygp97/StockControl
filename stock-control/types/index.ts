const mongoose = require('mongoose');

export interface Variant {
    _id?: string;
    color: string;
    size: string;
    quantity: number;
    availability?: string;
}

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
        variants: {
            variant: Variant;
            quantitySold: number;
        }[];
        totalProductPrice: number;
        totalQuantitySold: number;
    }[];
    customer: Customer;
    paymentDetails: {
        method: 'Efectivo' | 'Transferencia' | 'Mercadopago';
    };
    bill: boolean;
    status: 'Pendiente' | 'Completado' | 'Cancelada';
    totalPrice: number;
    date: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}


export interface Customer {
    _id?: string;
    name: string;
    contact?: string;
    phone?: number;
    email?: string | undefined;
    address?: string | undefined;
    notes?: string | undefined;
}