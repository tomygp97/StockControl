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

// Types
import { Product } from "@/types";

interface ProductCardProps {
    productData: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ productData }) => {
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