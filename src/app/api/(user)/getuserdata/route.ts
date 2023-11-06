import { db } from "@/firebase/config";
import { User } from "@/types/User.types";
import { getDoc, doc, where, getDocs, collection, query } from "firebase/firestore";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET(request: Request) {
    try {
        const headersList = headers();
        const userId = headersList.get('userid');
        console.log('userId in getuserdata route', userId);
        // const req = await request.json();
        // console.log('req i body i user route', req);
        const findUser = query(collection(db, 'users'), where("userId", "==", userId));
        const userData = await getDocs(findUser);
        // console.log('userData from db', userData[0].data());
        // let userDetails: User = userData[0].data() as User; //TODO fungerar inte
        let userDetails: User[] = [];
        userData.forEach((user) => {
            userDetails.push({ ...user.data() as User, id: user.id })
        });
        // let userDetails: User = userData[0] //TODO fungerar inte
        // userData.forEach((user) => {
        //     userDetails.push({ ...poster.data() as Poster, id: poster.id })
        // })
        // let user: User = {
        //     ...userData.data() as User, id: userData.id
        // };
        // console.log('user i user route', user);

        return NextResponse.json(userDetails, {
            status: 200
        })
    } catch (error) {
        console.log('error in getuserdata route', error);
        return NextResponse.json({ message: 'Something went wrong in getuserdata route' }, { status: 400 });
    }
}