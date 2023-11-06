import { NextResponse } from "next/server";
import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { customInitApp } from "@/firebase/admin-config";

customInitApp();


export async function GET() {
    try {
        const allPosterData = await getDocs(collection(db, 'posters'));
        let posters: any = []
        allPosterData.forEach((poster) => {
            posters.push({ ...poster.data(), id: poster.id })
        })

        return NextResponse.json(posters, {
            status: 200
        })
    } catch (error) {
        console.log('error i posters route', error);
        return NextResponse.json({ message: 'Something went wrong in posters route' }, { status: 503 });
    }
}

