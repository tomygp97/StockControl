import { Sale, Product, Variant } from "@/types";

const products: Product[] = [
    {
        _id: "666652fef0f04f52a17452fe",
        name: "Taladro Inalámbrico",
        price: 4999,
        quantityInStock: 50,
        category: "Herramientas",
        description: "Taladro inalámbrico de 20V con batería y cargador incluidos.",
        variants: [
            {
                _id: "66665324f0f04f52a1745302",
                color: "Rojo",
                size: "Mediano",
                quantity: 30,
                availability: "En stock",
            },
        ],
        customFields: {
            material: "Metal y plástico",
            garantía: "2 años",
        },
        createdAt: "2024-06-01T12:00:00.000Z",
        updatedAt: "2024-07-01T12:00:00.000Z",
        __v: 0,
    },
    {
        _id: "666653a9f0f04f52a1745311",
        name: "Amoladora Angular",
        price: 1999.99,
        quantityInStock: 100,
        category: "Herramientas",
        description: "Amoladora angular de 115mm con disco de corte.",
        variants: [
            {
                _id: "666653bff0f04f52a1745314",
                color: "Negro",
                size: "Grande",
                quantity: 50,
                availability: "En stock",
            },
        ],
        customFields: {
            material: "Metal",
            garantía: "1 año",
        },
        createdAt: "2024-06-01T12:00:00.000Z",
        updatedAt: "2024-07-01T12:00:00.000Z",
        __v: 0,
    },
    {
        _id: "666652fef0f04f52a17452f1",
        name: "Lijadora Orbital",
        price: 1499.99,
        quantityInStock: 80,
        category: "Herramientas",
        description: "Lijadora orbital con velocidad ajustable y recolección de polvo.",
        variants: [
            {
                _id: "66665324f0f04f52a1745300",
                color: "Azul",
                size: "Pequeño",
                quantity: 60,
                availability: "En stock",
            },
        ],
        customFields: {
            material: "Metal y plástico",
            garantía: "1 año",
        },
        createdAt: "2024-06-01T12:00:00.000Z",
        updatedAt: "2024-07-01T12:00:00.000Z",
        __v: 0,
    },
    {
        _id: "666652fef0f04f52a17452f2",
        name: "Sierra Circular",
        price: 2999.99,
        quantityInStock: 40,
        category: "Herramientas",
        description: "Sierra circular de 7 pulgadas con hoja de corte y guía láser.",
        variants: [
            {
                _id: "66665324f0f04f52a1745301",
                color: "Verde",
                size: "Grande",
                quantity: 20,
                availability: "En stock",
            },
            {
                _id: "66665324f0f04f52a1745302",
                color: "Negro",
                size: "Mediano",
                quantity: 20,
                availability: "En stock",
            },
        ],
        customFields: {
            material: "Metal",
            garantía: "3 años",
        },
        createdAt: "2024-06-01T12:00:00.000Z",
        updatedAt: "2024-07-01T12:00:00.000Z",
        __v: 0,
    },
    {
        _id: "666652fef0f04f52a17452f3",
        name: "Compresor de Aire",
        price: 4999.99,
        quantityInStock: 30,
        category: "Herramientas",
        description: "Compresor de aire portátil de 2HP con tanque de 24 litros.",
        variants: [
            {
                _id: "66665324f0f04f52a1745303",
                color: "Rojo",
                size: "Grande",
                quantity: 15,
                availability: "En stock",
            },
        ],
        customFields: {
            material: "Metal",
            garantía: "2 años",
        },
        createdAt: "2024-06-01T12:00:00.000Z",
        updatedAt: "2024-07-01T12:00:00.000Z",
        __v: 0,
    },
    {
        _id: "666652fef0f04f52a17452f4",
        name: "Soldadora Inverter",
        price: 4999.99,
        quantityInStock: 25,
        category: "Herramientas",
        description: "Soldadora inverter de 200A con tecnología IGBT.",
        variants: [
            {
                _id: "66665324f0f04f52a1745304",
                color: "Negro",
                size: "Grande",
                quantity: 10,
                availability: "En stock",
            },
            {
                _id: "66665324f0f04f52a1745305",
                color: "Amarillo",
                size: "Mediano",
                quantity: 15,
                availability: "En stock",
            },
        ],
        customFields: {
            material: "Metal",
            garantía: "3 años",
        },
        createdAt: "2024-06-01T12:00:00.000Z",
        updatedAt: "2024-07-01T12:00:00.000Z",
        __v: 0,
    },
];

