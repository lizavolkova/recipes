import Image from 'next/image'
import prisma from '../lib/prisma';
import Recipe from "./components/Recipe";


async function getData() {
    return await prisma.recipe.findMany({
        include: {
            ingredients: {
                include: {
                    measure: true,
                    ingredient: true
                }
            },
            categories: true,
            cuisine: true
        }
    });

    // const ingredients = await prisma.ingredient.findMany()
    //
    // return {
    //     props: { recipes, ingredients },
    //     revalidate: 10,
    // };
};

export default async function Home() {
    const recipes = await getData();

    return (

        <main className="flex min-h-screen flex-col items-center justify-between p-24">
           <div className="grid grid-cols-3 gap-4">
               {recipes && recipes.map(recipe => {
                   return (
                       <Recipe key={recipe.name} recipe={recipe} />
                   )
               })}
           </div>
        </main>

    )
}

