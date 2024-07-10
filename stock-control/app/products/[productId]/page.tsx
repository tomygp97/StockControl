'use client'


import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, PlusCircle } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import VariantTable from "../components/VariantTable";
import { createVariant, fetchAllVariantsByProductId, fetchSingleProduct } from "@/app/api/apiService";

// Types
import { Product, Variant } from "@/types";
import { useForm } from "react-hook-form";
import VariantCard from "../components/VariantCard";
import ProductCard from "../components/ProductCard";

const ProductSchema = z.object({
    name: z.string().min(1, { message: "Nombre es requerido" }),
    category: z.string().min(1, { message: "Categoría es requerida" }),
    description: z.string().min(1, { message: "Descripción es requerida" }),
    price: z.number().min(1, { message: "El precio es requerido" }),
    quantityInStock: z.number().min(1, { message: "La Cantidad en Stock es requerida" }),
    variantsId: z.array(z.string()),
});

    //! Dentro de VariantCard
// const VariantSchema = z.object({
//     color: z.string().min(1, { message: "Color es requerido" }),
//     size: z.string().min(1, { message: "Talle es requerido" }),
//     quantity: z.number().min(0, { message: "La Cantidad es requerida" }),
// });


const EditProduct = () => {
    const pathName = usePathname();
    const productId = pathName.split("/products/").join("");

    const [productData, setProductData] = useState({} as Product);
    const [variantsData, setVariantsData] = useState<Variant[] | undefined>();
    const [newVariant, setNewVariant] = useState({} as Variant);

    const fetchProductData = async() => {
        try {
            const productData = await fetchSingleProduct(productId);
            setProductData(productData);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchVariantData = async() => {
        try {
            const variantData = await fetchAllVariantsByProductId(productId);
            setVariantsData(variantData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (productId) {
            fetchProductData();
            fetchVariantData();
        }
    }, [productId]);

    const handleAddNewVariant = (event: React.FormEvent) => {
        event?.preventDefault();
        const newVariant = {
            color: (document.getElementById("color") as HTMLInputElement).value,
            size: (document.getElementById("size") as HTMLInputElement).value,
            stock: (document.getElementById("quantity") as HTMLInputElement).value,
        };
        console.log("Variante creada con los datos:", newVariant);
    };

    const productsForm = useForm<z.infer<typeof ProductSchema>>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            name: productData.name,
            category: productData.category,
            description: productData.description,
            price: productData.price,
            quantityInStock: productData.quantityInStock,
            variantsId: [],
        }
    });

    //! Dentro de VariantCard
    // const variantsForm = useForm<z.infer<typeof VariantSchema>>({
    //     resolver: zodResolver(VariantSchema),
    //     defaultValues: {
    //         color: "",
    //         size: "",
    //         quantity: 0,
    //     }
    // });
    
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className=" flex flex-col sm:gap-4 sm:py-4">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-border px-4 sm_static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Breadcrumb className="hidden md:flex">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/">Inicio</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/products">Productos</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbPage>Editar Producto</BreadcrumbPage>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                        <div className="flex items-center gap-4">
                            <Button variant="outline" size="icon" className="h-7 w-7">
                                <ChevronLeft className="h-4 w-4" />
                                <span className="sr-only">Volver</span>
                            </Button>
                            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                                Editar Producto
                            </h1>
                            { 
                                productData.quantityInStock > 0 ?
                                    <Badge variant="outline" className="ml-auto sm:ml-0">En Stock</Badge>
                                    :
                                    <Badge variant="destructive" className="ml-auto sm:ml-0">Agotado</Badge>
                            }
                            <div className="hidden items-center gap-2 md:ml-auto md:flex">
                                <Button variant="outline" size="sm">
                                    Eliminar
                                </Button>
                                <Button size="sm">Guardar</Button>
                            </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                                {
                                    productData && <ProductCard productData={productData} />
                                }
                                {
                                    variantsData && <VariantCard variantsData={variantsData} />
                                }
                            </div>
                            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            Precio
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6">
                                            <div className="grid gap-3">
                                                <Label htmlFor="status">Venta</Label>
                                                <Input id="price" type="number" className="w-full" defaultValue={productData.price} />
                                            </div>
                                            <div className="grid gap-3">
                                                {/* //TODO: Implementar costos */}
                                                <Label htmlFor="status" className="text-muted-foreground">Compra</Label>
                                                <Input id="cost" type="text" className="w-full" defaultValue="Proximamente..." disabled />
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <div className="text-xs text-muted-foreground">+35% de ganancia</div>
                                    </CardFooter>
                                </Card>
                                <Card className="overflow-hidden">
                                    <CardHeader>
                                        <CardTitle>Detalles Adicionales</CardTitle>
                                        <CardDescription>
                                            informacion adicional sobre el producto
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6">Proximamente...</div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default EditProduct