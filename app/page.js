import Image from 'next/image'
import prisma from '../lib/prisma';


async function getData() {
    const recipes = await prisma.recipe.findMany({
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

    const ingredients = await prisma.ingredient.findMany()

    return {
        props: { recipes, ingredients },
        revalidate: 10,
    };
};

export default async function Home({recipes, ingredients}) {
    const data = await getData()
    console.log(data.props.recipes, data.props.ingredients)
    return (

        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            hello from index!
        </main>

    )
}

