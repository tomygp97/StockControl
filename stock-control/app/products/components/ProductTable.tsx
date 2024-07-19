import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenu,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { MoreVertical } from "lucide-react";

// Types
import { Product } from "@/types";

interface ProductTableProps {
    products: Product[];
    handleDeleteProduct: (id: string) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({products, handleDeleteProduct}) => {
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
                            {/* <Dialog>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button size="icon" variant="ghost" className="h-8 w-8">
                                            <MoreVertical className="h-3.5 w-3.5" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => handleNavigateToEditProduct(product._id!)}>Editar</DropdownMenuItem>
                                        <DialogTrigger asChild>
                                            <DropdownMenuItem onClick={() => handleConfirmDelete(product._id!)}>Borrar</DropdownMenuItem>
                                        </DialogTrigger>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Estas seguro de eliminar este producto?</DialogTitle>
                                        <DialogDescription>
                                            Esta acción no se puede deshacer.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button type="button" variant="outline" className="ml-2">
                                                Cancelar
                                            </Button>
                                        </DialogClose>
                                        <DialogClose asChild>
                                            <Button variant="destructive" size="sm" onClick={handleDelete}>
                                                Eliminar
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog> */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button size="icon" variant="ghost" className="h-8 w-8">
                                        <MoreVertical className="h-3.5 w-3.5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleNavigateToEditProduct(product._id!)}>Editar</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDeleteProduct(product._id!)}>Borrar</DropdownMenuItem>
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