import { createContext, useContext, useState, ReactNode } from 'react';

// Define los tipos de datos del contexto
interface ProductContextType {
    selectedProductIds: string[];
    addProduct: (productId: string) => void;
    removeProduct: (productId: string) => void;
    productVariants: { [productId: string]: { [variantId: string]: number } };
    addVariant: (productId: string, variantId: string, quantity: number) => void;
    removeVariant: (productId: string, variantId: string) => void;
    saleData: {
        products: string[];
        variants: { [productId: string]: { [variantId: string]: number } };
    };
    finalizeSale: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
    const [productVariants, setProductVariants] = useState<{ [productId: string]: { [variantId: string]: number } }>({})
    const [saleData, setSaleData] = useState<{ products: string[], variants: { [productId: string]: { [variantId: string]: number } } }>({ products: [], variants: {} });

    const addProduct = (productId: string) => {
        // console.log(`Adding product to context: ${productId}`);
        setSelectedProductIds(prevSelectedProductIds => {
            if (!prevSelectedProductIds.includes(productId)) {
                return [...prevSelectedProductIds, productId];
            }
            return prevSelectedProductIds;
        });
    };

    const removeProduct = (productId: string) => {
        setSelectedProductIds(prevSelectedProductIds => prevSelectedProductIds.filter(id => id !== productId));
    };

    const addVariant = (productId: string, variantId: string, quantity: number) => {
        setProductVariants(prevState => ({
            ...prevState,
            [productId]: {
                ...prevState[productId],
                [variantId]: (prevState[productId]?.[variantId] || 0) + quantity
            }
        }))
    }

    const removeVariant = (productId: string, variantId: string) => {
        setProductVariants(prevState => {
            const { [variantId]: _, ...newVariants } = prevState[productId];
            return {
                ...prevState,
                [productId]: newVariants
            };
        });
    }

    const finalizeSale = () => {
        setSaleData({
            products: selectedProductIds,
            variants: productVariants
        });
        console.log('Finalizing sale with data:', {
            products: selectedProductIds,
            variants: productVariants
        });
    };

    return (
        <ProductContext.Provider value={{
            selectedProductIds,
            addProduct,
            removeProduct,
            productVariants,
            addVariant,
            removeVariant,
            saleData,
            finalizeSale
        }}>
            {children}
        </ProductContext.Provider>
    );
}

    export const useProductContext = () => {
        const context = useContext(ProductContext);
        if (context === undefined) {
            throw new Error('useProductContext must be used within a ProductProvider');
        }
        return context;
    };
