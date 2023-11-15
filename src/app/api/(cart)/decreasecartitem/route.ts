import { db } from "@/firebase/config";
import { PriceAndSize } from "@/types/Product.types";
import { arrayRemove, arrayUnion, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export type CartItems = {
    item_id: string,
    quantity: number,
    priceAndSize: PriceAndSize,
}

export async function PATCH(request: Request) {
    const req = await request.json();
    console.log('req body i decreasecartitem', req);
    try {
        const headersList = headers();
        const userId = headersList.get('userid');
        console.log('userId in decreasecartitem route', userId);
        const findCartCollection = query(collection(db, 'cart'), where('userId', '==', userId));
        const cartData = await getDocs(findCartCollection);
        let documentId: string = '';
        let data: any = [];
        let poster;
        // let posters: CartItems[];
        let posters: CartItems[] = [];
        console.log('cartData i decreasecartitem', cartData);
        if (cartData) {
            cartData.forEach(cartItem => {
                documentId = cartItem.id;
                data.push(cartItem.data());
                posters = posters.concat(cartItem.data().items);
                // posters = cartItem.data().items;
                // let poster = cartItem.data().items.find(item => item.id === req.item_id && item.priceAndSize.size === req.priceAndSize.size);
            })
            console.log('posters innan splice', posters);
            poster = posters.find(poster => poster.item_id === req.item_id && poster.priceAndSize.size === req.priceAndSize.size)
            console.log('documentId i decreasecartitem', documentId);
            console.log('data i decreasecartitem', data);
            console.log('poster', poster)

            if (poster && poster.quantity === 1) {
                posters.splice(posters.findIndex(poster => poster.item_id === req.item_id && poster.priceAndSize.size === req.priceAndSize.size), 1);
                console.log('posters efter splice', posters);
                try {
                    await updateDoc(doc(db, 'cart', documentId), {
                        items: posters
                    })
                    return NextResponse.json({ message: 'uppdaterat i decreasecartitem' }, { status: 200 });
                } catch (error) {
                    console.log('error i updatedoc i decreasecartitem', error);
                    return NextResponse.json({ message: 'error i decreasecartitem' }, { status: 400 });
                }
            } else if (poster && poster.quantity > 1) {
                posters.forEach(poster => {
                    if (poster.item_id === req.item_id) {
                        poster.quantity -= 1
                    }
                })
                console.log('posters efter foreach', posters);
                // return NextResponse.json({ message: 'uppdaterat i decreasecartitem' }, { status: 200 });
                try {
                    await updateDoc(doc(db, 'cart', documentId), {
                        items: posters
                    })
                    return NextResponse.json({ message: 'uppdaterat i decreasecartitem' }, { status: 200 });
                } catch (error) {
                    console.log('error i updatedoc i decreasecartitem', error);
                    return NextResponse.json({ message: 'error i decreasecartitem' }, { status: 400 });
                }
            }
        } else {
            console.log('inget cartData i deletecartitem route');
            return NextResponse.json({ message: 'Something went wrong in updatedoc i deletecartitem route' }, { status: 400 });
        }
    } catch (error) {
        console.log('error i getDocs i deletecartitem', error);
        return NextResponse.json({ message: 'Something went wrong in getdocs i deletecartitem route' }, { status: 400 });
    }
}