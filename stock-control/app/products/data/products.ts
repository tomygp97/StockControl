const products = [
    {
        _id: "666652fef0f04f52a17452fe",
        name: "Zapatillas Deportivas",
        price: 4999,
        quantityInStock: 122,
        category: "Calzado",
        description: "Zapatillas deportivas ligeras para correr",
        variants: [
            { _id: "66665324f0f04f52a1745302", color: "Azul", size: "42", quantity: 47, availability: "Disponible" },
            { _id: "6666533af0f04f52a1745309", color: "Negro", size: "38", quantity: 75, availability: "Disponible" },
            { _id: "666858b541d2112c445fecec", color: "Negro", size: "40", quantity: 0, availability: "Agotado" }
        ],
        customFields: { material: "Malla transpirable", garantía: "6 meses" },
        createdAt: "2024-06-10T01:12:30.607Z",
        updatedAt: "2024-06-17T22:44:10.885Z",
        __v: 16
    },
    {
        _id: "777652fef0f04f52a17452ff",
        name: "Camiseta Deportiva",
        price: 1999,
        quantityInStock: 200,
        category: "Ropa",
        description: "Camiseta ligera y transpirable para actividades deportivas",
        variants: [
            { _id: "77765324f0f04f52a1745310", color: "Rojo", size: "M", quantity: 100, availability: "Disponible" },
            { _id: "7776533af0f04f52a1745311", color: "Azul", size: "L", quantity: 100, availability: "Disponible" }
        ],
        customFields: { material: "Poliéster", garantía: "1 año" },
        createdAt: "2024-06-11T02:15:30.607Z",
        updatedAt: "2024-06-18T23:45:10.885Z",
        __v: 12
    },
    {
        _id: "888652fef0f04f52a1745300",
        name: "Pantalones de Entrenamiento",
        price: 2999,
        quantityInStock: 80,
        category: "Ropa",
        description: "Pantalones cómodos y flexibles para entrenamientos intensivos",
        variants: [
            { _id: "88865324f0f04f52a1745312", color: "Negro", size: "L", quantity: 40, availability: "Disponible" },
            { _id: "8886533af0f04f52a1745313", color: "Gris", size: "M", quantity: 40, availability: "Disponible" }
        ],
        customFields: { material: "Algodón y Elastano", garantía: "1 año" },
        createdAt: "2024-06-12T03:18:30.607Z",
        updatedAt: "2024-06-19T24:46:10.885Z",
        __v: 10
    },
    {
        _id: "888652fef0f04f52a1745320",
        name: "Pantalones de Entrenamiento",
        price: 2999,
        quantityInStock: 80,
        category: "Ropa",
        description: "Pantalones cómodos y flexibles para entrenamientos intensivos",
        variants: [
            { _id: "88865324f0f04f52a1745312", color: "Negro", size: "L", quantity: 40, availability: "Disponible" },
            { _id: "8886533af0f04f52a1745313", color: "Gris", size: "M", quantity: 40, availability: "Disponible" }
        ],
        customFields: { material: "Algodón y Elastano", garantía: "1 año" },
        createdAt: "2024-06-12T03:18:30.607Z",
        updatedAt: "2024-06-19T24:46:10.885Z",
        __v: 10
    },
    {
        _id: "888652fef0f04f52a1745600",
        name: "Pantalones de Entrenamiento",
        price: 2999,
        quantityInStock: 80,
        category: "Ropa",
        description: "Pantalones cómodos y flexibles para entrenamientos intensivos",
        variants: [
            { _id: "88865324f0f04f52a1745312", color: "Negro", size: "L", quantity: 40, availability: "Disponible" },
            { _id: "8886533af0f04f52a1745313", color: "Gris", size: "M", quantity: 40, availability: "Disponible" }
        ],
        customFields: { material: "Algodón y Elastano", garantía: "1 año" },
        createdAt: "2024-06-12T03:18:30.607Z",
        updatedAt: "2024-06-19T24:46:10.885Z",
        __v: 10
    },
    {
        _id: "999652fef0f04f52a1445301",
        name: "Gorra Deportiva",
        price: 999,
        quantityInStock: 0,
        category: "Accesorios",
        description: "Gorra ligera con protección UV",
        variants: [
            { _id: "99965324f0f04f52a1745314", color: "Blanco", size: "Única", quantity: 75, availability: "Disponible" },
            { _id: "9996533af0f04f52a1745315", color: "Negro", size: "Única", quantity: 75, availability: "Disponible" }
        ],
        customFields: { material: "Poliéster", garantía: "6 meses" },
        createdAt: "2024-06-13T04:21:30.607Z",
        updatedAt: "2024-06-20T25:47:10.885Z",
        __v: 8
    },
    {
        _id: "000652fef0f04f52a1745302",
        name: "Mochila Deportiva",
        price: 6999,
        quantityInStock: 50,
        category: "Accesorios",
        description: "Mochila espaciosa y resistente para actividades al aire libre",
        variants: [
            { _id: "00065324f0f04f52a1745316", color: "Verde", size: "Grande", quantity: 25, availability: "Disponible" },
            { _id: "0006533af0f04f52a1745317", color: "Negro", size: "Grande", quantity: 25, availability: "Disponible" }
        ],
        customFields: { material: "Nylon", garantía: "2 años" },
        createdAt: "2024-06-14T05:24:30.607Z",
        updatedAt: "2024-06-21T26:48:10.885Z",
        __v: 14
    },
    {
        _id: "111652fef0f04f52a1745303",
        name: "Reloj Deportivo",
        price: 9999,
        quantityInStock: 30,
        category: "Electrónica",
        description: "Reloj con GPS y monitor de ritmo cardíaco",
        variants: [
            { _id: "11165324f0f04f52a1745318", color: "Negro", size: "Única", quantity: 15, availability: "Disponible" },
            { _id: "1116533af0f04f52a1745319", color: "Azul", size: "Única", quantity: 15, availability: "Disponible" }
        ],
        customFields: { material: "Plástico y Metal", garantía: "1 año" },
        createdAt: "2024-06-15T06:27:30.607Z",
        updatedAt: "2024-06-22T27:49:10.885Z",
        __v: 18
    }
];

export default products;
