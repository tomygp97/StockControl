'use client'


import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
import { useEffect, useState } from "react";
import { fetchAllCustomers } from "@/app/api/apiService";

// Types
import { Customer } from "@/types";

const ClientTable = () => {
    const [customersList, setCustomersList] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(false)

    const router = useRouter();

    const fetchCustomersData = async() => {
        try {
            setLoading(true);
            const customersData = await fetchAllCustomers();
            setCustomersList(customersData);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCustomersData();
    }, [])

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[200px] sm:table-cell">Nombre</TableHead>
                    <TableHead className="w-[300px] hidden md:table-cell">Correo</TableHead>
                    <TableHead className="w-[200px] hidden md:table-cell">
                        Telefono
                    </TableHead>
                    <TableHead className="w-[300px] hidden md:table-cell">
                        Contacto
                    </TableHead>
                    <TableHead className="hidden md:table-cell text-center">
                        Direccion
                    </TableHead>
                    <TableHead>
                        <span className="w-[100px] sr-only">Acciones</span>
                    </TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {
                customersList.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                            No hay clientes
                        </TableCell>
                    </TableRow>
                ) :
                customersList.map((customer) => (
                    <TableRow key={customer._id}>
                        <TableCell className="font-medium">
                            { customer.name }
                        </TableCell>
                        <TableCell className="font-medium">
                            { customer.email }
                        </TableCell>
                        <TableCell className="font-medium">
                            { customer.phone }
                        </TableCell>
                        <TableCell className="font-medium">
                            { customer.contact }
                        </TableCell>
                        <TableCell className="font-medium">
                            { customer.address }
                        </TableCell>
                        <TableCell className="flex justify-end">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button size="icon" variant="ghost" className="h-8 w-8">
                                        <MoreVertical className="h-3.5 w-3.5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Editar</DropdownMenuItem>
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

export default ClientTable