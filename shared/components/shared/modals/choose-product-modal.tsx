'use client';

import { Dialog } from "@/shared/components/ui";
import { DialogContent, DialogTitle } from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import { Title } from "../title";
import { ChooseProductForm } from "../choose-produsct-form";
import { ProductWithRelations } from "@/@types/prisma";
import { ChoosePizzaForm } from "../choose-pizza-form";



interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
    const router = useRouter();
    const isPizzaForm = Boolean(product.items[0].pizzaType)

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
                {
                    isPizzaForm ? (
                        <ChoosePizzaForm 
                            imageUrl={product.imageUrl} 
                            name={product.name} 
                            ingredients={product.ingredients}
                            items={product.items}
                        />
                    ) : (
                        <ChooseProductForm imageUrl={product.imageUrl} name={product.name}/>
                    )

                }
                {/* <ChooseProductForm imageUrl={product.imageUrl} name={product.name} ingredients={[]} items={[]}/> */}
                {/* <Title text={product.name}/> */}
            </DialogContent>
        </Dialog>
    )

}