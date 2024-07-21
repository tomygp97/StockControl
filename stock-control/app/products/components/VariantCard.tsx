'use client'


import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import VariantTable from "./VariantTable";

// Types
import { Variant } from "@/types";
import { fetchAllVariantsByProductId } from "@/app/api/apiService";


interface VariantCardProps {
    onSubmit: (variant: z.infer<typeof variantSchema>) => void;
}

const variantSchema = z.object({
    color: z.string().min(1, { message: "Color es requerido" }),
    size: z.string().min(1, { message: "Talle es requerido" }),
    quantity: z.number().min(0, { message: "La Cantidad es requerida" }),
});


const VariantCard: React.FC<VariantCardProps> = ({ onSubmit }) => {
    const [variantsData, setVariantsData] = useState<Variant[] | undefined>();

    const pathName = usePathname();
    const productId = pathName.split("/products/").join("");


    // const fetchVariantData = async() => {
    //     try {
    //         const variantData = await fetchAllVariantsByProductId(productId);
    //         setVariantsData(variantData);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const form = useForm<z.infer<typeof variantSchema>>({
        resolver: zodResolver(variantSchema),
        defaultValues: {
            color: "",
            size: "",
            quantity: 0,
        },
    })

    const handleFormSubmit = (data: z.infer<typeof variantSchema>) => {
        try {            
            onSubmit(data);
            form.reset();
            setVariantsData((prevData) => prevData ? [...prevData, data] : [data]);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        const fetchVariantData = async () => {
            try {
                const variantData = await fetchAllVariantsByProductId(productId);
                setVariantsData(variantData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchVariantData();
    }, [productId]);

    // useEffect(() => {
    //     fetchVariantData();
    // }, [productId]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)}>
                <Dialog>
                    <Card>
                        <CardHeader>
                            <CardTitle>Variantes</CardTitle>
                            <CardDescription>Detalles de las variantes</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {variantsData && <VariantTable variants={variantsData} />}
                        </CardContent>
                        <CardFooter className="justify-center border-t p-4">
                            <DialogTrigger asChild>
                                <Button variant="outline">
                                    Añadir Variante
                                    <PlusCircle className="ml-2 h-4 w-4" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Crear Nueva Variante</DialogTitle>
                                    <DialogDescription>
                                        Ingresar los valores para la nueva variante.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <FormItem>
                                            <FormLabel>Color</FormLabel>
                                            <FormControl>
                                                <Controller
                                                    name="color"
                                                    control={form.control}
                                                    render={({ field }) => (
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Color" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Azul">Azul</SelectItem>
                                                                <SelectItem value="Beige">Beige</SelectItem>
                                                                <SelectItem value="Negro">Negro</SelectItem>
                                                                <SelectItem value="Rojo">Rojo</SelectItem>
                                                                <SelectItem value="Verde">Verde</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                        <FormItem>
                                            <FormLabel>Talle</FormLabel>
                                            <FormControl>
                                                <Controller
                                                    name="size"
                                                    control={form.control}
                                                    render={({ field }) => (
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Talle" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="34">34</SelectItem>
                                                                <SelectItem value="36">36</SelectItem>
                                                                <SelectItem value="38">38</SelectItem>
                                                                <SelectItem value="40">40</SelectItem>
                                                                <SelectItem value="42">42</SelectItem>
                                                                <SelectItem value="44">44</SelectItem>
                                                                <SelectItem value="46">46</SelectItem>
                                                                <SelectItem value="48">48</SelectItem>
                                                                <SelectItem value="50">50</SelectItem>
                                                                <SelectItem value="52">52</SelectItem>
                                                                <SelectItem value="54">54</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                        <FormItem>
                                            <FormLabel>Cantidad</FormLabel>
                                            <FormControl>
                                                <Controller
                                                    name="quantity"
                                                    control={form.control}
                                                    render={({ field }) => (
                                                        <Input
                                                            type="number"
                                                            {...field}
                                                            // value={field.value !== undefined ? field.value : ""}
                                                            value={field.value}
                                                            onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                                        />
                                                    )}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            {/* <Button onClick={(variantData) => handleFormSubmit(variantData)}>Crear Variante</Button> */}
                                            <Button onClick={() => handleFormSubmit({ color: form.getValues().color, size: form.getValues().size, quantity: form.getValues().quantity })}>Crear Variante</Button>
                                        </DialogClose>
                                        <DialogClose asChild>
                                            <Button variant="outline" className="ml-2">
                                                Cancelar
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </div>
                            </DialogContent>
                        </CardFooter>
                    </Card>
                </Dialog>
            </form>
        </Form>
    )
}

export default VariantCard