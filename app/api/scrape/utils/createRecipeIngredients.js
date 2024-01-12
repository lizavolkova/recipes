import prisma from "../../../../lib/prisma";
import {parseIngredient} from "parse-ingredient";

const createMeasure = async (measure) => {
    return await prisma.measure.upsert({
        where: {
            name: measure
        }, update: {
            name: measure
        },
        create: {
            name: measure
        }
    });
}

const createIngredient = async (name) => {
    return await prisma.ingredient.upsert({
        where: {
            name: name
        }, update: {
            name: name
        },
        create: {
            name: name
        }
    })
};

const createRecipeIngredient = async (amount, measureDisplay, ingredient, measure, url) => {
    const data = {
        amount,
        measureDisplay: measureDisplay,
        hashId: `${ingredient.name}+${url}`,
        recipes: {
            connect: {
                url
            }
        },
        ingredient: {
            connect: {
                id: ingredient.id
            }
        },
        measure: {
            connect: {
                id: measure.id
            }
        }
    }
    return await prisma.recipeIngredient.upsert({
        where: {
            hashId: `${ingredient.name}+${url}`
        }, update: data,
        create: data
    })

};

const createRecipeIngredients = async (ingredients, url) => {
        return await Promise.all(
            ingredients.map( async (ingredient) => {
                const parsedIngredient = parseIngredient(ingredient);
                const {quantity, unitOfMeasureID, unitOfMeasure, description} = parsedIngredient[0]
                const mes = await createMeasure(unitOfMeasureID || 'unit');
                const ings = await createIngredient(description);
                return await createRecipeIngredient(quantity, unitOfMeasure || 'unit', ings, mes, url)
            })
        )
}

export default createRecipeIngredients;