import { db } from "@/firebase/config";
import { CartProduct } from "@/types/CartProduct.types";
import { Poster, PriceAndSize } from "@/types/Product.types";
import { Timestamp, addDoc, collection, documentId, getDocs, query, where } from "firebase/firestore";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

type PosterDetails = {
    item_id?: string,
    priceAndSize?: PriceAndSize,
    quantity?: number,
    image?: {
        img?: string,
        altText?: string,
    },
    title?: string,
}

export async function PATCH(request: Request) {
    const req = await request.json();
    // req.products.forEach(async (product: CartProduct) => {
    //     try {
    //         const posterData = await getDoc(doc(db, "posters", product.id));
    //         let poster: Poster = {
    //             ...posterData.data() as Poster, id: posterData.id
    //         } 
    //     } catch (error) {

    //     }
    // })
    let orderProducts = req.products.map((product: CartProduct) => ( //TODO type orderProducts
        {
            item_id: product.id,
            priceAndSize: product.priceAndSize,
            quantity: product.quantity
        }
    ));

    let posterIds: string[] = [];
    req.products.forEach((product: CartProduct) => {
        posterIds = posterIds.concat(product.id)
    });
    console.log('posterIds', posterIds);

    // let posterDetails: PosterDetails[] = [];
    if (posterIds.length !== 0) {
        const findMultiplePostersById = query(collection(db, 'posters'), where(documentId(), 'in', posterIds))
        try {
            const postersData = await getDocs(findMultiplePostersById);
            console.log('postersData i saveorder route', postersData.docs);
            orderProducts = orderProducts.map((product: PosterDetails) => {
                let updatedObjectWithDBData;
                postersData.forEach(poster => {
                    console.log('i postersdata foreach');
                    if (poster.id === product.item_id) {
                        console.log('true');
                        updatedObjectWithDBData = { ...product, image: poster.data().image, title: poster.data().title }
                    }
                })
                return updatedObjectWithDBData;
            });
            console.log('orderProducts', orderProducts);
            return NextResponse.json({ message: 'Order saved' }, { status: 200 });
        } catch (error) {
            console.log('error i getdocs i saveorder route', error);
            return NextResponse.json({ message: 'Something went wrong in getDocs i saveorder route' }, { status: 400 });
        }
    }

    const headersList = headers();
    const userId = headersList.get('userid');
    const currentDate = new Date();
    const orderData = {
        userId: userId,
        items: orderProducts,
        number_of_items: req.number_of_items,
        total_sum: req.total_sum,
        paymentMethod: req.paymentMethod,
        createdAt: Timestamp.fromDate(currentDate)
    }

    console.log('orderData', orderData);


    // try {
    //     await addDoc(collection(db, 'orderhistory'), orderData);
    //     // await addDoc(collection(db, 'orderhistory'), {
    //     //     userId: userId,
    //     //     items: orderProducts,
    //     //     number_of_items: req.number_of_items,
    //     //     total_sum: req.total_sum,
    //     //     paymentMethod: req.paymentMethod,
    //     //     createdAt: Timestamp.fromDate(currentDate)
    //     // });
    //     return NextResponse.json({ message: 'Order saved' }, { status: 200 });
    // } catch (error) {
    //     console.log('error i addDoc i saveorder router', error);
    //     return NextResponse.json({ message: 'Something went wrong in addDoc i saveorder route' }, { status: 400 });
    // }
}