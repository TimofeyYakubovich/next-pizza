import { cn } from "@/shared/lib/utils";
import { Ingredient, ProductItem } from "@prisma/client";
import { Title } from "./title";
import { Button } from "../ui";


interface Props {
  imageUrl: string;
  name: string;
  items?: any[];
  loading?: boolean;
  price: number,
//   onSubmit: (itemId: number, ingredients: number[]) => void;
  // onClickAdd?: VoidFunction;
  onSubmit: VoidFunction;
  className?: string;
}

export const ChooseProductForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  loading,
  price,
  onSubmit,
  className,
}) => {

    // const textDetaills = '30 см, традиционное тесто'
    // const totalPrice = 350

    return (
        <div className={cn(className, 'flex flex-1')}>

            <div className="flex items-center justify-center flex-1 relative w-full">
              <img
                src={imageUrl}
                alt={name}
                className={cn('relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]')}
              />
            </div>
            

            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1" />

                {/* <p className="text-gray-400">{textDetaills}</p> */}

                <Button
                    loading={loading}
                    // onClick={handleClickAdd}
                    // onClick={onSubmit} // так передается весь огромный объект события в onSubmit
                    onClick={() => onSubmit?.()} // сейчас ее просто вызываем
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                    Добавить в корзину за {price} ₽
                </Button>
            </div>
        </div>
    )

}