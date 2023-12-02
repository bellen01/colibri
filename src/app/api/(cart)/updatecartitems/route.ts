import { db } from "@/firebase/config";
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { CartProduct } from "@/types/CartProduct.types";


export async function PATCH(request: Request) {
    const req = await request.json();
    const dataFromRedux = req.products.map((product: CartProduct) => (
        {
            item_id: product.id,
            priceAndSize: product.priceAndSize,
            quantity: product.quantity
        }
    ));
    try {
        const headersList = headers();
        const userId = headersList.get('userid');
        const findCartCollection = query(collection(db, 'cart'), where('userId', '==', userId));
        const cartData = await getDocs(findCartCollection);
        let documentId: string = '';
        if (cartData) {
            cartData.forEach(cartItem => {
                documentId = cartItem.id;
            })
            if (documentId) {
                try {
                    await updateDoc(doc(db, 'cart', documentId), {
                        items: dataFromRedux
                    });
                    return NextResponse.json({ message: 'cartitems replaced' }, { status: 200 });
                } catch (error) {
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
                    return NextResponse.json({ message: 'Something went wrong in adddoc i updatecartitems route' }, { status: 400 });
                }
            }
        } else {
            return NextResponse.json({ message: 'Something went wrong in adddoc i updatecartitems route' }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong in getdocs i updatecartitems route' }, { status: 400 });
    }
}