import { db } from "@/firebase/config";
import { Order } from "@/types/Order.types";
import { PriceAndSize } from "@/types/Product.types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export type CartData = {
    id: string,
    userId: string,
    items: PosterData[],
}

export type PosterData = {
    item_id: string,
    priceAndSize: PriceAndSize,
    quantity: number,
}

type PosterDetails = {
    id: string,
    quantity: number,
    priceAndSize: PriceAndSize
}

export async function GET(request: Request) {
    try {
        const headersList = headers();
        const userId = headersList.get('userid');
        const findCartItems = query(collection(db, 'cart'), where('userId', '==', userId));
        const cartData = await getDocs(findCartItems);

        let cartDetails: CartData[] = [];
        let items: PosterDetails[] = [];

        cartData.forEach((cartItem) => {
            cartDetails.push({ ...cartItem.data() as CartData, id: cartItem.id });
            cartItem.data().items.forEach((item: PosterData) => {
                items.push({ ...item, id: item.item_id })
            })
        });
        return NextResponse.json(items, {
            status: 200
        });
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong in getCartItems route' }, { status: 400 });
    }
}