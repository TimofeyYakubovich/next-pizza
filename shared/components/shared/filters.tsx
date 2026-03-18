'use client'

import React from 'react';
import { Title } from './title';
import { FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
// import { useFilreIngredient } from '@/hooks/useFilreIngredient';
// import { useSet } from 'react-use';
// import qs from 'qs';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { useIngredients } from '@/hooks/use-ingredients';
// import { useQueryFilters } from '@/hooks/use-query-filters';
// import { useFilters } from '@/hooks/use-filters';
import { useFilters, useIngredients, useQueryFilters } from '@/shared/hooks';

interface Props {
    className?: string
};

// interface PriceProps {
//     priceFrom?: number;
//     priceTo?: number;
// }

// interface QueryFilters extends PriceProps {
//     pizzaTypes: string;
//     sizes: string;
//     ingredients: string;
// }

export const Filters:React.FC<Props> = ({className}) => {
    // const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>
    // const router = useRouter()
    // const {ingredients, loading, onAddId, selectedIngredients} = useFilreIngredient(
    //     // searchParams.get('ingredients') ? searchParams.get('ingredients')?.split(',') : []
    //     searchParams.get('ingredients')?.split(','),
    // );
    // const [prices, setPrices] = React.useState<PriceProps>({
    //     priceFrom: 0, 
    //     priceTo: 1000
    // })
    // const [prices, setPrices] = React.useState<PriceProps>({
    //     priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    //     priceTo: Number(searchParams.get('priceTo')) || undefined
    // })

    // const [sizes, { toggle: toggleSizes }] = useSet<string>(new Set([]));
    // const [sizes, { toggle: toggleSizes }] = useSet<string>(new Set(new Set(searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : [])));
    // const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet<string>(new Set([]));
    // const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet<string>(new Set(searchParams.has('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : []));

    const {ingredients, loading} = useIngredients()

    const filters = useFilters();

    useQueryFilters(filters);

    const items = ingredients.map((item) => ({text: String(item.name), value: String(item.id)}))

    const updatePrices = (prices: number[]) => {
        // console.log(prices, 999);
        filters.setPrices('priceFrom', prices[0]);
        filters.setPrices('priceTo', prices[1]);
    };

    // const upDatePrice = (name: keyof PriceProps, value: number) => {
    //     setPrices({
    //         ...prices,
    //         [name]: value
    //     })
    // }

    // console.log(searchParams, 999)
    // console.log(searchParams.get('sizes'))

    // React.useEffect(() => {
    // //  console.log({prices, pizzaTypes, sizes, selectedIngredients})   

    //     const filters = {
    //         ...prices,
    //         pizzaTypes: Array.from(pizzaTypes),
    //         sizes: Array.from(sizes),
    //         ingredients: Array.from(selectedIngredients),
    //     }
    //     //конверктируем объект filters в url строку с помощью бибилиотеки qs
    //     // console.log(
    //     //     qs.stringify(filters), {
    //     //         arrayFomat: 'comma'
    //     //     }
    //     // )

    //     const query = qs.stringify(filters, {
    //         arrayFormat: 'comma',
    //     })
    //     // const query = (qs.stringify(filters))
    //     // вшиваем query в строку url как queryпараметр используем useRouter из next/navigation
    //     router.push(`?${query}`, {
    //         scroll: false
    //     })

    // }, [prices, pizzaTypes, sizes, selectedIngredients])
    
    return (
        <div className={className}>
            <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

            {/* <div className="flex flex-col gap-4">
                <FilterCheckbox text="Можно собирать" value="1" name='Can be collected' />
                <FilterCheckbox text="Новинки" value="2" name='New items' />
            </div> */}

            <CheckboxFiltersGroup
                className="mb-5"
                title="Тип теста:"
                name="pizzaTypes"
                // onClicCheckbox={togglePizzaTypes}
                // selected={pizzaTypes}
                onClicCheckbox={filters.setPizzaTypes}
                selected={filters.pizzaTypes}
                items={[
                    {text: 'Тонкое', value: '1'},
                    {text: 'Традиционное', value: '2'},
                ]}
            />

            <CheckboxFiltersGroup
                className="mb-5"
                title="Размеры:"
                name="sizes"
                // onClicCheckbox={toggleSizes}
                // selected={sizes}
                onClicCheckbox={filters.setSizes}
                selected={filters.sizes}
                items={[
                    {text: '20 см', value: '20'},
                    {text: '30 см', value: '30'},
                    {text: '40 см', value: '40'},
                ]}
            />

            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Цена от и до:</p>
                <div className="flex gap-3 mb-5">
                    <Input 
                        type="number" 
                        placeholder="0" 
                        min={0} 
                        max={1000} 
                        // value={String(prices.priceFrom)}
                        // onChange={(e) => upDatePrice('priceFrom', Number(e.target.value))}
                        value={String(filters.prices.priceFrom)}
                        onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
                    />
                    <Input 
                        type="number" 
                        min={100} 
                        max={1000} 
                        placeholder="1000" 
                        // value={String(prices.priceTo)}
                        // onChange={(e) => upDatePrice('priceTo', Number(e.target.value))}
                        value={String(filters.prices.priceTo)}
                        onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
                    />
                </div>
                {/* <RangeSlider min={0} max={5000} step={10} value={[0, 5000]} /> */}
                {/* <RangeSlider min={0} max={1000} step={10} value={[prices.priceFrom || 0, prices.priceTo || 1000]} 
                    onValueChange={([from, to]) => setPrices({priceFrom: from, priceTo: to})}
                /> */}
                <RangeSlider min={0} max={1000} step={10} value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]} 
                    onValueChange={updatePrices}
                />
            </div>
            <CheckboxFiltersGroup
                className="mt-5"
                title="Ингредиенты:"
                limit={6}
                items={items}
                loading={loading}
                name="ingredients"
                defaultItems={items.slice(0, 6)}
                // onClicCheckbox={(id: string) => console.log(id)}
                // onClicCheckbox={onAddId} // можно прописать и так ={onAddId} onAddId всеравно будет принимать аргумент (id: string) потому что это прописано в CheckboxFiltersGroup
                // selected={selectedIngredients}
                onClicCheckbox={filters.setSelectedIngredients}
                selected={filters.selectedIngredients}
            />
        </div>
    )
}