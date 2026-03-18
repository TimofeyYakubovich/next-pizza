'use client';

import React from "react";
import { cn } from "@/shared/lib/utils";
import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";
import { Button } from "../ui";
import { GroupVariants } from "./group-variants";
import { mapPizzaType, PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from "@/shared/constants/pizza";
import { IngredientItem } from "./ingredient-item";
import { useSet } from "react-use";
import { calcTotalPizzaPrice, getAvailablePizzaSizes, getPizzaDetails } from "@/shared/lib";
import { usePizzaOptions } from "@/shared/hooks";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
//   onSubmit: (itemId: number, ingredients: number[]) => void;
  onClickAddCart?: VoidFunction;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  loading,
  onClickAddCart,
//   onSubmit,
  className,
}) => {

    const {
      size, 
      type, 
      setSize, 
      setType, 
      selectedIngredients, 
      addIngredient, 
      availableSizes, 
      // currentItemId
    } = usePizzaOptions(items)

    const { totalPrice, textDetaills } = getPizzaDetails(
      type,
      size,
      items,
      ingredients,
      selectedIngredients,
    );

    // const [size, setSize] = React.useState<PizzaSize>(20);
    // const [type, setType] = React.useState<PizzaType>(1);

    // const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));

    // const textDetaills = '30 см, традиционное тесто'

    // const pizzaPrice = items.find((item) => item.pizzaType === type && item.size === size)?.price || 0;
    // const totalIngredientsPrice = ingredients
    //   .filter((ingredient) => selectedIngredients.has(ingredient.id)) // берем все ингредиенты и исключаем из иних то что мы не выбирали
    //   .reduce((acc, ingredient) => acc + ingredient.price, 0)
    // const totalPrice = pizzaPrice + totalIngredientsPrice

    // const totalPrice = calcTotalPizzaPrice( type, size, items, ingredients, selectedIngredients)
    
    // const totalPrice = 350
    // const size = 30
    // console.log(ingredients)
    // console.log(items)

    // const textDetaills = `${size} см, ${mapPizzaType[type]} пицца`

    const handleClickAdd = () => {
      onClickAddCart?.()
      console.log({
        size,
        type,
        ingredients: selectedIngredients,
      })
    }

    // если допустим выбираем тонкое тесто то будут дизейблиться те размеры у которых нет тонкого теста и тоже самое с традиционным
    // const filteredPizzasByType = items.filter((item) => item.pizzaType === type) // фильтруем по выбранному типу теста
    // const avilablePizzaSizes = pizzaSizes.map((item) => ({
    //   name: item.name,
    //   value: item.value,
    //   disabled: !filteredPizzasByType.some((pizza) => Number(pizza.size) === Number(item.value))
    // }))

    // React.useEffect(() => {
    //   // что бы при смене типа теста размер не изменялся всегда на первый маленький если до этого был выбран не маленький и если она не задизейблена
    //   const isAvilableSizes = avilablePizzaSizes?.find((item) => Number(item.value) === size && !item.disabled)
    //   // при перекоючении типа теста в модалке берем первый незадизейбленый передаем его в стейт что бы не было бага с ценой
    //   const avilableSizes = avilablePizzaSizes?.find((item) => !item.disabled)

    //   if( !isAvilableSizes && avilableSizes) {
    //     setSize(Number(avilableSizes.value) as PizzaSize)
    //   }

    // }, [type])

    // console.log(items, filteredPizzasByType)

    return (
        <div className={cn(className, 'flex flex-1')}>

            <PizzaImage imageUrl={imageUrl} size={size} />
            
            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1" />

                <p className="text-gray-400">{textDetaills}</p>

                <div className="flex flex-col gap-4 mt-5">

                  <GroupVariants 
                    // items={pizzaSizes}
                    // items={avilablePizzaSizes}
                    items={availableSizes}
                    value={String(size)} 
                    onClick={(value) => setSize(Number(value) as PizzaSize)}
                  />

                  <GroupVariants
                    items={pizzaTypes}
                    value={String(type)}
                    onClick={(value) => setType(Number(value) as PizzaType)}
                  />

                </div>

                <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
                  <div className="grid grid-cols-3 gap-3">
                    {ingredients.map((ingredient) => (
                      <IngredientItem
                        key={ingredient.id}
                        name={ingredient.name}
                        price={ingredient.price}
                        imageUrl={ingredient.imageUrl}
                        onClick={() => addIngredient(ingredient.id)}
                        active={selectedIngredients.has(ingredient.id)}
                      />
                    ))}
                  </div>
                </div>
                
                

                <Button
                    // loading={loading}
                    onClick={handleClickAdd}
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                    Добавить в корзину за {totalPrice} ₽
                </Button>
            </div>
        </div>
    )

}