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
import { PlusCircle } from "lucide-react";

import { fetchAllProducts } from "@/app/api/apiService";

// Types
import { Product, Variant } from "@/types";
import ProductTable from "@/app/products/components/ProductTable";



const SelectProductSold = () => {
    const [productsList, setProductsList] = useState<Product[]>([]);
    const [variantsList, setVariantsList ] = useState<Variant[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Product[] | []>([]);

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

    return (
        <Table>
            <TableCaption>Lista de los productos Vendidos</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead>Color</TableHead>
                    <TableHead>Talle</TableHead>
                    <TableHead className="text-right">Cantidad</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                { selectedProducts.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={4}>No hay productos disponibles</TableCell>
                    </TableRow>
                ) : (
                    selectedProducts.map((product) => (
                        <TableRow key={product._id}>
                            <TableCell className="font-semibold">
                                {product.name}
                            </TableCell>
                        </TableRow>
                    )
                ))}
            </TableBody>
            <TableFooter>
                {/* <div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                Agregar producto
                                <PlusCircle className="ml-2 h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Lista de Productos</DialogTitle>
                                <DialogDescription>
                                    Selecciona el producto vendido.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogContent>
                            </DialogContent>
                        </DialogContent>
                    </Dialog>
                </div> */}
            </TableFooter>
        </Table>
    )
}

export default SelectProductSold