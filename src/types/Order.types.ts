import { PriceAndSize } from "./Product.types";

export type Order = {
    id: string,
    userId: string,
    total_sum: number,
    items: OrderItem[],
    number_of_items: number,
    createdAt?: any,
    paymentMethod?: string,
}

export type OrderItem = {
    item_id: string,
    priceAndSize: PriceAndSize,
    quantity: number,
    title?: string,
    img?: string
}