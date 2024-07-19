'use client'


import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

//? Components
import VariantCard from "../components/VariantCard";
import NewProduct from "../components/NewProduct";
import NewProductPrice from "../components/NewProductPrice";
import VariantTable from "../components/VariantTable";

// API
import { createProduct, createVariant } from "@/app/api/apiService";

// Types
import { Product, Variant } from "@/types";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    name: z.string().min(1, { message: "Nombre es requerido" }),
    category: z.string().min(1, { message: "Categoría es requerida" }),
    description: z.string().min(0).max(300, { message: "La descripción debe tener entre 5 y 300 caracteres" }).optional().nullable(),
    price: z.number().min(1, { message: "El precio es requerido" }),
});


const Page: React.FC = () => {
    const router = useRouter();
    const { toast } = useToast();

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

    useEffect(() => {
        console.log("Errores del formulario:", form.formState.errors);
    }, [form.formState.errors]);

    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        const newProduct: Product = {
            name: values.name,
            category: values.category,
            // description: values.description,
            price: values.price,
            quantityInStock: 0,
            variants: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        if ( values.description ) {
            newProduct.description = values.description
        };

        try {
            const createdProduct = await createProduct(newProduct);
            if (createdProduct && createdProduct.product && createdProduct.product._id) {
                toast({
                    title: "Producto creado correctamente",
                })
                router.push("/products");
                console.log("Producto creado y redirigido a /products");
            } else {
                console.log("Error al crear el producto:", createdProduct);
            }
        } catch (error) {
            console.log("Error al crear el producto:", error);
        }
        
    }

    //TODO: Crear variantes mientras creo un producto
    // const handleVariantSubmit = async(variant: z.infer<typeof variantSchema>) => {
    //     try {
    //         await createVariant(productId, variant)
    //         console.log("Variante creada: ", variant)
    //     } catch (error) {
    //         console.log("Error al crear Variante: ", error)
    //     }  
    // }


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
                                <BreadcrumbPage>Crear Producto</BreadcrumbPage>
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
                                Crear Producto
                            </div>
                            <div className="hidden items-center gap-2 md:ml-auto md:flex">
                                <Link href="/products">
                                    <Button variant="outline" size="sm">
                                        Volver
                                    </Button>
                                </Link>
                                <Button type="submit" size="sm">
                                    Guardar
                                </Button>
                            </div>
                        </div>
                        <div className="grid gap-4 lg:gap-8 md:grid-cols-[1fr_250px] lg:grid-cols-3">
                            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)}>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Datos del Producto</CardTitle>
                                                <CardDescription>
                                                    Ingresa los datos del nuevo Producto
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                {/* Card Nuevo Producto */}
                                                {/* <NewProduct /> */}
                                                <div className="grid gap-6">
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
                                                                            value={field.value !== undefined ? field.value : ""}
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
                                                                            value={field.value !== undefined ? field.value : ""}
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
                                                                            value={field.value !== null ? field.value : ""}
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
                                            {/* Card Variantes del nuevo Producto */}
                                        {/* <VariantCard variantsData={[]} /> */}
                                        {/* <VariantCard onSubmit={handleVariantSubmit} /> */}
                                    </div>
                                    <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                                    <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)}>
                                        {/* Card Precio y costos del nuevo Producto */}
                                        {/* <NewProductPrice /> */}
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
                                                                            value={field.value !== undefined ? field.value : ""}
                                                                            onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                                                        />
                                                                    )}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    </div>
                                                    <div className="grid gap-3">
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
                                                <Input type="text" className="w-full" defaultValue="Proximamente..." disabled />
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

export default Page