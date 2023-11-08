import { PriceAndSize } from "./Product.types";

export type Favorite = {
    id?: string,
    items: FavoriteItem[],
    createdAt?: any,
}

export type FavoriteItem = {
    userId: string,
    item_id: string,
    title?: string,
}