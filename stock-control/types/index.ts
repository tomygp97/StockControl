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
    product: Product;
    variant: Variant;
    customer: {
        name: string;
        contact?: string;
        phone?: number;
    };
    quantitySold: number;
    totalPrice: number;
    paymentDetails: {
        method: 'Efectivo' | 'Transferencia' | 'Mercadopago';
    };
    bill: boolean;
    status: 'Pendiente' | 'Completado' | 'Cancelada';
    date: string; // Assuming date is stored as a string
    createdAt: string;
    updatedAt: string;
    __v: number;
}