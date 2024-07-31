'use client'


import { useState } from "react";
import Link from "next/link";
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
import { Button } from "@/components/ui/button";
import SelectProductSold from "../../components/SelectProductSold";


// const formSchema = z.object({
//     productsSold: z.array(
//         z.object({
//             productId: z.string().min(1, { message: "Producto es requerido" }),
//             variantId: z.string().min(1, { message: "Variante es requerida" }),
//             quantitySold: z.number().min(1, { message: "La cantidad vendida debe ser al menos 1" }),
//         })
//     ).min(1, { message: "Al menos un producto debe ser vendido" }),
//     customer: z.string().min(1, { message: "Cliente es requerido" }),
//     paymentDetails: z.object({
//         method: z.enum(['Efectivo', 'Transferencia', 'Mercadopago'], { message: "Método de pago inválido" }),
//     }),
//     bill: z.boolean(),
//     status: z.enum(['Pendiente', 'Completado', 'Cancelada'], { message: "Estado inválido" }),
// });
const formSchema = z.object({
    productsSold: z.array(
        z.object({
            productId: z.string().min(1, { message: "Producto es requerido" }),
        })
    ).min(1, { message: "Al menos un producto debe ser vendido" }),
});

const Step1 = () => {
    const [selectedProductId, setSelectedProductId] = useState<string[] | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            productsSold: [],
        }
    });
    // const form = useForm<z.infer<typeof formSchema>>({
    //     resolver: zodResolver(formSchema),
    //     defaultValues: {
    //         productsSold: [],
    //         customer: "",
    //         paymentDetails: {
    //             method: 'Efectivo',
    //         },
    //         bill: false,
    //         status: 'Pendiente',
    //     }
    // });

    
    const onSubmit = (data: z.infer<typeof formSchema>) => {
        // Manejar el envío del formulario
        console.log("Form data:", data);
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
                    <SelectProductSold onSelectProduct={setSelectedProductId} />
                </CardContent>
            </Card>
            <div className="flex justify-end mt-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        {/* <Link href="/sales/new-sale?step=step2"> */}
                        <Link href={`/sales/new-sale?step=step2${selectedProductId ? `&productId=${selectedProductId}` : ''}`}>
                            <Button type="submit" size="sm">
                                Continuar
                            </Button>
                        </Link>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Step1