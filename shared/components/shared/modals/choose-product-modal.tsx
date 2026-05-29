'use client';

import { Dialog } from "@/shared/components/ui";
import { DialogContent, DialogTitle } from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import { Title } from "../title";
import { ChooseProductForm } from "../choose-produsct-form";
import { ProductWithRelations } from "@/@types/prisma";
import { ChoosePizzaForm } from "../choose-pizza-form";
import { useCartStore } from "@/shared/store";
import toast from "react-hot-toast";
import { ProductForm } from "../product-form";



interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
    const router = useRouter();
    // const firstItem = product.items[0];
    // const isPizzaForm = Boolean(firstItem.pizzaType)
    // const addCartItem = useCartStore((state) => state.addCartItem)
    // const loading = useCartStore((state) => state.loading)
    // const [addCartItem, loading] = useCartStore((state) => [state.addCartItem, state.loading])

    // const onAddProduct = () => { // добавляет продукт в корзину
    //     addCartItem({
    //         productItemId: firstItem.id
    //     });
    // }

    // const onAddPizza = async (productItemId: number, ingredients: number[]) => { // добавляет пицце в корзину
    //     // addCartItem({
    //     //     productItemId,
    //     //     ingredients
    //     // });
    //     try {
    //         await addCartItem({
    //             productItemId,
    //             ingredients
    //         });
    //         toast.success('Пицца добавлена в корзину')
    //         router.back()
    //     } catch (error) {
    //         toast.error('Не удалось добавить пиццу в корзину')
    //         console.error(error)
    //     }  
    // }

    // const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    //     try {
    //         // if (isPizzaForm && productItemId && ingredients) {
    //         //     await addCartItem({
    //         //         productItemId,
    //         //         ingredients
    //         //     });
    //         // } else {
    //         //     addCartItem({
    //         //         productItemId: firstItem.id
    //         //     });
    //         // }

    //         // если в функцию пришел productItemId это значит мы сейчас добавляем пиццу если нет то обычный товар
    //         // а ингредиенты могут быть и не быть
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

    // console.log('ChooseProductModal', product.items[0].pizzaType)

    return (
        <Dialog
            open={Boolean(product)} // open будет только в том случае если есть продукт
            onOpenChange={() => router.back()}
        >
            <DialogContent className={cn(
                'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
                className,
            )}>
                {/* <DialogTitle /> */}
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
                {/* <ChooseProductForm imageUrl={product.imageUrl} name={product.name} ingredients={[]} items={[]}/> */}
                {/* <Title text={product.name}/> */}
                <ProductForm product={product} onSubmit={() => router.back()}/>
            </DialogContent>
        </Dialog>
    )

}