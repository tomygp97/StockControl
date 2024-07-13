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
import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenu,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Eye, MoreVertical, Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

import { Product } from "@/types";

interface ProductTableProps {
    products: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({products}) => {
    const router = useRouter();

    const handleNavigateToEditProduct = (id: string) => {
        router.push(`/products/${id}`);
    };

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
                    <TableHead className="hidden md:table-cell text-center">
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
                        <TableCell className="hidden md:table-cell text-center">
                            { product.quantityInStock }
                        </TableCell>
                        <TableCell className="flex justify-end">
                            {/* <Button variant="ghost" size="sm">
                                <Eye />
                            </Button> */}
                            {/* <Button variant="ghost" size="sm" onClick={() => handleNavigateToEditProduct(product._id)}>
                                <Pencil />
                            </Button>
                            <Button variant="ghost" size="sm">
                                <Trash />
                            </Button> */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button size="icon" variant="ghost" className="h-8 w-8">
                                        <MoreVertical className="h-3.5 w-3.5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleNavigateToEditProduct(product._id)}>Editar</DropdownMenuItem>
                                    <DropdownMenuItem>Borrar</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))
            }
            </TableBody>
        </Table>
    )
}

export default ProductTable