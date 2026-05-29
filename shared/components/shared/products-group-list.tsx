'use client';

import React from 'react';
import { useIntersection } from 'react-use';

import { Title } from './title';
import { ProductCard } from './product-card';
import { useCategoryStore } from '@/shared/store/category';
import { ProductWithRelations } from '@/@types/prisma';


interface Props {
  title: string;
  items: ProductWithRelations[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({ title, items, categoryId, className, listClassName }) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId); // достаем функцию setActiveId из стейта из хука useCategoryStore зустанда и передаем ее в setActiveCategoryId
  const intersectionRef = React.useRef<any>(null); // этот реф вешаем на тот объект на который проверяем в каком месте сейчас находимся и взависимости от этого что то делать
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4
  });

  // console.log('ProductWithRelations', items)

  React.useEffect(() => { // useEffect будет отлавливать изминения и в зависимости от этого оповещать глобальный стейт
    if (intersection?.isIntersecting) { // если болок в зоне видимости экрана то активируем конкретную категорию
      // console.log(title, categoryId)
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, title]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <div className="grid grid-cols-3 gap-[50px]">
        {items.map((item, i) => (
          <ProductCard
            key={item.id}
            id={item.id}
            name={item.name}
            imageUrl={item.imageUrl}
            price={item.items[0].price}
            ingredients={item.ingredients}
          />
        ))}
      </div>
    </div>
  );
};