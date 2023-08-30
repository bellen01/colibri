export type Poster = {
    id: number,
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

// <Link href="#">Topplistan</Link>
// <Link href="#">Nyheter</Link>
// <Link href="#">Svartvitt</Link>
// <Link href="#">Landskap</Link>
// <Link href="#">Blommor</Link>
// <Link href="#">Droppar</Link>
// <Link href="#">Insekter</Link>
// <Link href="#">Djur</Link>

// export const products: Product[] = [
//     {
//         Id: 1,
//         image: "/3827_2.jpg",
//         Title: "Hav",
//         Description: "Bild på hav",
//         PriceAndSize: [{
//             size: "21x30",
//             price: 99,
//         },
//         {
//             size: "30x40",
//             price: 199,
//         }],
//         category: "Landskap",
//         news: true,
//         topPicks: true,
//     },
//     {
//         Id: 2,
//         image: "/3827_2.jpg",
//         Title: "Blomma",
//         Description: "Bild på blomma",
//         PriceAndSize: [{
//             size: "21x30",
//             price: 99,
//         },
//         {
//             size: "30x40",
//             price: 199,
//         }],
//         category: "Blommor",
//         news: false,
//         topPicks: false,
//     },
//     {
//         Id: 3,
//         image: "/3827_2.jpg",
//         Title: "Drops",
//         Description: "Bild på vattendroppar",
//         PriceAndSize: [{
//             size: "21x30",
//             price: 99,
//         },
//         {
//             size: "30x40",
//             price: 199,
//         }],
//         category: "Droppar",
//         news: true,
//         topPicks: false,
//     }
// ]