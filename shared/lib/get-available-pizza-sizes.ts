import { ProductItem } from '@prisma/client';
import { PizzaType, pizzaSizes } from '../constants/pizza';
import { Variant } from '../components/shared/group-variants';

export const getAvailablePizzaSizes = (type: PizzaType, items: ProductItem[]): Variant[] => {

    // если допустим выбираем тонкое тесто то будут дизейблиться те размеры у которых нет тонкого теста и тоже самое с традиционным
    const filteredPizzasByType = items.filter((item) => item.pizzaType === type) // фильтруем по выбранному типу теста

    return pizzaSizes.map((item) => ({
        name: item.name,
        value: item.value,
        disabled: !filteredPizzasByType.some((pizza) => Number(pizza.size) === Number(item.value))
    }))
    
}