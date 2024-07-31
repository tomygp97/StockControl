'use client'


import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


const Step2 = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [productId, setProductId] = useState<string | null>(null);

    useEffect(() => {
        const id = searchParams.get('productId');
        setProductId(id);
        // Aquí podrías cargar las variantes del producto usando `id`
    }, [searchParams]);
    return (
        <div>
            <h1>Step 2</h1>
            {productId ? (
                <p>Product ID: {productId}</p>
            ) : (
                <p>No product selected.</p>
            )}
        </div>
    )
}

export default Step2