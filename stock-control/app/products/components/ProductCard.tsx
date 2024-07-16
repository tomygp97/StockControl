import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Types
import { Product } from "@/types";

interface ProductCardProps {
    productData: Product;
}

const formSchema = z.object({
    name:z.string().min(1, { message: "Nombre es requerido" }),
    category:z.string().min(1, { message: "Categoría es requerida" }),
    description:z.string().min(0).max(300, { message: "La descripción debe tener entre 5 y 300 caracteres" }),
    price:z.number().min(1, { message: "El precio es requerido" }),
    quantityInStock:z.number().min(0, { message: "La Cantidad en Stock es requerida" }),
    variantsId:z.array(z.string()),
});

const ProductCard: React.FC<ProductCardProps> = ({ productData }) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: productData.name,
            category: productData.category,
            description: productData.description,
            price: productData.price,
            quantityInStock: productData.quantityInStock,
            variantsId: [],
        }
    });

    useEffect(() => {
        console.log("Errores del formulario:", form.formState.errors);
    }, [form.formState.errors]);
    
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log("data: ", values);
    }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Detalles del producto</CardTitle>
                <CardDescription>
                    Información del producto
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-6 mb-2">
                            <div className="grid gap-3">
                                <Label htmlFor="name">Nombre</Label>
                                <Input id="name" type="text" className="w-full" defaultValue={productData.name} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="name">Categoría</Label>
                                <Input id="category" type="text" className="w-full" defaultValue={productData.category} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="description">Descripción</Label>
                                <Textarea id="description" className="min-h-24" defaultValue={productData.description} />
                            </div>
                        </div>
                        {/* <CardFooter className="flex justify-center mt-10">
                            <Button type="submit">Guardar</Button>
                        </CardFooter> */}
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default ProductCard