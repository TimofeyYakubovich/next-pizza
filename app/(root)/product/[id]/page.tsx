// странциа по пути localhost:3000/product/1

// import { Container, Title } from "@/components/shared";
import { Container, Title } from "@/shared/components/shared";
import { GroupVariants } from "@/shared/components/shared/group-variants";
import { PizzaImage } from "@/shared/components/shared/pizza-image";
import { Button } from "@/shared/components/ui";
import { prisma } from "@/prisma/prisma-client"
import { notFound } from "next/navigation"

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
    const product = await prisma.product.findFirst({where: {id: Number(id)}})

    if(!product) {
        return notFound()
    }

    return (
        <Container className="flex flex-col my-10">
            <div className="flex flex-1">
                <PizzaImage imageUrl={product.imageUrl} size={40} />

                <div className="w-[490px] bg-[#f7f6f5] p-7">
                    <Title text={product.name} size="md" className="font-extrabold mb-1" />

                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>

                    <GroupVariants 
                        value="2"
                        items={[
                            {
                                name: 'Маленькая',
                                value: '1'
                            },
                            {
                                name: 'Средняя',
                                value: '2'
                            },
                            {
                                name: 'Большая',
                                value: '3',
                                disabled: true
                            },
                        ]}
                    />

                    {/* <Button
                        loading={loading}
                        onClick={() => onSubmit?.()}
                        className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                        Добавить в корзину за {product.} ₽
                    </Button> */}
                </div>
            </div>
            {/* <ProductForm product={product} /> */}
        </Container>
    );
}