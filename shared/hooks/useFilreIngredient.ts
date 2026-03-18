// хук будет получать список ингредиентов и будет хранить выбранные ингредиенты
// потому что выбо ингредиентов будет не только на странице но и в модалке

import { Api } from "@/shared/services/api-client"
import { Ingredient } from "@prisma/client"
import React from "react"
import { useSet } from "react-use"

// type ingredientItem = {
//     id: number;
//     name: string;
// }

// type ingredientItem = Pick<Ingredient, "id" | "name">

// interface ReturnProps {
//     ingredients: Ingredient[],
//     // ingredients: ingredientItem[]
//     loading: boolean,
//     selectedIngredients: Set<string>,
//     onAddId: (id: string) => void
// }

// export const useFilreIngredient = (values: string[] = []): ReturnProps => {
    // const [ingredients, setIngredients] = React.useState<Ingredient[]>([])
    // const [ingredients, setIngredients] = React.useState<ReturnProps['ingredients']>([])
    // const [loading, setLoading] = React.useState(true)

    // const [selectedIds, { toggle }] = useSet<string>(new Set([])); // с помощью useSet будем хранить список выбранныз ингридиенотов
    // toggle может добавлять и ужалять элименты в Set
    // const [selectedIds, { toggle }] = useSet(new Set<string>(values));

    // React.useEffect(() => {
    //     async function feychIngredients () {
    //         try {
    //             setLoading(true)
    //             const ingredients = await Api.ingredients.getAll();
    //             setIngredients(ingredients)
    //             // setIngredients(
    //             //     ingredients.map((ingredient) => ({id: ingredient.id, name: ingredient.name}))
    //             // )
    //         } catch(error) {
    //             console.log(error)
    //         } finally {
    //             setLoading(false)
    //         }
    //     }

    //     // Api.ingredients
    //     // .getAll()
    //     // .then((data) => setItems(data))
    //     // .catch(error => console.log(error))

    //     feychIngredients();

    // }, [])

    // const setSelectedIngredients = (ids: string[]) => {
        
        // ids.forEach(selectedIds.add)
        // ids.forEach((id) => {
        //     if(selectedIds.has(id)) {
        //         selectedIds.delete(id)
        //     } else {
        //         selectedIds.add(id)
        //     }
        // })
    // }

    // return {ingredients, loading, onAddId: toggle, selectedIngredients: selectedIds}
// }