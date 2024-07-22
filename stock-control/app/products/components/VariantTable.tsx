'use client'


import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { MoreVertical, PencilLine, Trash } from "lucide-react";
import { usePathname } from "next/navigation";

// Types
import { Variant } from "@/types";
import { deleteVariant } from "@/app/api/apiService";

interface VariantTableProps {
    variants: Variant[];
}

const VariantTable: React.FC<VariantTableProps> = ({variants}) => {

    const pathName = usePathname();
    const productId = pathName.split("/products/").join("");

    const { toast } = useToast();

    const handleDeleteVariant = async(variantId: string) => {
        try {
            await deleteVariant(productId, variantId);
            toast({
                description: "La variante ha sido eliminada Correctamente",
            });
        } catch (error) {
            console.log("Error al eliminar variante: ", error);
        }
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Color</TableHead>
                    <TableHead className="text-center">Stock</TableHead>
                    <TableHead className="w-[200px] text-center">Disponibilidad</TableHead>
                    <TableHead className="text-center">Talles</TableHead>
                    <TableHead className="sr-only">Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    variants.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4}>No hay variantes</TableCell>
                        </TableRow>
                    ) : (
                    variants.map((variant) => (
                        <TableRow key={variant._id}>
                            <TableCell className="font-semibold">
                                {variant.color}
                            </TableCell>
                            <TableCell className="text-center">
                                {variant.quantity}
                            </TableCell>
                            <TableCell className="text-center">
                                {
                                    variant.availability === 'Disponible' ? (
                                        <Badge>Disponible</Badge>
                                    ) : (
                                        <Badge variant="destructive">Agotado</Badge>
                                    )
                                }
                                
                            </TableCell>
                            <TableCell className="text-center">
                                {variant.size}
                            </TableCell>
                            <TableCell className="flex justify-end">
                                {/* Opcion 1 DropdownMenu */}
                                {/* <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button size="icon" variant="ghost" className="h-8 w-8">
                                            <MoreVertical className="h-3.5 w-3.5" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>Editar</DropdownMenuItem>
                                        <DropdownMenuItem>Borrar</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu> */}

                                {/* Opcion 2 Button */}
                                <Button size="icon" variant="ghost" className="h-8 w-8">
                                    <PencilLine className="h-3.5 w-3.5" />
                                </Button>
                                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleDeleteVariant(variant._id!)}>
                                    <Trash className="h-3.5 w-3.5" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    )
                    ))
                }
            </TableBody>
        </Table>
    )
}

export default VariantTable