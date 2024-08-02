'use client'


import { useEffect, useState } from "react";
import { useProductContext } from "../../context/ProductContext";
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

import { fetchSingleProduct, fetchAllVariantsByProductId } from "@/app/api/apiService";
import { Product } from "@/types";
import { Check, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";


const formSchema = z.object({
    productsSold: z.array(
        z.object({
            productId: z.string().min(1, { message: "Producto es requerido" }),
            variants: z.array(
                z.object({
                    variantId: z.string().min(1, { message: "Variante es requerida" }),
                    quantity: z.number().min(1, { message: "Cantidad debe ser mayor que 0" })
                })
            ).min(1, { message: "Al menos una variante debe ser vendida" }),
        })
    ).min(1, { message: "Al menos un producto debe ser vendido" }),
});

const Step2 = () => {
    const [productsIds, setProductsIds] = useState<string[]>([]);
    const [productsData, setProductsData] = useState<Product[]>([]);
    const [selectedVariants, setSelectedVariants] = useState<Record<string, Record<string, number>>>({});

    // console.log("productsIds desde step2: ", productsIds);
    // console.log("productsData desde step2: ", productsData);
    const router = useRouter();
    const { toast } = useToast();

    const productContext = useProductContext();
    const { removeVariant, addVariant } = productContext;

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

    useEffect(() => {
        setProductsIds(productContext.selectedProductIds);
    }, [productContext.selectedProductIds]);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const productData = await Promise.all(productsIds.map(async (id) => await fetchSingleProduct(id)));
                setProductsData(productData);
            } catch (error) {
                console.log(error);
            }
        };
        if (productsIds.length > 0) {
            fetchProductData();
        }
    }, [productsIds]);

    const handleVariantSelect = (productId: string, variantId: string) => {
        console.log("productId: ", productId, "varianId: ", variantId);

        const newSelectedVariants = { ...selectedVariants };
        if (!newSelectedVariants[productId]) {
            newSelectedVariants[productId] = {};
        }

        // Toggle variant selection
        if (newSelectedVariants[productId][variantId]) {
            delete newSelectedVariants[productId][variantId];
        } else {
            newSelectedVariants[productId][variantId] = 1; // Initialize with quantity 1
        }
        setSelectedVariants(newSelectedVariants);
    };

    const handleQuantityChange = (productId: string, variantId: string, quantity: number) => {
        if (!productId || !variantId) {
            return;
        }
    
        const newSelectedVariants = { ...selectedVariants };
        if (!newSelectedVariants[productId]) {
            newSelectedVariants[productId] = {};
        }
        if (quantity <= 0) {
            delete newSelectedVariants[productId][variantId];
        } else {
            newSelectedVariants[productId][variantId] = quantity;
        }
        setSelectedVariants(newSelectedVariants);
    };

    const handleContinue = () => {
        const productsSold = Object.entries(selectedVariants).map(([productId, variants]) => ({
            productId,
            variants: Object.entries(variants)
                .filter(([variantId, quantity]) => quantity > 0) // Filtra variantes con cantidad > 0
                .map(([variantId, quantity]) => ({ variantId, quantity }))
        })).filter(product => product.variants.length > 0); // Filtra productos sin variantes válidas
    
        form.setValue('productsSold', productsSold);
    
        form.handleSubmit(onSubmit)();
    };

    return (
        <div className="mx-7">
            <div className="text-xl font-semibold tracking-tight mb-4">
                Ingresar Variantes Vendidas
            </div>
            <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    {
                        productsData.map((product, productIndex) => (
                            <Card key={product._id} className="">
                                <CardHeader>
                                    <CardTitle>{product.name}</CardTitle>
                                    <CardDescription>
                                        Seleccione las variantes vendidas.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[100px]">Color</TableHead>
                                                <TableHead className="text-center">Talles</TableHead>
                                                <TableHead className="w-[200px] text-center">Disponibilidad</TableHead>
                                                <TableHead className="text-center">Stock</TableHead>
                                                <TableHead className="w-[200px] text-center">Cantidad</TableHead>
                                                <TableHead className="sr-only">Acciones</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {product.variants.map((variant, variantIndex) => (
                                                <TableRow key={variant._id}>
                                                    <TableCell className="font-semibold">
                                                        {variant.color}
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        {variant.size}
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        {
                                                            variant.availability === 'Disponible' ? (
                                                                <Badge>Disponible</Badge>
                                                            ) : (
                                                                <Badge variant="destructive">Agotado</Badge>
                                                            )
                                                        }
                                                        
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        {variant.quantity}
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        <Form {...form}>
                                                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                                                <FormItem>
                                                                    <FormControl>
                                                                        <Controller
                                                                            name={`productsSold.${productIndex}.variants.${variantIndex}.quantity`}
                                                                            control={form.control}
                                                                            render={({ field, fieldState, formState }) => {
                                                                                const productId = product._id;
                                                                                const variantId = variant._id;

                                                                                if (!productId || !variantId) {
                                                                                return <></>; // Devuelve fragmento vacio si productId o variantId es undefined
                                                                                }

                                                                                const productVariants = selectedVariants[productId] || {};
                                                                                const quantity = productVariants[variantId] ?? 0;

                                                                                return (
                                                                                <Input
                                                                                    type="number"
                                                                                    {...field}
                                                                                    value={quantity}
                                                                                    onChange={(e) => {
                                                                                    const newQuantity = e.target.valueAsNumber;
                                                                                    field.onChange(newQuantity);
                                                                                    handleQuantityChange(productId, variantId, newQuantity);
                                                                                    }}
                                                                                />
                                                                                );
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            </form>
                                                        </Form>
                                                    </TableCell>
                                                    <TableCell className="flex justify-end">
                                                        {/* <Button size="icon" variant="ghost" onClick={() => handleVariantSelect(product._id, variant._id)}> */}
                                                        <Button size="icon" variant="ghost">
                                                            <Check className="w-6 h-6 text-green-500" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>

                                    </Table>
                                </CardContent>
                            </Card>
                        ))
                    }
                    </div>
                </div>
            </div>
            <div className="flex justify-end mt-4">
                {/* <Link href="/sales/new-sale?step=step2"> */}
                <Button type="submit" size="sm" onClick={handleContinue}>
                    Continuar
                </Button>
            </div>
        </div>
    )
}

export default Step2