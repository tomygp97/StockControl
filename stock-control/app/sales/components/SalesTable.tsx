'use client'


import { useCallback, useEffect, useState } from "react";
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

interface SalesTableProps {
    activeSale: (Sale & { saleNumber?: number }) | null;
    setActiveSale: (sale: (Sale & { saleNumber?: number }) | null) => void;
    salesList: Sale[];
}

const SalesTable: React.FC<SalesTableProps> = ({activeSale, setActiveSale, salesList}) => {

    const impuestos = 1000;

    const selectSale = (id: Sale['_id']) => {
        const selectedSale = salesList.find(sale => sale._id === id);
        if (selectedSale && selectedSale._id !== activeSale?._id) {
            const selectedSaleIndex = salesList.findIndex(sale => sale._id === id);
            const saleNumber = selectedSaleIndex + 1; // Calcula el número de venta basado en el orden inverso
            setActiveSale({ ...selectedSale, saleNumber });
        }
    };

    const calculateTotalPrice = (productsSold: Sale['productsSold']) => {
        return productsSold.reduce((total, item) => total + item.totalPrice, 0);
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
                                        Venta N°
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
                                    // sales.slice().reverse().map((sale, index, arr) => {
                                    salesList.slice().reverse().map((sale, index, arr) => {
                                        const saleNumber = arr.length - index;
                                        return (
                                            <TableRow key={sale._id} onClick={() => selectSale(sale._id)} className={ sale._id === activeSale?._id ? "bg-accent" : "" }>
                                                <TableCell>
                                                    # {saleNumber}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="font-medium">{ sale.customer.name }</div>
                                                    <div className="hidden text-sm text-muted-foreground md:inline">{ sale.customer.email }</div>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    { format(new Date(sale.date), 'yyyy-MM-dd hh:mm a') }
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    { sale.paymentDetails.method }
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    $ { calculateTotalPrice(sale.productsSold) + impuestos }
                                                </TableCell>
                                                {/* <TableCell className="text-right">
                                                    $ { sale.productsSold.totalPrice }
                                                </TableCell> */}
                                            </TableRow>
                                        )
                                    })
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