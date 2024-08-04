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
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { fetchSingleProduct } from "@/app/api/apiService";
import { useRouter } from "next/navigation";

// Types
import { Product } from "@/types";

type ErrorMessages = {
    [productId: string]: {
        [variantId: string]: string;
    };
};

const Step2 = () => {
    const [productsIds, setProductsIds] = useState<string[]>([]);
    const [productsData, setProductsData] = useState<Product[]>([]);
    const [selectedVariants, setSelectedVariants] = useState<Record<string, Record<string, number>>>({});
    const [errorMessages, setErrorMessages] = useState<ErrorMessages>({});

    const { toast } = useToast();
    const router = useRouter();

    const productContext = useProductContext();

    const validateQuantity = (productsData: Product[]) => (value: { productsSold: { productId: string; variants: { variantId: string; quantity: number }[] }[] }) => {
        for (const productSold of value.productsSold) {
            const product = productsData.find(p => p._id === productSold.productId);
            if (!product) return false;
    
            for (const variantSold of productSold.variants) {
                const variant = product.variants.find(v => v._id === variantSold.variantId);
                if (!variant || variantSold.quantity > variant.quantity) {
                    return false;
                }
            }
        }
        return true;
    };    

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
    }).refine(
        (data) => validateQuantity(productsData)(data),
        {
            message: "Cantidad vendida no puede exceder el stock disponible",
            path: ["productsSold"]
        }
    );

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
        const newErrorMessages: ErrorMessages = {};
    
        const isValid = Object.entries(selectedVariants).every(([productId, variants]) => {
            const product = productsData.find(p => p._id === productId);
            if (!product) return true;
    
            return Object.entries(variants).every(([variantId, quantity]) => {
                const variant = product.variants.find(v => v._id === variantId);
                if (!variant) return true;
    
                if (quantity > variant.quantity) {
                    if (!newErrorMessages[productId]) {
                        newErrorMessages[productId] = {};
                    }
                    newErrorMessages[productId][variantId] = `Cantidad vendida no puede exceder el stock disponible (${variant.quantity})`;
                    return false;
                }
                return true;
            });
        });
    
        if (!isValid) {
            setErrorMessages(newErrorMessages);
            return;
        }
    
        const productsSold = Object.entries(selectedVariants).map(([productId, variants]) => ({
            productId,
            variants: Object.entries(variants)
                .filter(([variantId, quantity]) => quantity > 0) // Filtra variantes con cantidad > 0
                .map(([variantId, quantity]) => ({ variantId, quantity }))
        })).filter(product => product.variants.length > 0); // Filtra productos sin variantes válidas
    
        form.setValue('productsSold', productsSold);
    
        form.handleSubmit(onSubmit)();
        router.push('/sales/new-sale?step=step3');
    };

    return (
        <div className="mx-7">
            <div className="text-xl font-semibold tracking-tight mb-4">
                Ingresar Variantes Vendidas
            </div>
            <div className={`mx-auto max-w-[70rem] flex flex-wrap gap-4 ${productsData.length > 1 ? 'grid-cols-1 sm:grid-cols-1 md:grid-cols-2' : 'justify-center'}`}>
                {
                    productsData.map((product, productIndex) => (
                        <Card key={product._id} className="w-full md:w-[calc(50%-1rem)]">
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
                                                                        render={({ field, fieldState }) => {
                                                                            const productId = product._id;
                                                                            const variantId = variant._id;

                                                                            if (!productId || !variantId) {
                                                                                return <></>; // Devuelve fragmento vacío si productId o variantId es undefined
                                                                            }

                                                                            const productVariants = selectedVariants[productId] || {};
                                                                            const quantity = productVariants[variantId] ?? 0;

                                                                            return (
                                                                                <>
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
                                                                                    {fieldState.error && (
                                                                                        <FormMessage>
                                                                                            {fieldState.error.message}
                                                                                        </FormMessage>
                                                                                    )}
                                                                                    {errorMessages[productId] && errorMessages[productId][variantId] && (
                                                                                        <FormMessage>
                                                                                            {errorMessages[productId][variantId]}
                                                                                        </FormMessage>
                                                                                    )}
                                                                                </>
                                                                            );
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                        </form>
                                                    </Form>
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
            <div className="flex justify-end mt-4">
                <Button type="submit" size="sm" onClick={handleContinue}>
                    Continuar
                </Button>
            </div>
        </div>
    )
}

export default Step2