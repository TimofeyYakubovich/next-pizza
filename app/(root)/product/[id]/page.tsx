// странциа по пути localhost:3000/product/1

// import { Container, Title } from "@/components/shared";
import { ChooseProductForm, Container, ProductForm, Title } from "@/shared/components/shared";
// import { GroupVariants } from "@/shared/components/shared/group-variants";
// import { PizzaImage } from "@/shared/components/shared/pizza-image";
// import { Button } from "@/shared/components/ui";
import { prisma } from "@/prisma/prisma-client"
// import { notFound, useRouter } from "next/navigation"
import { notFound } from "next/navigation"
// import { ChoosePizzaForm } from "@/shared/components/shared/choose-pizza-form";
// import { useCartStore } from "@/shared/store";
// import toast from "react-hot-toast";

// хук useCartStore не умеет работать с асинхронной функцией всем компанентом если сделать 'use client'; не будут работать серверные запросы

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
    // const router = useRouter();
    
    const product = await prisma.product.findFirst({
        where: {
            id: Number(id)
        }, 
        include: {
            ingredients: true,
            category: { // категории для рекомендуемых товаров похорошему надо вынести в отдельный запрос что бы 1 делом получить продукт но можно оставить и так
                include: {
                    products: {
                        include: {
                            items: true,
                        }
                    }
                }
            },
            items: true,
        }
    })

    if(!product) {
        return notFound()
    }

    // const firstItem = product.items[0];
    // const isPizzaForm = Boolean(firstItem.pizzaType)

    // const addCartItem = useCartStore((state) => state.addCartItem)
    // const loading = useCartStore((state) => state.loading)

    // const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    //     try {
    //         const itemId = productItemId ?? firstItem.id 

    //         await addCartItem({
    //             productItemId: itemId,
    //             ingredients,
    //         });

    //         toast.success(product.name + ' добавлена в корзину')
    //         router.back()
    //     } catch (error) {
    //         toast.error('Не удалось добавить товар в корзину')
    //         console.error(error)
    //     }
    // }

    return (
        <Container className="flex flex-col my-10">
            {/* <div className="flex flex-1">
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

                    <Button
                        loading={loading}
                        onClick={() => onSubmit?.()}
                        className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                        Добавить в корзину за {product.} ₽
                    </Button>
                </div>
            </div> */}
            {/* {
                isPizzaForm ? (
                    <ChoosePizzaForm 
                        imageUrl={product.imageUrl} 
                        name={product.name} 
                        ingredients={product.ingredients}
                        items={product.items}
                        // onSubmit={onAddPizza}
                        onSubmit={onSubmit}
                        loading={loading}
                    />
                ) : (
                    <ChooseProductForm 
                        imageUrl={product.imageUrl} 
                        name={product.name} 
                        // onSubmit={onAddProduct}
                        onSubmit={onSubmit}
                        price={firstItem.price}
                        loading={loading}
                    />
                )
            } */}
            <ProductForm product={product} />
        </Container>
    );
}