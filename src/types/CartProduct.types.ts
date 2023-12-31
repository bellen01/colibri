import { PriceAndSize } from "./Product.types";

export type CartProduct = {
    id: string,
    title: string,
    quantity: number,
    priceAndSize: PriceAndSize,
    totalPrice: number,
}

// export type PriceAndSize = {
//     PriceAndSize: {
//         size: string,
//         price: number,
//         currency: string,
//     }
// }

