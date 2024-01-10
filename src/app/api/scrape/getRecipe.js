import * as cheerio from "cheerio";

export default async function getRecipe(url) {
    const response = await fetch(url);
    const body = await response.text();


    const $ = cheerio.load(body);
    const jsonRaw = $(`script[type='application/ld+json']`)[0].children[0].data;
    const result = JSON.parse(jsonRaw);
    return findNested(result['@graph'] ? result['@graph'] : result, "@type", "Recipe")
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