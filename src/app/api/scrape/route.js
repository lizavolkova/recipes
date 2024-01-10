import getRecipe from "@/app/api/scrape/getRecipe";
export async function GET() {
    // const url = 'https://tasty.co/recipe/protein-packed-buddha-bowl'
    const url = 'https://adventuresincooking.com/pumpkin-pie/'
    const recipe = await getRecipe(url)
    return Response.json(recipe)
}