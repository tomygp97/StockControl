'use client'


import { useEffect, useState } from "react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "@/components/ui/table";

import { format } from 'date-fns';

// Types
import { Sale } from "@/types";

//! BORRAR DATOS DE EJEMPLO
import exampleSales from "../data";

function SalesTable() {
    const [sales, setSales] = useState<Sale[]>(exampleSales);
    const [activeSaleId, setActiveSaleId] = useState<string | null>(null);
    // const [isActive, setIsActive] = useState(false);
    console.log(sales);
    console.log(activeSaleId);

    const getSales = async() => {
        // Remplazar con llamada a la API
        setSales(exampleSales);
        if ( sales.length > 0 ) {
            setActiveSaleId(sales[sales.length - 1]._id);
        }
    };
    useEffect(() => {
        getSales();
    }, []);

    
    const selectSale = (id: string) => {
        if (id !== activeSaleId) {
            setActiveSaleId(id);
        }
    };


    return (
        <Tabs defaultValue="week">
            <div className="flex itemes-center">
                <TabsList>
                    <TabsTrigger value="week">Semana</TabsTrigger>
                    <TabsTrigger value="month">Mes</TabsTrigger>
                    <TabsTrigger value="year">Año</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="week">
                <Card>
                    <CardHeader className="px-7">
                        <CardTitle>Ventas</CardTitle>
                        <CardDescription>Ventas Recientes</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="hidden sm:table-cell">
                                        Pedido
                                    </TableHead>
                                    <TableHead className="hidden sm:table-cell">
                                        Cliente
                                    </TableHead>
                                    <TableHead className="hidden sm:table-cell">
                                        Fecha
                                    </TableHead>
                                    <TableHead className="hidden sm:table-cell">
                                        Forma de Pago
                                    </TableHead>
                                    <TableHead className="text-right">
                                        Total
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    sales.slice().reverse().map((sale, index, arr) => (
                                        <TableRow key={sale._id} onClick={() => selectSale(sale._id)} className={ sale._id === activeSaleId ? "bg-accent" : "" }>
                                            <TableCell>
                                                #{ arr.length - index }
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">{ sale.customer.name }</div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">{ sale.customer.contact }</div>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                { format(new Date(sale.date), 'dd-MM-yyyy') }
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                { sale.paymentDetails.method }
                                            </TableCell>
                                            <TableCell className="text-right">
                                                $ { sale.totalPrice }
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}

export default SalesTable