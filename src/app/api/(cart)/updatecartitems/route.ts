import { db } from "@/firebase/config";
import { addDoc, arrayUnion, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { CartItems } from "../decreasecartitem/route";
import { CartProduct } from "@/types/CartProduct.types";


export async function PATCH(request: Request) {
    const req = await request.json();
    console.log('req body i updatecartitems', req);
    console.log('req products', req.products);
    const dataFromRedux = req.products.map((product: CartProduct) => (
        {
            item_id: product.id,
            priceAndSize: product.priceAndSize,
            quantity: product.quantity
        }
    ));
    console.log('datafromredux', dataFromRedux);
    // return NextResponse.json({ message: 'cartitems replaced' }, { status: 200 });
    try {
        const headersList = headers();
        const userId = headersList.get('userid');
        console.log('userId in updatecartitems route', userId);
        const findCartCollection = query(collection(db, 'cart'), where('userId', '==', userId));
        const cartData = await getDocs(findCartCollection);
        let documentId: string = '';
        console.log('cartData', cartData);
        if (cartData) {
            cartData.forEach(cartItem => {
                documentId = cartItem.id;
            })
            console.log('documentId i updatecartitems route', documentId);
            if (documentId) {
                try {
                    await updateDoc(doc(db, 'cart', documentId), {
                        items: dataFromRedux
                    });
                    return NextResponse.json({ message: 'cartitems replaced' }, { status: 200 });
                } catch (error) {
                    console.log('error i updatedoc i updatecartitems route', error);
                    return NextResponse.json({ message: 'Something went wrong in updatedoc i updatecartitems route' }, { status: 400 });
                }
            } else {
                try {
                    await addDoc(collection(db, 'cart'), {
                        userId: userId,
                        items: dataFromRedux
                    });
                    return NextResponse.json({ message: 'cartItems added to new document' }, { status: 200 });
                } catch (error) {
                    console.log('error i addDoc i updatecartitems route', error);
                    return NextResponse.json({ message: 'Something went wrong in adddoc i updatecartitems route' }, { status: 400 });
                }
            }
        } else {
            console.log('inget cartData i updatecartitems route');
            return NextResponse.json({ message: 'Something went wrong in adddoc i updatecartitems route' }, { status: 400 });
        }
    } catch (error) {
        console.log('error i getDocs i updatecartitems', error);
        return NextResponse.json({ message: 'Something went wrong in getdocs i updatecartitems route' }, { status: 400 });
    }
}