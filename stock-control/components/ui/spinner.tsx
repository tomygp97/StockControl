import { LoaderCircle } from "lucide-react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const spinnerVariants = cva(
    "inline-flex items-center justify-center rounded-full",
    {
        variants: {
            size: {
                default: "h-8 w-8",
                sm: "h-6 w-6",
                lg: "h-10 w-10",
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
);

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {}

export const Spinner = ({
    size,
}: SpinnerProps) => {
    return (
        <LoaderCircle className={cn(spinnerVariants({ size }))} />
    );
};
