import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';
import { parseIngredient } from 'parse-ingredient';
import createCategories from "./utils/createCategories";
import createRecipeIngredients from "./utils/createRecipeIngredients";

export default async function createRecipe(recipe, url) {
    const title = recipe.name;
    // const url = recipe.mainEntityOfPage;
    const cuisine = typeof recipe.recipeCuisine === "string" ? recipe.recipeCuisine : recipe.recipeCuisine[0]
    const recipeYield = recipe.recipeYield[0];
    const categories = typeof recipe.recipeCategory === "string" ? recipe.recipeCategory.split() : recipe.recipeCategory;
    const { description } = recipe;
    const recipeImage = typeof recipe.image === "string" ? recipe.image.split() : recipe.image;
    const image = recipeImage ? recipeImage[0] : 'https://placehold.co/600x400';

    const ingredients = recipe.recipeIngredient;
    const createdCategories = await createCategories(categories);

    const data = {
        title,
        description,
        url,
        recipeYield,
        image,
        cuisine: {
            connectOrCreate: {
                create: {
                    name: cuisine,
                },
                where: {
                    name: cuisine,
                },
            }
        },
        categories: {
            connect: createdCategories.map((cat) => ({id: cat.id}))
        }
    }

    console.log('uploading recipe to DB...')
    const recipeRes = await prisma.recipe.upsert({
        where: {
            url: url
        }, update: data,
        create: data,
        include: {
            categories: true
        }
    });

    return await createRecipeIngredients(ingredients, url);
}


// https://stackoverflow.com/questions/72330721/prisma-create-post-with-n-amount-of-categories-explicit-many-to-many
