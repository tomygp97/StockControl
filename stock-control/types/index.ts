export interface Variant {
    _id: string;
    color: string;
    size: string;
    quantity: number;
    availability: string;
}

export interface Product {
    _id: string;
    name: string;
    price: number;
    quantityInStock: number;
    category: string;
    description: string;
    variants: Variant[];
    customFields: {
        material: string;
        garantía: string;
    };
    createdAt: string;
    updatedAt: string;
    __v: number;
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