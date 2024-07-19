'use client'


import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { ChevronLeft } from "lucide-react";

import { createVariant, fetchSingleProduct, updateProduct } from "@/app/api/apiService";

// Types
import { Product } from "@/types";

// Components
import VariantCard from "../components/VariantCard";
import ProductCard from "../components/ProductCard";

const formSchema = z.object({
    name: z.string().min(1, { message: "Nombre es requerido" }),
    category: z.string().min(1, { message: "Categoría es requerida" }),
    description: z.string().min(0).max(300, { message: "La descripción debe tener entre 5 y 300 caracteres" }).optional(),
    price: z.number().min(1, { message: "El precio es requerido" }),
    // quantityInStock: z.number().min(0, { message: "La Cantidad en Stock es requerida" }),
    // variantsId: z.array(z.string()),
});

const variantSchema = z.object({
    color: z.string().min(1, { message: "Color es requerido" }),
    size: z.string().min(1, { message: "Talle es requerido" }),
    quantity: z.number().min(0, { message: "La Cantidad es requerida" }),
});


const EditProduct = () => {
    const pathName = usePathname();
    const productId = pathName.split("/products/").join("");
    const router = useRouter();
    const { toast } = useToast();


    const [productData, setProductData] = useState({} as Product);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            category: "",
            description: "",
            price: 0,
            // quantityInStock: 0,
            // variantsId: [],
        }
    });

    const fetchProductData = async() => {
        try {
            const productData = await fetchSingleProduct(productId);
            setProductData(productData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (productId) {
            fetchProductData();
        }
    }, [productId]);

    useEffect(() => {
        if (productData) {
            form.reset({
                name: productData.name,
                category: productData.category,
                description: productData.description,
                price: productData.price,
            });
        }
    }, [productData, form]);

    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        try {
            const updatedProduct = await updateProduct(productId, values);
            if (updatedProduct && updatedProduct.product && updatedProduct.product._id) {
                toast({
                    title: "Producto editado correctamente",
                })
                router.push("/products");
            } else {
                console.log("Error al editar el producto:", updatedProduct);
            }
            
        } catch (error) {
            console.log("Error al editar el producto: ", error)
        }
    }

    const handleVariantSubmit = async(variant: z.infer<typeof variantSchema>) => {
        try {
            await createVariant(productId, variant)
            console.log("Variante creada: ", variant)
        } catch (error) {
            console.log("Error al crear Variante: ", error)
        }  
    }

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
                            <Link href="/products">
                                <Button variant="outline" size="icon" className="h-7 w-7">
                                    <ChevronLeft className="h-4 w-4" />
                                    <span className="sr-only">Volver</span>
                                </Button>
                            </Link>
                            <div className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                                Editar Producto
                            </div>
                                { 
                                    productData.quantityInStock > 0 ?
                                        <Badge variant="outline" className="ml-auto sm:ml-0">En Stock</Badge>
                                        :
                                        <Badge variant="destructive" className="ml-auto sm:ml-0">Agotado</Badge>
                                }
                            <div className="hidden items-center gap-2 md:ml-auto md:flex">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)}>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" size="sm">
                                                    Eliminar
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Estas seguro de eliminar este producto?</DialogTitle>
                                                    <DialogDescription>
                                                        Esta acción no se puede deshacer.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button type="button" variant="outline" className="ml-2">
                                                            Cancelar
                                                        </Button>
                                                    </DialogClose>
                                                    <DialogClose asChild>
                                                        <Button variant="destructive" size="sm">
                                                            Eliminar
                                                        </Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                        <Button size="sm" type="submit">Guardar</Button>
                                    </form>
                                </Form>
                            </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)}>
                                        {/* Card Producto */}
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Detalles del producto</CardTitle>
                                                <CardDescription>
                                                    Información del producto
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="grid gap-6 mb-2">
                                                    <div className="grid gap-3">
                                                    <FormItem>
                                                            <FormLabel>Nombre</FormLabel>
                                                            <FormControl>
                                                                <Controller 
                                                                    name="name"
                                                                    control={form.control}
                                                                    render={({ field }) => (
                                                                        <Input
                                                                            type="text"
                                                                            placeholder="Nombre..."
                                                                            {...field}
                                                                            value={field.value}
                                                                            onChange={(e) => field.onChange(e.target.value)}
                                                                        />
                                                                    )}
                                                                />
                                                            </FormControl>
                                                        </FormItem>
                                                    </div>
                                                    <div className="grid gap-3">
                                                        <FormItem>
                                                            <FormLabel>Categoría</FormLabel>
                                                            <FormControl>
                                                                <Controller 
                                                                    name="category"
                                                                    control={form.control}
                                                                    render={({ field }) => (
                                                                        <Input
                                                                            type="text"
                                                                            placeholder="Categoría..."
                                                                            {...field}
                                                                            value={field.value}
                                                                            onChange={(e) => field.onChange(e.target.value)}
                                                                        />
                                                                    )}
                                                                />
                                                            </FormControl>
                                                        </FormItem>
                                                    </div>
                                                    <div className="grid gap-3">
                                                        <FormItem>
                                                            <FormLabel>Descripción</FormLabel>
                                                            <FormControl>
                                                                <Controller 
                                                                    name="description"
                                                                    control={form.control}
                                                                    render={({ field }) => (
                                                                        <Textarea
                                                                            id="description"
                                                                            placeholder="Descripción..."
                                                                            {...field}
                                                                            // value={field.value}
                                                                            value={field.value === undefined ? "" : field.value}
                                                                            onChange={(e) => field.onChange(e.target.value)}
                                                                        />
                                                                    )}
                                                                />
                                                            </FormControl>
                                                        </FormItem>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </form>
                                </Form>
                                {
                                    // variantsData && <VariantCard variantsData={variantsData} onSubmit={handleVariantSubmit} />
                                }
                                <VariantCard onSubmit={handleVariantSubmit} />
                            </div>
                            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)}>
                                        {/* Card Precio */}
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>
                                                    Precio
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="grid gap-6">
                                                    <div className="grid gap-3">
                                                        <FormItem>
                                                            <FormLabel>Valor $</FormLabel>
                                                            <FormControl>
                                                                <Controller
                                                                    name="price"
                                                                    control={form.control}
                                                                    render={({ field }) => (
                                                                        <Input
                                                                            type="number"
                                                                            {...field}
                                                                            value={field.value}
                                                                            onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                                                        />
                                                                    )}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    </div>
                                                    <div className="grid gap-3">
                                                        {/* //TODO: Implementar costos */}
                                                        <Label className="text-muted-foreground">Compra</Label>
                                                        <Input type="text" className="w-full" defaultValue="Proximamente..." disabled />
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
                                    </form>
                                </Form>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default EditProduct