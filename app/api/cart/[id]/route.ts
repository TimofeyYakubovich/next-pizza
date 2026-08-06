import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/shared/lib";
import { NextRequest, NextResponse } from "next/server";

// отправляем на сервер запрос допустим на cart/5 5 это id товара в корзине
// далее находим по id товар в корзине в нем обновляем quantity и еще что то если надо
// можно сделать и без вложенности app\api\cart\[id] а просто в файле app\api\cart\route.ts и доставать id из req

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        
        //const id = Number(params.id)  // их парамсов достаем id api/cart/5
        const { id: rawId } = await params;
        const id = Number(rawId);

        // const body = req.json()       // из рекуеста достаем то что надо обновить
        const data = (await req.json()) as { quantity: number };
        const token = req.cookies.get('cartToken')?.value

        if (!token) {
            return NextResponse.json({ error: 'Cart token not found' });
        }

        // если токен есть тоесть изминение корзины возможно только если товар был ранее добавлен
        // изменять корзину нельзя если товар ранее не добавлялся корзины значит нету

        const cartItem = await prisma.cartItem.findFirst({ // находим товар
            where: {
                id,
            },
        });

        if (!cartItem) {
            return NextResponse.json({ error: 'Cart item not found' });
        }

        await prisma.cartItem.update({
            where: {
                id,
            },
            data: {
                quantity: data.quantity,
            },
        });

        // находим товар по id и обновляем в нем только quantity
        // далее надо обновить саму корзину этот функционал вынесем в функцию updateCartTotalAmount
        const updatedUserCart = await updateCartTotalAmount(token);

        return NextResponse.json(updatedUserCart);
        
    } catch (error) {
        
        console.log('[CART_PATCH] Server error', error);
        return NextResponse.json({ message: 'Не удалось обновить корзину' }, { status: 500 });
        
    }
}


export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    try {

        // const id = Number(params.id)
        const { id: rawId } = await params;
        const id = Number(rawId);

        const token = req.cookies.get('cartToken')?.value

        if (!token) {
            return NextResponse.json({ error: 'Cart token not found' });
        };

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id,
            }
        });

        if (!cartItem) {
            return NextResponse.json({ error: 'Cart item not found' });
        }

        await prisma.cartItem.delete({
            where: {
                // id: Number(params.id),
                id: Number(id),
            },
        });

        const updatedUserCart = await updateCartTotalAmount(token);

        return NextResponse.json(updatedUserCart);

    } catch(error) {

        console.log('[CART_DELETE] Server error', error);
        return NextResponse.json({ message: 'Не удалось удалить корзину' }, { status: 500 });

    }

}