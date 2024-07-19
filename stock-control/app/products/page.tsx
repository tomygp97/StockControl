'use client'


import { useEffect, useState } from "react";
import Link from "next/link";
import {
    File,
    ListFilter,
    PlusCircle,
    Search,
} from "lucide-react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Types
import { Product } from "@/types";
//! DATA DE PRUEBA
// import products from "./data/products";

import ProductTable from "./components/ProductTable";
import { deleteProduct, fetchAllProducts } from "../api/apiService";
import { ProductProvider } from "./context/ProductContext";


const ProductsPage = () => {
    const [productsList, setProductsList] = useState<Product[]>([]);
    const [availableProducts, setAvailableProducts] = useState<Product[]>([])
    const [outOfStockProducts, setOtuOfStockProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)

    const { toast } = useToast();

    const fetchProductsData = async() => {
        try {
            setLoading(true);
            const productsData = await fetchAllProducts();
            setProductsList(productsData);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProductsData();
    }, [])

    const handleDeleteProduct = async(id: string) => {
        try {
            setLoading(true);
            await deleteProduct(id);
            toast({
                description: "El producto ha sido eliminado Correctamente",
            });
            fetchProductsData();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    

    useEffect(() => {
        setAvailableProducts(productsList.filter((product) => product.quantityInStock > 0));
        setOtuOfStockProducts(productsList.filter(product => product.quantityInStock === 0));
    }, [productsList]);

    if (loading) return <div className="flex justify-center items-center h-96">Cargando...</div>;

    return (
        <div className="flex flex-col sm:gap-4">
            <main className="grid flex-1 items-start sm:px-6 sm:py-0 md:gap-8">
                <Tabs defaultValue="all">
                    <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="all">Todos</TabsTrigger>
                        <TabsTrigger value="available">Disponibles</TabsTrigger>
                        <TabsTrigger value="outOfStock">Agotados</TabsTrigger>
                    </TabsList>
                    <div className="ml-auto flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-8 gap-1">
                                    <ListFilter className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Filtros
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem checked>
                                    Categoria
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>Disponibilidad</DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                    Archived
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button size="sm" variant="outline" className="h-8 gap-1">
                            <File className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Export
                            </span>
                        </Button>
                        <Link href="/products/new-product">
                            <Button size="sm" className="h-8 gap-1">
                                <PlusCircle className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Nuevo Producto
                                </span>
                            </Button>
                        </Link>
                    </div>
                    </div>
                    <TabsContent value="all">
                        <Card x-chunk="dashboard-06-chunk-0">
                            <CardHeader>
                                <CardTitle>Productos</CardTitle>
                                <CardDescription>
                                    Visualiza los productos registrados.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ProductTable products={productsList} handleDeleteProduct={handleDeleteProduct} />
                            </CardContent>
                            <CardFooter>
                            <div className="text-xs text-muted-foreground">
                                Mostrando <strong>{`${productsList.length}`}</strong>{" "}
                                producto{productsList.length > 1 ? "s" : ""}
                            </div>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="available">
                        <Card x-chunk="dashboard-06-chunk-0">
                            <CardHeader>
                                <CardTitle>Productos Disponibles</CardTitle>
                                <CardDescription>
                                    Visualiza los productos disponibles.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ProductTable products={availableProducts} handleDeleteProduct={handleDeleteProduct} />
                            </CardContent>
                            <CardFooter>
                            <div className="text-xs text-muted-foreground">
                                Mostrando <strong>{`${availableProducts.length}`}</strong>{" "}
                                producto{availableProducts.length > 1 ? "s" : ""}
                            </div>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="outOfStock">
                        <Card x-chunk="dashboard-06-chunk-0">
                            <CardHeader>
                                <CardTitle>Productos Agotados</CardTitle>
                                <CardDescription>
                                    Visualiza los productos agotados.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ProductTable products={outOfStockProducts} handleDeleteProduct={handleDeleteProduct} />
                            </CardContent>
                            <CardFooter>
                            <div className="text-xs text-muted-foreground">
                                Mostrando <strong>{`${outOfStockProducts.length}`}</strong>{" "}
                                producto{outOfStockProducts.length > 1 ? "s" : ""}
                            </div>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}

export default ProductsPage