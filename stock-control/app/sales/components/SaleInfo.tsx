import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Copy, CreditCard, MoreVertical, Truck } from "lucide-react";
import { format } from 'date-fns';


const SaleInfo = () => {
    return (
        <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                        Venta #5
                        <Button size="icon" variant="outline" className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100">
                            <Copy className="h-3 w-3" />
                            <span className="sr-only">Copy Ordedr ID</span>
                        </Button>
                    </CardTitle>
                    <CardDescription>Fecha: 23-06-2024</CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-1">
                    {/* <Button size="sm" variant="outline" className="h-8 gap-1">
                        <Truck className="h-3.5 w-3.5" />
                        <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                            Track Order
                        </span>
                    </Button> */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="outline" className="h-8 w-8">
                                <MoreVertical className="h-3.5 w-3.5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem>Exportar</DropdownMenuItem>
                            <DropdownMenuItem>Borrar</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                    <div className="font-semibold">Order Details</div>
                    <ul className="grid gap-3">
                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                                Zapatillas Deportivas x2
                            </span>
                            <span>$4999</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                            Mochila Deportiva x1
                            </span>
                            <span>$6999</span>
                        </li>
                    </ul>
                    <Separator className="my-2" />
                    <ul className="grid gap-3">
                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>$11998</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">Impuestos</span>
                            <span>$1000</span>
                        </li>
                        <li className="flex items-center justify-between font-semibold">
                            <span className="text-muted-foreground">Total</span>
                            <span>$12998</span>
                        </li>
                    </ul>
                </div>
                {/* <Separator className="my-4" />
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-3">
                        <div className="font-semibold">Shipping Information</div>
                        <address className="grid gap-0.5 not-italic text-muted-foreground">
                            <span>Liam Johnson</span>
                            <span>1234 Main St.</span>
                            <span>Anytown, CA 12345</span>
                        </address>
                    </div>
                    <div className="grid auto-rows-max gap-3">
                        <div className="font-semibold">Billing Information</div>
                        <div className="text-muted-foreground">
                            Same as shipping address
                        </div>
                    </div>
                </div> */}
                <Separator className="my-4" />
                <div className="grid gap-3">
                    <div className="font-semibold">Información del Cliente</div>
                    <dl className="grid gap-3">
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Cliente</dt>
                            <dd>Pedro Ramirez</dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Correo</dt>
                            <dd>
                                <a href="mailto:">pedro@example.com</a>
                            </dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Teléfono</dt>
                            <dd>
                                <a href="tel:">+54 (264) 123-4567</a>
                            </dd>
                        </div>
                    </dl>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3"></div>
                    <div className="font-semibold">Información del Pago</div>
                    <dl className="grid gap-3">
                        <div className="flex items-center justify-between">
                            <dt className="flex items-center text-muted-foreground">
                                <CreditCard className="h-4 w-4" />
                                Transferencia
                            </dt>
                            <dd>**** **** **** 4532</dd>
                        </div>
                    </dl>
            </CardContent>
            <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                <div className="text-xs text-muted-foreground">
                    Actualizado <time dateTime="2023-11-23">{ format(new Date(), 'dd/MM/yyyy') }</time>
                </div>
            </CardFooter>
        </Card>
    )
}

export default SaleInfo