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
    FormDescription,
    FormField,
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
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import VariantTable from "./VariantTable";

// Types
import { Variant } from "@/types";
import { toast, useToast } from "@/components/ui/use-toast";


interface VariantCardProps {
    variantsData: Variant[];
}

const VariantSchema = z.object({
    color: z.string().min(1, { message: "Color es requerido" }),
    size: z.string().min(1, { message: "Talle es requerido" }),
    quantity: z.number().min(0, { message: "La Cantidad es requerida" }),
});

const VariantCard: React.FC<VariantCardProps> = ({ variantsData }) => {

    const variantsForm = useForm<z.infer<typeof VariantSchema>>({
        resolver: zodResolver(VariantSchema),
        defaultValues: {
            color: "",
            size: "",
            quantity: 0,
        }
    });

    const onSubmit = (data: z.infer<typeof VariantSchema>) => {
        console.log("data: ", data);
            // toast({
            //     title: "You submitted the following values:",
            //     description: (
            //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            //             <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            //         </pre>
            //     ),
            // })
    }


    return (
        <Card>
            <Form {...variantsForm}>
                <form onSubmit={variantsForm.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <FormField
                    control={variantsForm.control}
                    name="color"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Color</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a color to display" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="Azul">Azul</SelectItem>
                                <SelectItem value="Beige">Beige</SelectItem>
                                <SelectItem value="Negro">Negro</SelectItem>
                                <SelectItem value="Rojo">Rojo</SelectItem>
                                <SelectItem value="Verde">Verde</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormDescription>
                            You can manage email addresses in your{" "}
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>

            {/* <Form {...variantsForm}>
                <form onSubmit={variantsForm.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <FormField
                    control={variantsForm.control}
                    name="quantity"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Cantidad</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="cantidad" {...field} />
                        </FormControl>
                        <FormDescription>
                            This is your public display name.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form> */}

            {/* <Form {...variantsForm}>
                <form onSubmit={variantsForm.handleSubmit(onSubmit)}>
                    <CardHeader>
                        <CardTitle>Variantes</CardTitle>
                        <CardDescription>Detalles de las variantes</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {variantsData && <VariantTable variants={variantsData} />}
                    </CardContent>
                    <CardFooter className="justify-center border-t p-4">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size="sm" variant="ghost" className="gap-1">
                                    <PlusCircle className="h3.5 w-3.5" />
                                    Agregar Variante
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Crear Nueva Variante</DialogTitle>
                                    <DialogDescription>
                                        Ingresar los valores para la nueva variante
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <FormField
                                            control={variantsForm.control}
                                            name="color"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Color</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Color"/>
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="Azul">Azul</SelectItem>
                                                            <SelectItem value="Beige">Beige</SelectItem>
                                                            <SelectItem value="Negro">Negro</SelectItem>
                                                            <SelectItem value="Rojo">Rojo</SelectItem>
                                                            <SelectItem value="Verde">Verde</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={variantsForm.control}
                                            name="size"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Talle</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Talle" />
                                                            </SelectTrigger>
                                                        </FormControl>
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
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={variantsForm.control}
                                            name="quantity"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Cantidad</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                        <Button type="submit">Crear Variante</Button>
                                    <DialogClose asChild>
                                        <Button variant="outline" className="ml-2">
                                            Cancelar
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardFooter>
                </form>
            </Form> */}
        </Card>
    )
}

export default VariantCard