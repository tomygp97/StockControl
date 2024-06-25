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