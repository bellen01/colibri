import { db } from "@/firebase/config";
import { User } from "@/types/User.types";
import { getDoc, doc, where, getDocs, collection, query } from "firebase/firestore";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { Order } from "@/types/Order.types";

export async function GET(request: Request) {
    try {
        const headersList = headers();
        const userId = headersList.get('userid');
        console.log('userId in getuserdata route', userId);
        const findOrderHistory = query(collection(db, 'orderhistory'), where("userId", "==", userId));
        const orderData = await getDocs(findOrderHistory);

        console.log('orderData', orderData)
        let orderDetails: Order[] = [];

        orderData.forEach((order) => {
            const timestamp = order.data().createdAt;
            const date = order.data().createdAt.toDate().toDateString();
            const date2 = order.data().createdAt.seconds;
            const date3 = order.data().createdAt.toDate();
            console.log('timestamp', timestamp);
            console.log('date', date);
            console.log('date2', date2);
            console.log('date3', date3)
            orderDetails.push({ ...order.data() as Order, id: order.id, createdAt: date2 });
        });

        console.log('orderDetails', orderDetails)
        // console.log('timestamp as date', orderDetails[0].createdAt.toDate());
        // console.log('timestamp as only date', orderDetails[0].createdAt.toDate().toDateString());

        return NextResponse.json(orderDetails, {
            status: 200
        });
    } catch (error) {
        console.log('error in getorderhistory route', error);
        return NextResponse.json({ message: 'Something went wrong in getorderhistory route' }, { status: 400 });
    }
}