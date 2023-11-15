import { db } from "@/firebase/config";
import { Order } from "@/types/Order.types";
import { PriceAndSize } from "@/types/Product.types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export type Cart = {
    id: string,
    userId: string,
    items: CartItem[],
}

type CartItem = {
    item_id: string,
    priceAndSize: PriceAndSize,
    quantity: number,
}

export async function GET(request: Request) {
    try {
        const headersList = headers();
        const userId = headersList.get('userid');
        console.log('userId in getuserdata route', userId);
        const findCartItems = query(collection(db, 'cart'), where('userId', '==', userId));
        const cartData = await getDocs(findCartItems);

        console.log('cartData', cartData);
        let cartDetails: Cart[] = [];

        cartData.forEach((cartItem) => {
            cartDetails.push({ ...cartItem.data() as Cart, id: cartItem.id });
        });

        console.log('cartDetails', cartDetails);

        return NextResponse.json(cartDetails, {
            status: 200
        });

    } catch (error) {
        console.log('error i getCartItems route', error);
        return NextResponse.json({ message: 'Something went wrong in getCartItems route' }, { status: 400 });
    }
}