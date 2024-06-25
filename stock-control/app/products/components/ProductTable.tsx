import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Eye, Pencil, Trash } from "lucide-react";

import { Product } from "@/types";

interface ProductTableProps {
    products: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({products}) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[400px] sm:table-cell">Nombre</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="hidden md:table-cell">
                        Precio
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                        Disponibilidad
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                        Inventario
                    </TableHead>
                    <TableHead>
                        <span className="sr-only">Acciones</span>
                    </TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
            {
                products.map((product) => (
                <TableRow key={product._id}>

                    <TableCell className="font-medium">
                        { product.name }
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        { product.category }
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        ${ product.price }
                    </TableCell>
                    <TableCell>
                    { 
                        product.quantityInStock > 0 ?
                            <Badge variant="outline">Disponible</Badge>
                            :
                            <Badge variant="destructive">Agotado</Badge>
                    }
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        { product.quantityInStock }
                    </TableCell>
                    <TableCell className="flex justify-end">
                        <Button variant="ghost" size="sm">
                            <Eye />
                        </Button>
                        <Button variant="ghost" size="sm">
                            <Pencil />
                        </Button>
                        <Button variant="ghost" size="sm">
                            <Trash />
                        </Button>
                    </TableCell>

                </TableRow>

                ))
            }
            </TableBody>
        </Table>
    )
}

export default ProductTable