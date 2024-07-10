'use client'

import { useEffect, useState } from "react";
import {
    File,
    ListFilter,
    PlusCircle,
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

import { Product } from "@/types";
//! DATA DE PRUEBA
// import products from "./data/products";

import ProductTable from "./components/ProductTable";
import { fetchAllProducts } from "../api/apiService";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";


const ProductsPage = () => {
    const router = useRouter();

    const [productsList, setProductsList] = useState<Product[]>([]);
    const [availableProducts, setAvailableProducts] = useState<Product[]>([])
    const [outOfStockProducts, setOtuOfStockProducts] = useState<Product[]>([])
    // console.log("productsList: ", productsList);

    const fetchProductsData = async() => {
        try {
            const productsData = await fetchAllProducts();
            setProductsList(productsData);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProductsData();
    }, [])
    

    useEffect(() => {
        setAvailableProducts(productsList.filter((product) => product.quantityInStock > 0));
        setOtuOfStockProducts(productsList.filter(product => product.quantityInStock === 0));
    }, [productsList]);

    // useEffect(() => {
    //     setProductsList(products);
    //     setAvailableProducts(products.filter((product) => product.quantityInStock > 0));
    //     setOtuOfStockProducts(products.filter(product => product.quantityInStock === 0));
    // }, []);

    const handleNavigateToNewProduct = () => {
        router.push("/products/new-product");
    };

    return (
        <div className="flex flex-col sm:gap-4">
            <div className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            </div>
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
                        <Button size="sm" className="h-8 gap-1" onClick={handleNavigateToNewProduct}>
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Nuevo Producto
                            </span>
                        </Button>
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
                                <ProductTable products={productsList} />
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
                                <ProductTable products={availableProducts} />
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
                                <ProductTable products={outOfStockProducts} />
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