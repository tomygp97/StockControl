'use client'

import Link from 'next/link'

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/components/ui/tooltip";
import {
    Home,
    LineChart,
    Package,
    Settings,
    ShoppingCart,
    Users2,
    Tags,
    TrendingDown,
} from "lucide-react";
import { usePathname } from 'next/navigation';


export const SideBar = () => {
const pathname = usePathname();

    return (
        <div>
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                <TooltipProvider>
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                    <Link
                        href="/home"
                        // className={`group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:h-8 md:w-8 md:text-base ${
                        //     pathname === '/home' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                        // }`}
                        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                    >
                        <Home className="h-4 w-4 transition-all group-hover:scale-110" />
                        <span className="sr-only">Inicio</span>
                    </Link>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/sales"
                                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
                                    pathname === '/sales' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                                }`}
                                // className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <ShoppingCart className="h-5 w-5" />
                                <span className="sr-only">Ventas</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Ventas</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/products"
                                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
                                    pathname === '/products' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                                }`}
                                // className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Package className="h-5 w-5" />
                                <span className="sr-only">Productos</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Productos</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/investments"
                                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
                                    pathname === '/investments' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                                }`}
                                // className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <TrendingDown className="h-5 w-5" />
                                <span className="sr-only">Inversiones</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Inversiones</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/prices"
                                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
                                    pathname === '/prices' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                                }`}
                                // className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Tags className="h-5 w-5" />
                                <span className="sr-only">Precios</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Precios</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/clients"
                                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
                                    pathname === '/clients' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                                }`}
                                // className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Users2 className="h-5 w-5" />
                                <span className="sr-only">Clientes</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Clientes</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/statistics"
                                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
                                    pathname === '/statistics' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                                }`}
                                // className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <LineChart className="h-5 w-5" />
                                <span className="sr-only">Estadísticas</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Estadísticas</TooltipContent>
                    </Tooltip>
                </nav>
                {/* <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Settings className="h-5 w-5" />
                                <span className="sr-only">Settings</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Settings</TooltipContent>
                    </Tooltip>
                </nav> */}
                </TooltipProvider>
            </aside>
        </div>
    )
}