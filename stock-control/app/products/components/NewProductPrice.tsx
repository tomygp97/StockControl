'use client'


import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Types
import { Product } from "@/types";

const formSchema = z.object({
    price: z.number().min(1, { message: "El precio es requerido" }),
});

    const NewProductPrice = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price:  0,
        }
    });

    return (
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
                            <FormLabel>Cantidad</FormLabel>
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
    )
}

export default NewProductPrice