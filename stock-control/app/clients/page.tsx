'use client'

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { File, ListFilter, PlusCircle, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import ClientTable from "./components/ClientTable";


const Clients = () => {
    return (
        <div className="flex flex-col sm:gap-4">
            <main className="grid flex-1 items-start sm:px-6 sm:py-0 md:gap-8">
                <Tabs defaultValue="all">
                    <div className="flex items-center">
                        <div className="ml-auto flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="h-8 gap-1">
                                        <ListFilter className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                            Filtros
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                            </DropdownMenu>
                            <Button size="sm" variant="outline" className="h-8 gap-1">
                                <File className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Export
                                </span>
                            </Button>
                            <Link href="/products/new-product">
                                <Button size="sm" className="h-8 gap-1">
                                    <PlusCircle className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Nuevo Cliente
                                    </span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <TabsContent value="all">
                        <Card>
                            <CardHeader className="grid grid-cols-2">
                                <div>
                                    <CardTitle>Clientes</CardTitle>
                                    <CardDescription>
                                        Visualiza los clientes registrados.
                                    </CardDescription>
                                </div>
                                <div className="ml-auto flex-1 md:grow-0">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Buscar..."
                                        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                                        // value={search}
                                        // onChange={handleSearchChange}
                                    />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ClientTable />
                            </CardContent>
                            <CardFooter>
                                Card Footer
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}

export default Clients