import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  sizes?: string;
  pizzaTypes?: string;
  ingredients?: string;
  priceFrom?: string;
  priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findPizzas = async (params: GetSearchParams) => {
    // достаем из юрл размеры типы пицц и ингредиенты разбиваем строки по , и делаем из них массив намберов
    const sizes = params.sizes?.split(',').map(Number);
    const pizzaTypes = params.pizzaTypes?.split(',').map(Number);
    const ingredientsIdArr = params.ingredients?.split(',').map(Number);

    const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
    const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

    const categories = await prisma.category.findMany({
        include: {                                       
            products: {
                orderBy: { // сортируем продукты по id
                    id: 'desc' // 'desc' (descending) — сортировка по убыванию, от большего к меньшему
                },
                where: {
                    // делаем поиск найти продукты у которых ingredients слеующий если есть массив ингредиентов из параметров
                    // тогда создай объект с элиментами в одном из этих ingredients должно быть то что есть в одном из ingredientsIdArr
                    ingredients: ingredientsIdArr ? {
                        some: { // поиск делаем по id
                            id: {
                                in: ingredientsIdArr // в массиве ingredients в обеъектах ищем не по имени а по id найди те id которые есть внутри массива ingredientsIdArr
                            }
                        }
                    } : undefined, // если ingredientsIdArr не передан возврощай undefined
                    items: {   // добавляем еще поиск по ProductItem если в бд в items есть что то из массива sizes тоже включай его в массив categories
                        some: {
                            size: {
                                in: sizes // если в бд в items есть что то из массива sizes тоже включай его в массив categories
                            },
                            pizzaType: {
                                in: pizzaTypes,
                            },
                            price: {
                                gte: minPrice, // >=
                                lte: maxPrice, // <=
                            },
                        }
                    }
                },
                // include: {                                    
                //     items: true,                                 // вместе с продукты достем айтемсы
                //     ingredients: true
                // }                          
                include: {
                    ingredients: true, // включаем ингредиенты потому что в продукте есть ингредиенты базовые
                    items: {
                        where: { // вместе с сортировкой выдай только те которые влазят по цене
                            price: { // с этим поиском он возврощае целый продукт и в нем будут лежать те items вариации которые влазят по цене
                                gte: minPrice, // без этого поиска если хотя бы 1 items не соответсвтует верхнему условию по цене он весь продукт не вернет
                                lte: maxPrice,
                            },
                        },
                        orderBy: {
                                price: 'asc', // что бы массив products склеился с ProductItem и отсортировал по цене 'asc' (ascending) — сортировка по возрастанию
                        },
                    },
                },
            }
        }
    })

    return categories;
}