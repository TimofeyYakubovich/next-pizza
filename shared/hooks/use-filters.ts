import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useSet } from "react-use";


interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}

interface QueryFilters extends PriceProps {
    pizzaTypes: string;
    sizes: string;
    ingredients: string;
}

export interface Filters {
  sizes: Set<string>;
  pizzaTypes: Set<string>;
  selectedIngredients: Set<string>;
  prices: PriceProps;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void;
  setPizzaTypes: (value: string) => void;
  setSizes: (value: string) => void;
  setSelectedIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>
    const router = useRouter()

    const [selectedIngredients, { toggle: toggleIngredients }] = useSet(new Set<string>(searchParams.get('ingredients')?.split(','),));

    const [sizes, { toggle: toggleSizes }] = useSet<string>(new Set(new Set(searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : [])));

    const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet<string>(new Set(searchParams.has('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : []));

    const [prices, setPrices] = React.useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined
    })

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrices((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    // return {
    //     sizes,
    //     prices,
    //     pizzaTypes,
    //     selectedIngredients,
    //     setPrices: upDatePrice,
    //     setPizzaTypes: togglePizzaTypes,
    //     setSizes: toggleSizes,
    //     setSelectedIngredients: toggleIngredients,
    // }

    return React.useMemo(
        () => ({
            sizes,
            pizzaTypes,
            selectedIngredients,
            prices,
            setPrices: updatePrice,
            setPizzaTypes: togglePizzaTypes,
            setSizes: toggleSizes,
            setSelectedIngredients: toggleIngredients,
            }),
        [sizes, pizzaTypes, selectedIngredients, prices],
  );
}