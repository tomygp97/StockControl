import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Types
import { Product } from "@/types";
import { useForm } from "react-hook-form";

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

    const productsForm = useForm<z.infer<typeof formSchema>>({
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
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Detalles del producto</CardTitle>
                <CardDescription>
                    Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6">
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
            </CardContent>
        </Card>
    )
}

export default ProductCard