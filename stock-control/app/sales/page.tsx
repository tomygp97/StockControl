'use client'


import { useState } from "react";
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

// Types
import { Sale } from "@/types";

const Sales = () => {

    const [activeSale, setActiveSale] = useState<Sale | null>(null);
    console.log(activeSale);


    return (
        <div className="flex min-h-screen w-full flex-col md:ml-14">
            <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                        <Card className="sm:col-span-2">
                            <CardHeader className="pb-3">
                                <CardTitle>Ventas</CardTitle>
                                <CardDescription className="max-w-lg text-balance leading-relaxed">Panel de ventas</CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Button>Cargar Venta</Button>
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
                    <SalesTable activeSale={activeSale} setActiveSale={setActiveSale}/>
                </div>
                <div className="mr-14">
                    <SaleInfo activeSale={activeSale} />
                </div>
            </div>
        </div>

    )
}

export default Sales