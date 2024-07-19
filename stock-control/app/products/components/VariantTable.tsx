'use client'


import { useState } from "react";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
    const [loading, setLoading] = useState(false)

    const { toast } = useToast();

    const handleDeleteVariant = async(variantId: string) => {
        try {
            setLoading(true);
            await deleteVariant(productId, variantId);
            toast({
                description: "El producto ha sido eliminado Correctamente",
            });
            console.log("Variante eliminada: ", variantId);
        } catch (error) {
            console.log("Error al eliminar variante: ", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Color</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Disponibilidad</TableHead>
                    <TableHead className="w-[100px]">Talles</TableHead>
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
                                <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder={variant.color}/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Azul">Azul</SelectItem>
                                    <SelectItem value="Beige">Beige</SelectItem>
                                    <SelectItem value="Negro">Negro</SelectItem>
                                    <SelectItem value="Rojo">Rojo</SelectItem>
                                    <SelectItem value="Verde">Verde</SelectItem>
                                </SelectContent>
                            </Select>
                            </TableCell>
                            <TableCell>
                                <Label className="sr-only">stock</Label>
                                <Input type="number" placeholder={variant.quantity.toString()} />
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
                            <TableCell>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder={variant.size}/>
                                    </SelectTrigger>
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