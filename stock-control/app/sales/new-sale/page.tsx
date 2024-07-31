'use client'


import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Steps
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";

const steps = [
    { label: 'Paso 1: Seleccionar Producto', path: '/sales/new-sale?step=step1' },
    { label: 'Paso 2: Seleccionar Variantes', path: '/sales/new-sale?step=step2' },
    { label: 'Paso 3: Confirmar Venta', path: '/sales/new-sale?step=step3' },
];

const NewSalePage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const step = searchParams.get('step');

    useEffect(() => {
        if (!step) {
            router.push(steps[0].path);
        }
    }, [step, router]);

    let StepComponent;
    switch(step) {
        case 'step1':
            StepComponent = Step1;
            break;
        case 'step2':
            StepComponent = Step2;
            break;
        case 'step3':
            StepComponent = Step3;
            break;
        default:
            StepComponent = Step1;
    }

    return (
        <StepComponent />
    )
}

export default NewSalePage