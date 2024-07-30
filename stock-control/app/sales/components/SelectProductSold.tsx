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
import { PlusCircle, Send, ShoppingCart } from "lucide-react";

import { fetchAllProducts } from "@/app/api/apiService";

// Types
import { Product, Variant } from "@/types";




const SelectProductSold = () => {
    const [productsList, setProductsList] = useState<Product[]>([]);
    const [availableProducts, setAvailableProducts] = useState<Product[]>([])
    const [variantsList, setVariantsList ] = useState<Variant[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Product[] | []>([]);
    console.log("selectedProducts: ", selectedProducts)

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
        // setAvailableProducts();
        setAvailableProducts(productsList.filter((product) => product.quantityInStock > 0));

    }, [productsList])


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
                            <Button variant="outline" size="icon">
                                <ShoppingCart className="w-4 h-4"/>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))
            }
            </TableBody>
            <TableFooter className=" grid grid-cols-2 gap-4">
                {/* //TODO Add pagination */}
                <Button variant="outline">Prev</Button>
                <Button variant="outline">Next</Button>
            </TableFooter>
        </Table>
    )
}

export default SelectProductSold