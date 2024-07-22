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

import ProductTable from "./components/ProductTable";
import { deleteProduct, fetchAllProducts } from "../api/apiService";
import { Input } from "@/components/ui/input";


const ProductsPage = () => {
    const [productsList, setProductsList] = useState<Product[]>([]);
    const [availableProducts, setAvailableProducts] = useState<Product[]>([])
    const [outOfStockProducts, setOtuOfStockProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [search, setSearch] = useState("")

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
        setFilteredProducts(productsList);
    }, [productsList]);

    // useEffect(() => {
    //     if (selectedCategory) {
    //         setFilteredProducts(productsList.filter(product => product.category === selectedCategory));
    //     } else {
    //         setFilteredProducts(productsList);
    //     }
    // }, [selectedCategory, productsList]);
    useEffect(() => {
        let filtered = productsList;

        if (selectedCategory) {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        if (search) {
            const searchRegex = new RegExp(search, "i");
            filtered = filtered.filter(product => searchRegex.test(product.name));
        }

        setFilteredProducts(filtered);
    }, [selectedCategory, search, productsList]);

    const handleCategoryFilter = (category: string | null) => {
        setSelectedCategory(category);
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }

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
                                <DropdownMenuLabel>Filtrar por categoría</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem checked={selectedCategory === null} onSelect={() => handleCategoryFilter(null)}>
                                    Todo
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem checked={selectedCategory === "Camisas"} onSelect={() => handleCategoryFilter("Camisas")}>Camisas</DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem checked={selectedCategory === "Camperas"} onSelect={() => handleCategoryFilter("Camperas")}>Camperas</DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem checked={selectedCategory === "Pantalones"} onSelect={() => handleCategoryFilter("Pantalones")}>Pantalones</DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>Otros</DropdownMenuCheckboxItem>
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
                        <Card>
                            <CardHeader className="grid grid-cols-2">
                                <div>
                                    <CardTitle>Productos</CardTitle>
                                    <CardDescription>
                                        Visualiza los productos registrados.
                                    </CardDescription>
                                </div>
                                <div className="ml-auto flex-1 md:grow-0">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Buscar..."
                                        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                                        value={search}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                            </CardHeader>
                            <CardContent>
                                {/* <ProductTable products={productsList} handleDeleteProduct={handleDeleteProduct} /> */}
                                <ProductTable products={filteredProducts} handleDeleteProduct={handleDeleteProduct} />
                            </CardContent>
                            <CardFooter>
                            <div className="text-xs text-muted-foreground">
                                Mostrando <strong>{`${filteredProducts.length}`}</strong>{" "}
                                producto{filteredProducts.length > 1 ? "s" : ""}
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
                                {selectedCategory === "Camisas" ? (
                                    <ProductTable products={availableProducts.filter(product => product.category === "Camisas")} handleDeleteProduct={handleDeleteProduct} />
                                ) :
                                selectedCategory === "Camperas" ? (
                                    <ProductTable products={availableProducts.filter(product => product.category === "Camperas")} handleDeleteProduct={handleDeleteProduct} />
                                ) :
                                selectedCategory === "Pantalones" ? (
                                    <ProductTable products={availableProducts.filter(product => product.category === "Pantalones")} handleDeleteProduct={handleDeleteProduct} />
                                ) :
                                (
                                    <ProductTable products={availableProducts} handleDeleteProduct={handleDeleteProduct} />
                                )}
                                {/* <ProductTable products={availableProducts} handleDeleteProduct={handleDeleteProduct} /> */}
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
                                {selectedCategory === "Camisas" ? (
                                    <ProductTable products={outOfStockProducts.filter(product => product.category === "Camisas")} handleDeleteProduct={handleDeleteProduct} />
                                ) :
                                selectedCategory === "Camperas" ? (
                                    <ProductTable products={outOfStockProducts.filter(product => product.category === "Camperas")} handleDeleteProduct={handleDeleteProduct} />
                                ) :
                                selectedCategory === "Pantalones" ? (
                                    <ProductTable products={outOfStockProducts.filter(product => product.category === "Pantalones")} handleDeleteProduct={handleDeleteProduct} />
                                ) :
                                (
                                    <ProductTable products={outOfStockProducts} handleDeleteProduct={handleDeleteProduct} />
                                )}
                                {/* <ProductTable products={outOfStockProducts} handleDeleteProduct={handleDeleteProduct} /> */}
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