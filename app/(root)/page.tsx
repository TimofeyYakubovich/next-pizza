// import Image from "next/image";

import { Categories, Container, Filters, SortPopup, Title, TopBar } from "@/shared/components/shared";
import { ProductCard } from "@/shared/components/shared/product-card";
import { ProductsGroupList } from "@/shared/components/shared/products-group-list";
import { Button } from "@/shared/components/ui/button";
import { prisma } from "@/prisma/prisma-client";
import { Suspense } from "react";
import { GetSearchParams, findPizzas } from "@/shared/lib/find-pizzas";

// главная страница
// next.js пожет получать params из юрл и мы оттула вытаскивали id на странице ProductPage
// но еще может получать searchParams но в нексте не сделали отдельные типы для этого приходится самому типизировать
export default async function Home({searchParams}: {searchParams: GetSearchParams}) {

  // const categories = await prisma.category.findMany({ // достаем из призмы котегории
  //    include: {                                       // include делает то что можно взять вместе с category и ту связь котороя у нее есть
  //     products: {                                     // вместе с котегориями достем продукты
  //       include: {                                    
  //         items: true,                                 // вместе с продукты достем айтемсы
  //         ingredients: true
  //       }
  //     }
  //    }
  // })

  const categories = await findPizzas(searchParams);

  // console.log(categories)
  // console.log(categories[0].products)

  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar categories={categories.filter((category) => category.products.length > 0)}/>

      <Container className="mt-10 pb-14">
        <div className="flex gap-[60px]">
          <div className="w-[250px]">
            {/* <Filters /> */}
            {/* если компанент который использует хук useSearchParams() не обернуть в компанент Suspense то вся страница будет рендериться на уровне браузера
            html будет рендериться на уровне браузера оборачиваем в Suspense и теперь только Filters будет рендериться на стороне клиента */}
            <Suspense>
              <Filters />
            </Suspense>
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {/* <ProductsGroupList title="Пиццы" categoryId={0} items={[
                {
                  id: 1,
                  name: "Маргарита",
                  imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                  price: 390,
                }
              ]}/>
              <ProductsGroupList title="Закуски" categoryId={2} items={[
                {
                  id: 1,
                  name: "Маргарита",
                  imageUrl: "https://media.dodostatic.net/image/r:292x292/01995748a81f71df9566c15dc0cdeec6.jpg",
                  price: 390,
                }
              ]}/> */}
              {
                categories.map((category) => (
                  category.products.length > 0 && (
                    <ProductsGroupList 
                      key={category.id}
                      title={category.name}
                      categoryId={category.id} 
                      items={category.products}/>
                  )
                ))
              }
            </div>
          </div>
        </div>
      </Container>
    </>
    
  );
}
