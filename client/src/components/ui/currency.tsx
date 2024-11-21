"use client"

import { useEffect, useState } from "react";

const formater = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

interface CurrencyProps {
    value: number | string;
}

const Currency: React.FC<CurrencyProps> = ({value}) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) {
        return null
    }

    return (
        <span className="font-semibold">
            {formater.format(Number(value))}
        </span>
    )
}

export default Currency;