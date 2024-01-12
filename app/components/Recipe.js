"use client"

export default  function Recipe({recipe}) {
    const image = recipe.image ? recipe.image : 'https://placehold.co/600x400';
    console.log(recipe)
    const reFetchData = async() => {
        const test = await fetch('/api/scrape', {
            method: 'POST',
            body: JSON.stringify(recipe.url)
        })
        const res = await test.json();
    }
    return (

        <div key={recipe.id} className="">
            <img src={image} className="object-cover h-48 w-96" />
            <div>
                {recipe.title}
            </div>
            <div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={reFetchData}>
                    Re fetch
                </button>
            </div>
            <div>
                CATEGORIES:
                {recipe.categories.map(category => {
                    return <span key={category.id}>{category.name}</span>
                })}
            </div>
            <div>
                CUISINE: {recipe.cuisine.name}
            </div>
            <div>
                {recipe.ingredients.map((ingredient) => {
                    return(
                        <div key={ingredient.id}>{ingredient.amount} {ingredient.measureDisplay} {ingredient.ingredient.name}</div>
                    )
                })}
            </div>
        </div>
    )
}