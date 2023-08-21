export type Product = {
    Id?: number,
    Title: string,
    Description: string,
    PriceAndSize: PriceAndSize[];
}

export type PriceAndSize = {
    PriceAndSize: {
        size: string,
        price: number,
        currency: string,
    }
}