import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

// export function GET () { // теперь эта функция будет вызываться каждый раз когда делаем GET запрос на http://localhost:3000/api/users
//     // return {users: []} // так нельзя
//     return NextResponse.json({ // с помощью NextResponse делаем возвращение данных JSON
//         // тут указываем что хотим вернуть
//         users: ['user1', 'user2', 'user3'] // делаем запрос получаем {"users":["user1","user2","user3"]}
//     }); 
// } 

export async function GET () {
    // получаем данные все users с бд Postgre
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
} 

// POST запрос для создания пользователя
// что бы получить данные которые нам отправляет пользователь надо получить сам запрос req: NextRequest он типизируется с помощью NextRequest
export async function POST (req: NextRequest) {
    const body = await req.json() // в body будет сам объект с полями от пользователя
    // обращаемся к prisma в переменную user верни ответ который получен из бд после создня пользователя
    const user = await prisma.user.create({
        data: body
    })
    // полсе создня пользователя вернуть его на клиент
    return NextResponse.json(user);
} 