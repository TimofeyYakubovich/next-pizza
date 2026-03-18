import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/dist/server/web/spec-extension/response";


export async function GET() {
  const ingredients = await prisma.ingredient.findMany();

  return NextResponse.json(ingredients);
}