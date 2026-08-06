import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";


// export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    
    // const id = Number(params.id)
    const { id: rawId } = await params;
    const id = Number(rawId);

    const products = await prisma.product.findMany({
        where: {
            id
        },
        include: {
            items: true,
            ingredients: true,
        }
    })

    return NextResponse.json(products)
}