// const exampleSales = [
//     {
//         _id: '60d5ec49f4d2b1b8b79f7e4e',
//         product: '60d5ec49f4d2b1b8b79f7e4a',  // Ejemplo de ObjectId
//         variant: '60d5ec49f4d2b1b8b79f7e4b',  // Ejemplo de ObjectId
//         customer: {
//             name: 'Tomas Gutierrez',
//             contact: 'tomas@example.com',
//             phone: 123456789,
//         },
//         quantitySold: 2,
//         totalPrice: 35000,
//         paymentDetails: {
//             method: 'Transferencia',
//         },
//         bill: true,
//         status: 'Completado',
//         date: new Date('2024-06-28'),
//     },
//     {
//         _id: '60d5ec49f4d2b1b8b79f7e4f',
//         product: '60d5ec49f4d2b1b8b79f7e4c',
//         variant: '60d5ec49f4d2b1b8b79f7e4d',
//         customer: {
//             name: 'Maria Perez',
//             contact: 'maria@example.com',
//             phone: 987654321,
//         },
//         quantitySold: 1,
//         totalPrice: 45000,
//         paymentDetails: {
//             method: 'Mercadopago',
//         },
//         bill: true,
//         status: 'Completado',
//         date: new Date('2024-06-27'),
//     },
//     {
//         _id: '60d5ec49f4d2b1b8b79f7e50',
//         product: '60d5ec49f4d2b1b8b79f7e4e',
//         variant: '60d5ec49f4d2b1b8b79f7e4f',
//         customer: {
//             name: 'Juan Lopez',
//             contact: 'juan@example.com',
//             phone: 1122334455,
//         },
//         quantitySold: 3,
//         totalPrice: 30000,
//         paymentDetails: {
//             method: 'Efectivo',
//         },
//         bill: false,
//         status: 'Pendiente',
//         date: new Date('2024-06-26'),
//     },
//     {
//         _id: '60d5ec49f4d2b1b8b79f7e51',
//         product: '60d5ec49f4d2b1b8b79f7e4g',
//         variant: '60d5ec49f4d2b1b8b79f7e4h',
//         customer: {
//             name: 'Laura Rodriguez',
//             contact: 'laura@example.com',
//             phone: 2233445566,
//         },
//         quantitySold: 5,
//         totalPrice: 75000,
//         paymentDetails: {
//             method: 'Transferencia',
//         },
//         bill: true,
//         status: 'Completado',
//         date: new Date('2024-06-25'),
//     },
//     {
//         _id: '60d5ec49f4d2b1b8b79f7e52',
//         product: '60d5ec49f4d2b1b8b79f7e4i',
//         variant: '60d5ec49f4d2b1b8b79f7e4j',
//         customer: {
//             name: 'Carlos Martinez',
//             contact: 'carlos@example.com',
//             phone: 3344556677,
//         },
//         quantitySold: 4,
//         totalPrice: 60000,
//         paymentDetails: {
//             method: 'Mercadopago',
//         },
//         bill: true,
//         status: 'Completado',
//         date: new Date('2024-06-24'),
//     },
// ];

import { Sale } from "@/types";

// export default exampleSales;




