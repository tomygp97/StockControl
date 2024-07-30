'use client'


import Link from "next/link";
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
import { ChevronLeft, PlusCircle } from "lucide-react";
import SelectProductSold from "../components/SelectProductSold";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { fetchAllProducts } from "@/app/api/apiService";
import { useEffect, useState } from "react";

// Types
import { Product } from "@/types";

const formSchema = z.object({
    productsSold: z.array(
        z.object({
            productId: z.string().min(1, { message: "Producto es requerido" }),
            variantId: z.string().min(1, { message: "Variante es requerida" }),
            quantitySold: z.number().min(1, { message: "La cantidad vendida debe ser al menos 1" }),
        })
    ).min(1, { message: "Al menos un producto debe ser vendido" }),
    customer: z.string().min(1, { message: "Cliente es requerido" }),
    paymentDetails: z.object({
        method: z.enum(['Efectivo', 'Transferencia', 'Mercadopago'], { message: "Método de pago inválido" }),
    }),
    bill: z.boolean(),
    status: z.enum(['Pendiente', 'Completado', 'Cancelada'], { message: "Estado inválido" }),
});

const NewSalePage = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            productsSold: [],
            customer: "",
            paymentDetails: {
                method: 'Efectivo',
            },
            bill: false,
            status: 'Pendiente',
        }
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        // Manejar el envío del formulario
        console.log("Form data:", data);
    };

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
                                    <Link href="/sales">Ventas</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbPage>Nueva Venta</BreadcrumbPage>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                        <div className="flex items-center gap-4">
                            <Link href="/sales">
                                <Button variant="outline" size="icon" className="h-7 w-7">
                                    <ChevronLeft className="h-4 w-4" />
                                    <span className="sr-only">Volver</span>
                                </Button>
                            </Link>
                            <div className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                                Ingresar Nueva Venta
                            </div>
                            <div className="hidden items-center gap-2 md:ml-auto md:flex">
                                <Link href="/sales">
                                    <Button variant="outline" size="sm">
                                        Volver
                                    </Button>
                                </Link>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)}>
                                        <Button type="submit" size="sm">
                                            Guardar
                                        </Button>
                                    </form>
                                </Form>
                            </div>
                        </div>
                        <div className="grid gap-4 lg:gap-8 md:grid-cols-[1fr_250px] lg:grid-cols-3">
                            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Producto</CardTitle>
                                        <CardDescription>
                                            Seleccione el producto vendido.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <SelectProductSold />
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            Total de la Venta
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6">
                                            <div className="grid gap-3">
                                                <Label className="text-muted-foreground">Monto</Label>
                                                <div className="text-lg font-semibold">$ 34000.00</div>
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
                                        <Input type="text" className="w-full" defaultValue="Proximamente..." disabled />
                                        {/* <div className="grid gap-6">Proximamente...</div> */}
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

export default NewSalePage