const exampleSales: Sale[] = [
    {
        customer: {
            name: "Empresa de construcción S.R.L",
            contact: "Tomas Gutierrez",
            phone: 1234567890
        },
        paymentDetails: {
            method: "Mercadopago"
        },
        _id: "6685566425338a2991713dd9",
        productsSold: [
            {
                product: products[0],
                variant: products[0].variants[0],
                quantitySold: 3,
                totalPrice: 14997,
            },
            {
                product: products[1],
                variant: products[1].variants[0],
                quantitySold: 3,
                totalPrice: 5999.97,
            }
        ],
        bill: true,
        status: "Pendiente",
        date: "2024-07-03T13:47:16.536Z",
        createdAt: "2024-07-03T13:47:16.543Z",
        updatedAt: "2024-07-03T13:47:16.543Z",
        __v: 0
    },
    {
        _id: "6685566425338a2991713ddd",
        productsSold: [
            {
                product: products[2],
                variant: products[2].variants[0],
                quantitySold: 2,
                totalPrice: 2999.98,
            },
        ],
        customer: {
            name: "Juan Perez",
            contact: "juan.perez@example.com",
            phone: 9876543210,
        },
        paymentDetails: {
            method: "Efectivo",
        },
        bill: false,
        status: "Completado",
        date: "2024-07-03T15:00:00.000Z",
        createdAt: "2024-07-03T15:00:00.000Z",
        updatedAt: "2024-07-03T15:00:00.000Z",
        __v: 0,
    },
    {
        _id: "6685566425338a2991713dde",
        productsSold: [
            {
                product: products[3],
                variant: products[3].variants[0],
                quantitySold: 1,
                totalPrice: 1499.99,
            },
            {
                product: products[3],
                variant: products[3].variants[1],
                quantitySold: 2,
                totalPrice: 2999.98,
            },
        ],
        customer: {
            name: "Maria Lopez",
            contact: "maria.lopez@example.com",
            phone: 1231231234,
        },
        paymentDetails: {
            method: "Transferencia",
        },
        bill: true,
        status: "Pendiente",
        date: "2024-07-03T16:00:00.000Z",
        createdAt: "2024-07-03T16:00:00.000Z",
        updatedAt: "2024-07-03T16:00:00.000Z",
        __v: 0,
    },
    {
        _id: "6685566425338a2991713ddf",
        productsSold: [
            {
                product: products[4],
                variant: products[4].variants[0],
                quantitySold: 1,
                totalPrice: 4999.99,
            },
            {
                product: products[5],
                variant: products[5].variants[0],
                quantitySold: 2,
                totalPrice: 9999.98,
            },
            {
                product: products[5],
                variant: products[5].variants[1],
                quantitySold: 1,
                totalPrice: 4999.99,
            },
        ],
        customer: {
            name: "Carlos Ramirez",
            contact: "carlos.ramirez@example.com",
            phone: 5555555555,
        },
        paymentDetails: {
            method: "Mercadopago",
        },
        bill: false,
        status: "Completado",
        date: "2024-07-03T17:00:00.000Z",
        createdAt: "2024-07-03T17:00:00.000Z",
        updatedAt: "2024-07-03T17:00:00.000Z",
        __v: 0,
    },
];

export default exampleSales;
