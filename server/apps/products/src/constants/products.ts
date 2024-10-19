export const includeProduct = {
    images: {
        select: {
            id: true,
            name: true,
            size: true,
        }
    },
    category: {
        select: {
            id: true,
            name: true,
            image: true,
            parentId: true
        }
    }
}