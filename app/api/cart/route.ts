import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/shared/lib";
import { findOrCreateCart } from "@/shared/lib/find-or-create-cart";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";
import { NextRequest, NextResponse } from "next/server";
// import crypto from 'crypto';


export async function GET (req: NextRequest) {

    try {

        // надо сначало получить авторизлванного пользователя но пока мы ее не делали поэтому пока захардкодим так
        // const userId = 1
        // еще нвдо получить информацию о токене которую будем боать из куки
        const token = req.cookies.get('cartToken')?.value

        if (!token) { // если токена нету возвращаем пустую корзину
            return NextResponse.json({ totalAmount: 0, items: [] });
        }

        // когда человек хочет увидеть пиццу на экране) он делает запрос сервер проверят наличие токена 
        // если токена нету мы его генерируем и сохроняем в кукисах
        // если токен есть находим по нему корзину или по userId если нет корзины то создаем ее
        // далее добавляем пиццу в корзину

        const userCart = await prisma.cart.findFirst({
            where: {
                OR: [ // проверка на личие токена или userId тоесть найди корзину у который есть такой userId если его нет то по token
                        // {
                        //     userId,
                        // },
                        {
                            token,
                        }
                ]
            },
            include: { // говорим что надо получит из корзины все ее товары
                // items: true
                items: {
                    orderBy: { // отсортируй товары по createdAt
                        createdAt: 'desc'
                    },
                    include: { // вместе с items продуктом верни информацию о продукте
                        // productItem: true
                        productItem: { // не просто информацию а сам продукт вариацию
                            include: {
                                product: true // и внутри вариации дай информацию о самом продукте
                            }
                        },
                        ingredients: true // и его ингредиенты какие человек решил добавит к этому заказу
                    }
                },
            },
        })

        // return NextResponse.json({cart: []})
        return NextResponse.json(userCart)


    } catch(error) {
        console.log('[CART_GET] Server error', error);
        return NextResponse.json({ message: 'Не удалось получить корзину' }, { status: 500 });
    }

}


// добавление товара в корзину
// в идеале генерировать токен на сервере и вшивать его в браузер в куки и после уже находим корзину или создаем если ее нет
// как только юзер заходит на сайт нельзя сразу создавать корзину создаем только в том случае когда он добавляет товар в корзину и создаем токен и вшиваем в браузер

// в альдерадо например тоже есть токен но он не в куках хранится а иногда в сессии
// и без регистрации товары в корзине храняться в локлсторедже и только после регистрации они отправляются на бекенд но у нас попроще будет

// когда корзина еще не создана создаем токен создаем корзину вышиваем токен в корзину и добавляем товары в корзину

// при получении самой корзины создавать ее не будем
// и следующий раз когда есть токен по нему находим корзину и вшиваем туда товар

export async function POST(req: NextRequest) {

    try {

        let token = req.cookies.get('cartToken')?.value;

        if (!token) {
            token = crypto.randomUUID(); // если токена нет создаем его библиотекой crypto из ноды
        }

        // находим корзину по токену или если ее нет то создаем пустую корзину с этим токеном
        const userCart = await findOrCreateCart(token);

        const data = (await req.json()) as CreateCartItemValues;

        // есть ли в корзине тот товар который мы хотим добавить если есть просто увеличиваем его на 1

        // const findCartItem = await prisma.cartItem.findFirst({
        //     // товар надо находить не только по id но еще проверить ингредиенты совпадают с тем товаром котрый мы сейчас хотим добавить
        //     // если не совпадают то создать другой такой же товар с другими ингредиентами
        //     // если совпадают ингредиенты размер и тесто то добавляем на 1
        //     where: {
        //         cartId: userCart.id,
        //         productItemId: data.productItemId, // id товара вариации
        //         ingredients: { // проверяем что каждый id в массиве ingredients в этом cartItem совпадает с тем что прислали от клиента
        //             every: {
        //                 id: { in: data.ingredients },
        //             },
        //         },
        //     }
        // })

        // if (findCartItem) {
        //     await prisma.cartItem.update({
        //         where: {
        //             id: findCartItem.id,
        //         },
        //         data: {
        //             quantity: findCartItem.quantity + 1,
        //         }
        //     })
        // } else {
        //     await prisma.cartItem.create({
        //         data: {
        //             cartId: userCart.id,
        //             productItemId: data.productItemId,
        //             ingredients: { connect: data.ingredients?.map((id) => ({ id })) }
        //         }
        //     })
        // }
        const cartItems = await prisma.cartItem.findMany({
            where: {
                cartId: userCart.id,
                productItemId: data.productItemId,
            },
            include: {
                ingredients: true, // подгружаем ингредиенты каждого cartItem
            },
        });

        // Сортируем входящие ингредиенты для корректного сравнения
        // const sortedIncoming = [...data.ingredients].sort();
        let sortedIncoming: number[] = [];
        data.ingredients ? sortedIncoming = [...data.ingredients].sort() : sortedIncoming = []

        // Ищем cartItem у которого ингредиенты точно совпадают
        const findCartItem = cartItems.find((item) => {
            const itemIngredientIds = item.ingredients
                .map((i) => i.id)
                .sort();

            // Проверяем длину и каждый элемент
            if (itemIngredientIds.length !== sortedIncoming.length) return false;

            return itemIngredientIds.every(
                (id, index) => id === sortedIncoming[index]
            );
        });

        if (findCartItem) {
            // Ингредиенты совпали — увеличиваем количество
            await prisma.cartItem.update({
                where: { id: findCartItem.id },
                data: { quantity: { increment: 1 } },
            });
        } else {
            // Ингредиенты не совпали — создаём новый cartItem
            await prisma.cartItem.create({
                data: {
                    cartId: userCart.id,
                    productItemId: data.productItemId,
                    quantity: 1,
                    ingredients: {
                        connect: data.ingredients ? data.ingredients.map((id) => ({ id })) : [],
                    },
                },
            });
        }

        // обновляем totalAmount в корзине и возвращаем всю корзину
        const updatedUserCart = await updateCartTotalAmount(token);

        const resp = NextResponse.json(updatedUserCart);
        resp.cookies.set('cartToken', token); // вшиваем токен в ответ от бекенда
        // resp.cookies.set('cartToken', {
        //     value: token,
        //     maxAge: 7,
        //     name:
        // });
        return resp;

    } catch (error) {
        console.log('[CART_POST] Server error', error);
        return NextResponse.json({ message: 'Не удалось создать корзину' }, { status: 500 });
    }

}