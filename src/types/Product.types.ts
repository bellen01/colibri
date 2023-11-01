export type Poster = {
    id: string,
    image: { img: string, altText: string }
    title: string,
    description: string,
    priceAndSize: PriceAndSize[],
    category?: number[];
    news?: boolean,
    topPicks?: boolean,
}

export type PriceAndSize = {
    size: string,
    price: number,
    currency?: string,
}

export type ProductCategory = {
    categoryId: number,
    categoryName: string,
}

export const productCategories: ProductCategory[] = [
    {
        categoryId: 1,
        categoryName: "svartvitt"
    },
    {
        categoryId: 2,
        categoryName: "landskap"
    },
    {
        categoryId: 3, categoryName: "blommor"
    },
    {
        categoryId: 4, categoryName: "droppar"
    },
    {
        categoryId: 5, categoryName: "insekter"
    },
    {
        categoryId: 6, categoryName: "djur"
    }
]
