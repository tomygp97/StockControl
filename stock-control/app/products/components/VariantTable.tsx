'use client'


import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
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

// Types
import { Variant } from "@/types";

interface VariantTableProps {
    variants: Variant[];
}

const VariantTable: React.FC<VariantTableProps> = ({variants}) => {
    // console.log("variants dedsde VariantTable: ", variants);
    // console.log(".length: ", variants.length);
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Color</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Disponibilidad</TableHead>
                    <TableHead className="w-[100px]">Talles</TableHead>
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
                            <SelectTrigger id="color">
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
                        <Label htmlFor="stock" className="sr-only">stock</Label>
                        <Input id="stock" type="number" placeholder={variant.quantity.toString()} />
                    </TableCell>
                    <TableCell>
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
                            <SelectTrigger id="size">
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
                        </TableRow>
                    )
                    ))
                }
            </TableBody>
        </Table>
    )
}

export default VariantTable