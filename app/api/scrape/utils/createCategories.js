import prisma from "../../../../lib/prisma";

const createCategories = async (categories) => {
    return await Promise.all(
        categories.map((category) =>
            prisma.category.upsert({
                where: {
                    name: category
                }, update: {},
                create: {
                    name: category
                }
            })
        )
    )
}

export default createCategories