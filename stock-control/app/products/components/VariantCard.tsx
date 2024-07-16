'use client'


import { useEffect } from "react";
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


interface VariantCardProps {
    variantsData: Variant[] | undefined;
}

const formSchema = z.object({
    color: z.string().min(1, { message: "Color es requerido" }),
    size: z.string().min(1, { message: "Talle es requerido" }),
    quantity: z.number().min(0, { message: "La Cantidad es requerida" }),
});

const VariantCard: React.FC<VariantCardProps> = ({ variantsData }) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            color: "",
            size: "",
            quantity: 0,
        },
    })

    // useEffect(() => {
    //     console.log("Errores del formulario:", form.formState.errors);
    // }, [form.formState.errors]);

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log("data: ", values);
    }

    return (
        // TODO: Crear variantes en la base de datos
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
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
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
                                                                value={field.value !== undefined ? field.value : ""}
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
                                                <Button type="submit">Crear Variante</Button>
                                            </DialogClose>
                                            <DialogClose asChild>
                                                <Button type="button" variant="outline" className="ml-2">
                                                    Cancelar
                                                </Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </div>
                                </form>
                            </Form>
                        </DialogContent>
                    </CardFooter>
            </Card>
        </Dialog>
    )
}

export default VariantCard