const exampleSales: Sale[] = [
    {
        _id: '60d5ec49f4d2b1b8b79f7e4e',
        product: {
            _id: '60d5ec49f4d2b1b8b79f7e4a',
            name: 'Producto 1',
            price: 100,
            quantityInStock: 10,
            category: 'Categoría 1',
            description: 'Descripción del producto 1',
            variants: [
                {
                    _id: '60d5ec49f4d2b1b8b79f7e4b',
                    color: 'Rojo',
                    size: 'M',
                    quantity: 5,
                    availability: 'En stock',
                },
            ],
            customFields: {
                material: 'Algodón',
                garantía: '6 meses',
            },
            createdAt: '2024-06-01T00:00:00.000Z',
            updatedAt: '2024-06-15T00:00:00.000Z',
            __v: 0,
        },
        variant: {
            _id: '60d5ec49f4d2b1b8b79f7e4b',
            color: 'Rojo',
            size: 'M',
            quantity: 5,
            availability: 'En stock',
        },
        customer: {
            name: 'Tomas Gutierrez',
            contact: 'tomas@example.com',
            phone: 123456789,
        },
        quantitySold: 2,
        totalPrice: 35000,
        paymentDetails: {
            method: 'Transferencia',
        },
        bill: true,
        status: 'Completado',
        date: '2024-06-28T00:00:00.000Z',
        createdAt: '2024-06-28T00:00:00.000Z',
        updatedAt: '2024-06-28T00:00:00.000Z',
        __v: 0,
    },
    {
        _id: '60d5ec49f4d2b1b8b79f7e4f',
        product: {
            _id: '60d5ec49f4d2b1b8b79f7e4c',
            name: 'Producto 2',
            price: 200,
            quantityInStock: 15,
            category: 'Categoría 2',
            description: 'Descripción del producto 2',
            variants: [
                {
                    _id: '60d5ec49f4d2b1b8b79f7e4d',
                    color: 'Azul',
                    size: 'L',
                    quantity: 7,
                    availability: 'En stock',
                }
            ],
            customFields: {
                material: 'Poliéster',
                garantía: '1 año',
            },
            createdAt: '2024-06-02T00:00:00.000Z',
            updatedAt: '2024-06-16T00:00:00.000Z',
            __v: 0,
        },
        variant: {
            _id: '60d5ec49f4d2b1b8b79f7e4d',
            color: 'Azul',
            size: 'L',
            quantity: 7,
            availability: 'En stock',
        },
        customer: {
            name: 'Maria Fernandez',
            contact: 'maria@example.com',
            phone: 987654321,
        },
        quantitySold: 3,
        totalPrice: 60000,
        paymentDetails: {
            method: 'Mercadopago',
        },
        bill: true,
        status: 'Completado',
        date: '2024-06-27T00:00:00.000Z',
        createdAt: '2024-06-27T00:00:00.000Z',
        updatedAt: '2024-06-27T00:00:00.000Z',
        __v: 0,
    },
    {
        _id: '60d5ec49f4d2b1b8b79f7e50',
        product: {
            _id: '60d5ec49f4d2b1b8b79f7e4e',
            name: 'Producto 3',
            price: 150,
            quantityInStock: 20,
            category: 'Categoría 3',
            description: 'Descripción del producto 3',
            variants: [
                {
                    _id: '60d5ec49f4d2b1b8b79f7e4f',
                    color: 'Verde',
                    size: 'S',
                    quantity: 10,
                    availability: 'En stock',
                }
            ],
            customFields: {
                material: 'Lana',
                garantía: '3 meses',
            },
            createdAt: '2024-06-03T00:00:00.000Z',
            updatedAt: '2024-06-17T00:00:00.000Z',
            __v: 0,
        },
        variant: {
            _id: '60d5ec49f4d2b1b8b79f7e4f',
            color: 'Verde',
            size: 'S',
            quantity: 10,
            availability: 'En stock',
        },
        customer: {
            name: 'Carlos Perez',
            contact: 'carlos@example.com',
            phone: 1122334455,
        },
        quantitySold: 1,
        totalPrice: 15000,
        paymentDetails: {
            method: 'Efectivo',
        },
        bill: false,
        status: 'Pendiente',
        date: '2024-06-26T00:00:00.000Z',
        createdAt: '2024-06-26T00:00:00.000Z',
        updatedAt: '2024-06-26T00:00:00.000Z',
        __v: 0,
    },
    {
        _id: '60d5ec49f4d2b1b8b79f7e51',
        product: {
            _id: '60d5ec49f4d2b1b8b79f7e50',
            name: 'Producto 4',
            price: 250,
            quantityInStock: 12,
            category: 'Categoría 4',
            description: 'Descripción del producto 4',
            variants: [
                {
                    _id: '60d5ec49f4d2b1b8b79f7e51',
                    color: 'Amarillo',
                    size: 'XL',
                    quantity: 6,
                    availability: 'En stock',
                }
            ],
            customFields: {
                material: 'Seda',
                garantía: '2 años',
            },
            createdAt: '2024-06-04T00:00:00.000Z',
            updatedAt: '2024-06-18T00:00:00.000Z',
            __v: 0,
        },
        variant: {
            _id: '60d5ec49f4d2b1b8b79f7e51',
            color: 'Amarillo',
            size: 'XL',
            quantity: 6,
            availability: 'En stock',
        },
        customer: {
            name: 'Laura Gomez',
            contact: 'laura@example.com',
            phone: 5566778899,
        },
        quantitySold: 2,
        totalPrice: 50000,
        paymentDetails: {
            method: 'Efectivo',
        },
        bill: true,
        status: 'Completado',
        date: '2024-06-25T00:00:00.000Z',
        createdAt: '2024-06-25T00:00:00.000Z',
        updatedAt: '2024-06-25T00:00:00.000Z',
        __v: 0,
    },
    {
        _id: '60d5ec49f4d2b1b8b79f7e52',
        product: {
            _id: '60d5ec49f4d2b1b8b79f7e52',
            name: 'Producto 5',
            price: 300,
            quantityInStock: 8,
            category: 'Categoría 5',
            description: 'Descripción del producto 5',
            variants: [
                {
                    _id: '60d5ec49f4d2b1b8b79f7e53',
                    color: 'Negro',
                    size: 'M',
                    quantity: 4,
                    availability: 'En stock',
                }
            ],
            customFields: {
                material: 'Cuero',
                garantía: '5 años',
            },
            createdAt: '2024-06-05T00:00:00.000Z',
            updatedAt: '2024-06-19T00:00:00.000Z',
            __v: 0,
        },
        variant: {
            _id: '60d5ec49f4d2b1b8b79f7e53',
            color: 'Negro',
            size: 'M',
            quantity: 4,
            availability: 'En stock',
        },
        customer: {
            name: 'Pedro Ramirez',
            contact: 'pedro@example.com',
            phone: 7788990011,
        },
        quantitySold: 1,
        totalPrice: 30000,
        paymentDetails: {
            method: 'Transferencia',
        },
        bill: true,
        status: 'Completado',
        date: '2024-06-24T00:00:00.000Z',
        createdAt: '2024-06-24T00:00:00.000Z',
        updatedAt: '2024-06-24T00:00:00.000Z',
        __v: 0,
    }
    
    // Añade más ventas de ejemplo aquí con la misma estructura
];

export default exampleSales;
