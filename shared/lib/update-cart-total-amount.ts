import { prisma } from "@/prisma/prisma-client"
import { calcCartItemTotalPrice } from "./calc-cart-item-total-price";



export const updateCartTotalAmount = async (token: string) => {

    const userCart = await prisma.cart.findFirst({
        where: {
            token,
        },
        include: {
            items: {
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    productItem: {
                        include: {
                            product: true
                        }
                    },
                    ingredients: true
                }
            }
        }
    });

    if (!userCart) {
        return;
    }

    // если корзина нашласьб пробегись по всем товарам корзины и высчитай общую стоемость всех товаров

    const totalAmount = userCart.items.reduce((acc, item) => {
        return acc + calcCartItemTotalPrice(item);
    }, 0);

    // и обновляем totalAmount в самой корзине

    return await prisma.cart.update({
        where: { 
            id: userCart.id
        },
        data: {
            totalAmount
        },
        include: { // после того как обновили верни всю корзину
            items: {
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    productItem: {
                        include: {
                        product: true,
                        },
                    },
                    ingredients: true,
                },
            },
        },
    })

}