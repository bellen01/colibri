import { db } from "@/firebase/config";
import { User } from "@/types/User.types";
import { where, getDocs, collection, query } from "firebase/firestore";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET(request: Request) {
    try {
        const headersList = headers();
        const userId = headersList.get('userid');
        const findUser = query(collection(db, 'users'), where("userId", "==", userId));
        const userData = await getDocs(findUser);
        let userDetails: User[] = [];
        userData.forEach((user) => {
            userDetails.push({ ...user.data() as User, id: user.id })
        });

        return NextResponse.json(userDetails, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong in getuserdata route' }, { status: 400 });
    }
}