'use client'


import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";



const formSchema = z.object({
    name: z.string().min(1, { message: "Nombre es requerido" }),
    category: z.string().min(1, { message: "Categoría es requerida" }),
    description: z.string().min(0).max(300, { message: "La descripción debe tener entre 5 y 300 caracteres" }).optional(),
    // price: z.number().min(1, { message: "El precio es requerido" }),
    // quantityInStock: z.number().min(0, { message: "La Cantidad en Stock es requerida" }),
    // variantsId: z.array(z.string()),
});
const NewProduct = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            category: "",
            description: "",
            // price: 0,
            // quantityInStock: 0,
            // variantsId: [],
        }
    });
    
    // useEffect(() => {
    //     console.log("Errores del formulario:", form.formState.errors);
    // }, [form.formState.errors]);
    
    // const onSubmit = (values: z.infer<typeof formSchema>) => {
    //     console.log("data: ", values);
    // }


    return (
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
                                    // className="min-h-24"
                                    {...field}
                                    value={field.value !== undefined ? field.value : ""}
                                    onChange={(e) => field.onChange(e.target.value)}
                                />
                            )}
                        />
                    </FormControl>
                </FormItem>
            </div>
        </div>
    )
}

export default NewProduct