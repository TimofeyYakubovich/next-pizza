import React from "react";
import { Filters } from "./use-filters";
import { useRouter } from "next/navigation";
import qs from "qs";


export const useQueryFilters = (filters: Filters) => {
    const router = useRouter()

    React.useEffect(() => {   
    
        const params = {
            ...filters.prices,
            pizzaTypes: Array.from(filters.pizzaTypes),
            sizes: Array.from(filters.sizes),
            ingredients: Array.from(filters.selectedIngredients),
        }

        const query = qs.stringify(params, {
            arrayFormat: 'comma',
        })
        router.push(`?${query}`, {
            scroll: false
        })

    }, [filters])
    // каждый раз когда меняется filters будет вызываться этот хук даже если параметры не изменились всеравно будет вызываться этот хук
    // похорошему бы сделать когда конвертируется params в строчку смотреть предыдущая и новая изменились или нет если нет то не вызывать хук
}