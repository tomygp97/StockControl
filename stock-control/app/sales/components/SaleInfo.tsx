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

// Types
import { Sale } from "@/types";

interface SaleInfoProps {
    activeSale: (Sale & { saleNumber?: number }) | null;
}

const SaleInfo: React.FC<SaleInfoProps> = ({activeSale}) => {
    const impuestos = 1000;

    console.log("activeSale desde saleInfo: ", activeSale);

    return (
        <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                        Venta #{ activeSale?.saleNumber }
                        <Button size="icon" variant="outline" className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100">
                            <Copy className="h-3 w-3" />
                            <span className="sr-only">Copy Ordedr ID</span>
                        </Button>
                    </CardTitle>
                    <CardDescription>Fecha: { activeSale?.date &&format(new Date(activeSale.date), 'dd-MM-yyyy') }</CardDescription>
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
                    <div className="font-semibold">Detalle de Venta</div>
                    <ul className="grid gap-3">
                        {/* {
                            activeSale?.products.map((product) => (
                                <li key={product._id} className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                        { activeSale?.product.name } x{ activeSale?.quantitySold }
                                    </span>
                                    <span>$4999</span>
                                </li>
                            ))
                        } */}
                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                                { activeSale?.product.name } x{ activeSale?.quantitySold }
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
                            <span>${activeSale?.totalPrice}</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">Impuestos</span>
                            <span>${impuestos}</span>
                        </li>
                        <li className="flex items-center justify-between font-semibold">
                            <span className="text-muted-foreground">Total</span>
                            <span>${ activeSale ? (activeSale.totalPrice + impuestos) : 0 }</span>
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
                            <dd>{ activeSale?.customer.name }</dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Correo</dt>
                            <dd>
                                <a href="mailto:">{ activeSale?.customer.contact }</a>
                            </dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">Teléfono</dt>
                            <dd>
                                <a href="tel:">+54 { activeSale?.customer.phone }</a>
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
                                Método de Pago
                            </dt>
                            <dd>{ activeSale?.paymentDetails.method }</dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="flex items-center text-muted-foreground">
                                <CreditCard className="h-4 w-4" />
                                Visa
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