'use client'

import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
import {
    Eye,
    File,
    Home,
    LineChart,
    ListFilter,
    MoreHorizontal,
    Package,
    Package2,
    PanelLeft,
    Pencil,
    PlusCircle,
    Search,
    Settings,
    ShoppingCart,
    Trash,
    Users2,
} from "lucide-react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
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
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input"

import { Product } from "@/types";
//! DATA DE PRUEBA
import products from "./data/products";

import ProductTable from "./components/ProductTable";
import { fetchAllProducts } from "../api/apiService";


const ProductsPage = () => {

    const [productsList, setProductsList] = useState<Product[]>([]);
    console.log(productsList);

    // const fetchProductsData = async() => {
    //     try {
    //         const productsData = await fetchAllProducts();
    //         setProductsList(productsData);
    //     } catch (error) {
            
    //     }
    // }

    // useEffect(() => {
    //     fetchProductsData();
    // }, [])
    
    useEffect(() => {

        setProductsList(products)
    }, [])
    

    return (
        <div className="flex flex-col sm:gap-4 sm:py-4">
            <div className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            </div>
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <Tabs defaultValue="all">
                    <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="all">Todos</TabsTrigger>
                        <TabsTrigger value="active">Disponibles</TabsTrigger>
                        <TabsTrigger value="draft">Agotados</TabsTrigger>
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
                        <Button size="sm" className="h-8 gap-1">
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
                            Mostrando <strong>5</strong> de <strong>20</strong>{" "}
                            productos
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