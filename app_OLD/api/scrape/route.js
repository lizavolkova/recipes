import getRecipe from "./getRecipe";
export async function GET() {
     // const url = 'https://tasty.co/recipe/protein-packed-buddha-bowl'
    // const url = 'https://adventuresincooking.com/pumpkin-pie/'
     const url = `https://www.halfbakedharvest.com/baked-crunchy-buffalo-chicken`
    // const url = `https://cooking.nytimes.com/recipes/1020631-thai-inspired-chicken-meatball-soup`

    const recipe = await getRecipe(url)
    return Response.json(recipe)
}