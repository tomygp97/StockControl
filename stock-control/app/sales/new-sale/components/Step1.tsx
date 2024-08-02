'use client'


import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
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
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import SelectProductSold from "../../components/SelectProductSold";
import { useProductContext } from "../../context/ProductContext";
import { useRouter } from "next/navigation";
import { Check, ShoppingCart } from "lucide-react";
import { fetchAllProducts } from "@/app/api/apiService";

// Types
import { Product } from "@/types";

const formSchema = z.object({
    productsSold: z.array(
        z.object({
            productId: z.string().min(1, { message: "Producto es requerido" }),
        })
    ).min(1, { message: "Al menos un producto debe ser vendido" }),
});

const Step1 = () => {
    // const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
    const [productsList, setProductsList] = useState<Product[]>([]);
    const [availableProducts, setAvailableProducts] = useState<Product[]>([])
    const { toast } = useToast();
    const router = useRouter();

    const productContext = useProductContext();
    const { selectedProductIds, addProduct, removeProduct } = productContext;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            productsSold: [],
        }
    });
    
    const onSubmit = (data: z.infer<typeof formSchema>) => {
        // Manejar el envío del formulario
        console.log("Form data:", data);
    };

    const handleAddProduct = () => {
        selectedProductIds.forEach((productId) => {
            // console.log(`Adding product: ${productId}`);
            productContext.addProduct(productId);
        });
    };

    const handleContinue = () => {
        try {
            if (selectedProductIds.length === 0) { 
                toast({
                    description: "Debe seleccionar al menos un producto",
                    variant: "destructive",
                });
                return;
            }
            
            handleAddProduct();
            form.handleSubmit(onSubmit)();
            router.push('/sales/new-sale?step=step2');
        } catch (error) {
            console.log(error)
        }
    }

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

    const handleProductSelect = (productId: string) => {
        if (selectedProductIds.includes(productId)) {
            removeProduct(productId);
        } else {
            addProduct(productId);
        }
    };


    return (
        <div className="mx-7">
            <div className="text-xl font-semibold tracking-tight mb-4">
                Ingresar Nueva Venta
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Producto</CardTitle>
                    <CardDescription>
                        Seleccione el producto vendido.
                    </CardDescription>
                </CardHeader>
                <CardContent>
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
                </CardContent>
            </Card>
            <div className="flex justify-end mt-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        {/* <Link href="/sales/new-sale?step=step2"> */}
                        <Button type="submit" size="sm" onClick={handleContinue}>
                            Continuar
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Step1