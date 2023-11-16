import { db } from "@/firebase/config";
import { addDoc, arrayUnion, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { CartItems } from "../decreasecartitem/route";


export async function PATCH(request: Request) {
    const req = await request.json();
    console.log('req body i addcartitem', req);
    try {
        const headersList = headers();
        const userId = headersList.get('userid');
        console.log('userId in getuserdata route', userId);
        const findCartCollection = query(collection(db, 'cart'), where('userId', '==', userId));
        const cartData = await getDocs(findCartCollection);
        let documentId: string = '';
        let poster;
        let posters: CartItems[] = [];
        console.log('cartData', cartData);
        if (cartData) {
            cartData.forEach(cartItem => {
                documentId = cartItem.id;
                posters = posters.concat(cartItem.data().items);
            })
            console.log('documentId', documentId);
            poster = posters.find(poster => poster.item_id === req.item_id && poster.priceAndSize.size === req.priceAndSize.size)
            if (!poster) {
                try {
                    await updateDoc(doc(db, 'cart', documentId), {
                        items: arrayUnion(req)
                    });
                    return NextResponse.json({ message: 'cartitem added' }, { status: 200 });
                } catch (error) {
                    console.log('error i updatedoc i addcartitem route', error);
                    return NextResponse.json({ message: 'Something went wrong in updatedoc i addcartitem route' }, { status: 400 });
                }
            } else if (poster) {
                posters.forEach(poster => {
                    if (poster.item_id === req.item_id && poster.priceAndSize.size === req.priceAndSize.size) {
                        poster.quantity += req.quantity
                    }
                })
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

            // if (documentId) {
            //     console.log('i try catch efter documentid')
            //     try {
            //         await updateDoc(doc(db, 'cart', documentId), {
            //             items: arrayUnion(req)
            //         });
            //         return NextResponse.json({ message: 'cartitem added' }, { status: 200 });
            //     } catch (error) {
            //         console.log('error i updatedoc i addcartitem route', error);
            //         return NextResponse.json({ message: 'Something went wrong in updatedoc i addcartitem route' }, { status: 400 });
            //     }
            // } else {
            //     try {
            //         await addDoc(collection(db, 'cart'), {
            //             userId: userId,
            //             items: [req]
            //         });
            //         return NextResponse.json({ message: 'cartItem added to new document' }, { status: 200 });
            //     } catch (error) {
            //         console.log('error i addDoc i addcartitem route', error);
            //         return NextResponse.json({ message: 'Something went wrong in adddoc i addcartitem route' }, { status: 400 });
            //     }
            // }
        } else {
            console.log('inget cartData i addcartitem route');
            return NextResponse.json({ message: 'Something went wrong in adddoc i addcartitem route' }, { status: 400 });
        }
    } catch (error) {
        console.log('error i getDocs i addcartitem', error);
        return NextResponse.json({ message: 'Something went wrong in getdocs i addcartitem route' }, { status: 400 });
    }
}