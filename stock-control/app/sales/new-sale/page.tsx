import Link from "next/link";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, PlusCircle } from "lucide-react";
import SelectProductSold from "../components/SelectProductSold";

const page = () => {
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className=" flex flex-col sm:gap-4 sm:py-4">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-border px-4 sm_static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Breadcrumb className="hidden md:flex">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/">Inicio</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/sales">Ventas</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbPage>Nueva Venta</BreadcrumbPage>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                        <div className="flex items-center gap-4">
                            <Link href="/sales">
                                <Button variant="outline" size="icon" className="h-7 w-7">
                                    <ChevronLeft className="h-4 w-4" />
                                    <span className="sr-only">Volver</span>
                                </Button>
                            </Link>
                            <div className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                                Ingresar Nueva Venta
                            </div>
                            <div className="hidden items-center gap-2 md:ml-auto md:flex">
                                <Link href="/sales">
                                    <Button variant="outline" size="sm">
                                        Volver
                                    </Button>
                                </Link>
                                <Button size="sm">Guardar</Button>
                            </div>
                        </div>
                        <div className="grid gap-4 lg:gap-8 md:grid-cols-[1fr_250px] lg:grid-cols-3">
                            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                                <Card>
                                    <Dialog>
                                        <CardHeader className="grid grid-cols-2">
                                            <CardTitle>Producto</CardTitle>
                                            <DialogTrigger asChild>                    
                                                <Button variant="outline" size="sm" className="w-1/2 ml-auto">
                                                    Agregar
                                                    <PlusCircle className="ml-2 h-4 w-4"/>
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                {/* //TODO: Dialog donde selecciono el producto vendido */}
                                            </DialogContent>
                                            <CardDescription>
                                                Seleccione el producto vendido.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <SelectProductSold />
                                        </CardContent>
                                    </Dialog>
                                </Card>
                            </div>
                            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            Total de la Venta
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6">
                                            <div className="grid gap-3">
                                                <Label className="text-muted-foreground">Monto</Label>
                                                <div className="text-lg font-semibold">$ 34000.00</div>
                                            </div>
                                            <div className="grid gap-3">
                                                {/* //TODO: Implementar costos */}
                                                <Label className="text-muted-foreground">Compra</Label>
                                                <Input type="text" className="w-full" defaultValue="Proximamente..." disabled />
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <div className="text-xs text-muted-foreground">+35% de ganancia</div>
                                    </CardFooter>
                                </Card>
                                <Card className="overflow-hidden">
                                    <CardHeader>
                                        <CardTitle>Detalles Adicionales</CardTitle>
                                        <CardDescription>
                                            informacion adicional sobre el producto
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Input type="text" className="w-full" defaultValue="Proximamente..." disabled />
                                        {/* <div className="grid gap-6">Proximamente...</div> */}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default page