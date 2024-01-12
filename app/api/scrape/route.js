import getRecipe from "./getRecipe";
import createRecipe from "./createRecipe";
export async function GET(request) {
    console.log(request)
     const url = 'https://tasty.co/recipe/protein-packed-buddha-bowl'
    //  const url = 'https://adventuresincooking.com/pumpkin-pie/'
    // const url = `https://www.halfbakedharvest.com/baked-crunchy-buffalo-chicken`
     // const url = `https://cooking.nytimes.com/recipes/1020631-thai-inspired-chicken-meatball-soup`

    console.log('fetching recipe data...')
    const recipeData = await getRecipe(url)
    console.log('recipe fetched!')
    console.log('uploading to DB...')
    const recipe = await createRecipe(recipeData, url)
    console.log('uploaded!')

    return Response.json({success: 'success'})
}

export async function POST(req) {
    const url = await req.json();

    console.log('fetching recipe data...')
    const recipeData = await getRecipe(url)
    console.log('recipe fetched!')
    console.log('uploading to DB...')
    const recipe = await createRecipe(recipeData, url)
    console.log('uploaded!')

    return Response.json({success: 'success'})
}