import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server"


export async function  GET(req: NextRequest) {
    // console.log(req)
    // console.log(req.nextUrl) // возвращается объект с параметрами ихз него достаем searchParams и из него query параметры
    // console.log(req.nextUrl.searchParams)
    // console.log(req.nextUrl.searchParams.get('query')) // делаем запрос http://localhost:3000/api/products/search?query=сырная получаем в консоль сырная
    // return NextResponse.json({})

    const query = req.nextUrl.searchParams.get('query') || ''; // с помощью этого слова делаем запрос в бд

    const products = await prisma.product.findMany({
        // where: {
        //     name: query // если оставить так то будет искать строго по слову query=сырная
        // }
        where: { // указываем что надо найти среди всез продуктов продукт у которого есть название name
        name: {
            contains: query,
            mode: 'insensitive', // чувствительность к регистру неважна
        },
        },
        take: 5, // возвращаем только 5 продуктов
        
    });

    return NextResponse.json(products);
}