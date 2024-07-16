import { createContext, useContext, useState } from "react";
import { Product } from "@/types";

interface ProductContextProps {
    productData: Product;
    setProductData: React.Dispatch<React.SetStateAction<Product>>;
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProductContext debe usarse dentro de un ProductProvider');
    }
    return context;
};

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
    const [productData, setProductData] = useState<Product>({
        name: '',
        category: '',
        description: '',
        price: 0,
        quantityInStock: 0,
        variants: [],
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    return (
        <ProductContext.Provider value={{ productData, setProductData }}>
            {children}
        </ProductContext.Provider>
    );
};
