'use client'


import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import SalesTable from "./components/SalesTable"
import SaleInfo from "./components/SaleInfo";
import { fetchAllSales } from "../api/apiService";

// Types
import { Sale } from "@/types";

const Sales = () => {
    const [salesList, setSalesList] = useState([])
    const [activeSale, setActiveSale] = useState<Sale | null>(null);
    console.log(activeSale)
    const [loading, setLoading] = useState(false)

    const saleNumber = salesList.length

    const fetchSalesData = async() => {
        try {
            setLoading(true);
            const salesData = await fetchAllSales();
            setSalesList(salesData);
        } catch (error) {
            
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchSalesData();
    }, [])

    useEffect(() => {
        if (salesList.length > 0) {
            setActiveSale(salesList[salesList.length - 1]);
        }
    }, [salesList]);

    return (
        <div className="flex min-h-screen w-full flex-col">
            <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                        <Card className="sm:col-span-2">
                            <CardHeader className="pb-3">
                                <CardTitle>Ventas</CardTitle>
                                <CardDescription className="max-w-lg text-balance leading-relaxed">Panel de ventas</CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Link href="/sales/new-sale">
                                    <Button>Cargar Venta</Button>
                                </Link>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardDescription>Esta Semana</CardDescription>
                                <CardTitle className="text-4xl">$5,000</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xs text-muted-foreground">
                                    +25% que la semana pasada
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Progress value={25} aria-label="25% aumento" />
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardDescription>Este Mes</CardDescription>
                                <CardTitle className="text-4xl">$60,000</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xs text-muted-foreground">
                                    +45% que el mes pasado
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Progress value={45} aria-label="45% aumento" />
                            </CardFooter>
                        </Card>
                    </div>
                    <SalesTable activeSale={activeSale} setActiveSale={setActiveSale} salesList={salesList} />
                </div>
                <div className="mr-14">
                    <SaleInfo activeSale={activeSale} saleNumber={saleNumber} />
                </div>
            </div>
        </div>
    )
}

export default Sales