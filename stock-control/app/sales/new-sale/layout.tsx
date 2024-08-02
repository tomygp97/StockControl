'use client'


import Link from 'next/link';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useSearchParams } from "next/navigation";
import { ProductProvider } from '../context/ProductContext';

const steps = [
    { label: 'Seleccionar Producto', path: '/sales/new-sale?step=step1' },
    { label: 'Seleccionar Variantes', path: '/sales/new-sale?step=step2' },
    { label: 'Confirmar Venta', path: '/sales/new-sale?step=step3' },
];

const NewSaleLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const searchParams = useSearchParams();
    const step = searchParams.get('step');

    return (
        <ProductProvider>
            <div className="flex min-h-screen w-full flex-col bg-muted/40">
                <div className=" flex flex-col sm:gap-4 sm:py-4">
                    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-border px-4 sm_static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                        <Breadcrumb className="hidden md:flex">
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href="/sales">Ventas</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                {step === 'step1' && (
                                    <>
                                        <BreadcrumbPage>{steps[0].label}</BreadcrumbPage>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbLink asChild>
                                                <Link href={steps[1].path}>{steps[1].label}</Link>
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbLink asChild>
                                                <Link href={steps[2].path}>{steps[2].label}</Link>
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                    </>
                                )}
                                {step === 'step2' && (
                                    <>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink asChild>
                                                <Link href={steps[0].path}>{steps[0].label}</Link>
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbPage>{steps[1].label}</BreadcrumbPage>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbLink asChild>
                                                <Link href={steps[2].path}>{steps[2].label}</Link>
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                    </>
                                )}
                                {step === 'step3' && (
                                    <>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink asChild>
                                                <Link href={steps[0].path}>{steps[0].label}</Link>
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbLink asChild>
                                                <Link href={steps[1].path}>{steps[1].label}</Link>
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbPage>{steps[2].label}</BreadcrumbPage>
                                    </>
                                )}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </header>
                    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                        {children}
                    </main>
                </div>
            </div>
        </ProductProvider>
    )
}

export default NewSaleLayout