import { NextResponse } from "next/server";
import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { customInitApp } from "@/firebase/admin-config";

customInitApp();


export async function GET() {

    const allPosterData = await getDocs(collection(db, 'posters'));
    let posters: any = []
    allPosterData.forEach((poster) => {
        posters.push({ ...poster.data(), id: poster.id })
    })

    return NextResponse.json(posters, {
        status: 200
    })
}

