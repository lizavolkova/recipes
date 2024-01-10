import * as cheerio from 'cheerio';
import parse from 'parse-ingredients';

export default async function handler(req, res
) {
    const url = 'https://tasty.co/recipe/protein-packed-buddha-bowl'
    // const url = 'https://adventuresincooking.com/pumpkin-pie/'
    const response = await fetch(url);
    const body = await response.text();


    const $ = cheerio.load(body);
    const jsonRaw = $(`script[type='application/ld+json']`)[0].children[0].data;
    const result = JSON.parse(jsonRaw);
    const recipe = findNested(result['@graph'] ? result['@graph'] : result, "@type", "Recipe")
    console.log(recipe)
    res.status(200).json(recipe)
}

const  findNested = (obj, key, value) => {
    // Base case
    if (obj[key] === value) {
        return obj;
    } else {
        for (let i = 0, len = Object.keys(obj).length; i < len; i++) {
            if (typeof obj[i] == 'object') {
                const found = findNested(obj[i], key, value);
                if (found) {
                    // If the object was found in the recursive call, bubble it up.
                    return found;
                }
            }
        }
    }
}