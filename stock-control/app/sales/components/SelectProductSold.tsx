'use client'


import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Check, PlusCircle, Send, ShoppingCart } from "lucide-react";

import { fetchAllProducts } from "@/app/api/apiService";

// Types
import { Product, Variant } from "@/types";


interface SelectProductSoldProps {
    onSelectProduct: (productIds: string[]) => void;
}

const SelectProductSold: React.FC<SelectProductSoldProps> = ({ onSelectProduct }) => {
    const [productsList, setProductsList] = useState<Product[]>([]);
    const [availableProducts, setAvailableProducts] = useState<Product[]>([])
    // const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
    // const [selectedProducts, setSelectedProducts] = useState<Product[] | []>([]);
    // console.log("selectedProducts: ", selectedProducts)

    const fetchProductsData = async() => {
        try {
            const productsData = await fetchAllProducts();
            setProductsList(productsData)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProductsData();
    }, [])

    useEffect(() => {
        setAvailableProducts(productsList.filter((product) => product.quantityInStock > 0));
    }, [productsList])

    // const handleProductSelect = (productId: string) => {
    //     setSelectedProductId(productId);
    //     onSelectProduct(productId);
    // };
    const handleProductSelect = (productId: string) => {
        setSelectedProductIds(prevSelectedProductIds => {
            const isSelected = prevSelectedProductIds.includes(productId);
            const updatedSelectedProductIds = isSelected
                ? prevSelectedProductIds.filter(id => id !== productId)
                : [...prevSelectedProductIds, productId];
            
            onSelectProduct(updatedSelectedProductIds);
            return updatedSelectedProductIds;
        });
    };


    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="sm:table-cell">Nombre</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="hidden md:table-cell">
                        Precio
                    </TableHead>
                    <TableHead>
                        <span className="sr-only">Vender</span>
                    </TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
            {
                availableProducts.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                            No hay productos
                        </TableCell>
                    </TableRow>
                ) :
                availableProducts.map((product) => (
                    <TableRow key={product._id}>
                        <TableCell className="font-medium">
                            { product.name }
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                            { product.category }
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                            ${ product.price }
                        </TableCell>
                        <TableCell className="flex justify-end">
                            <Button variant="outline" size="icon" className="relative w-10 h-10 transition-all duration-300" onClick={() => handleProductSelect(product._id!)}>
                            <div
                                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${selectedProductIds.includes(product._id!) ? 'opacity-100' : 'opacity-0'}`}
                            >
                                <Check className="w-6 h-6 text-green-500" />
                            </div>
                            <div
                                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${selectedProductIds.includes(product._id!) ? 'opacity-0' : 'opacity-100'}`}
                            >
                                <ShoppingCart className="w-4 h-4 text-black" />
                            </div>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))
            }
            </TableBody>
                {/* //TODO Add pagination */}
        </Table>
    )
}

export default SelectProductSold