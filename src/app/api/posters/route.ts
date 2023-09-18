import { NextResponse } from "next/server";
import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";

// export async function getAllPosters() {
//     const allPosterData = await getDocs(collection(db, 'posters'));
//     let posters: any = []
//     allPosterData.forEach((poster) => {
//         posters.push({ ...poster.data(), id: poster.id })
//     })
//     console.log('posters från db', posters);
// }


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

// export async function POST(request: any) {
//     const poster = await request.json()

//     const res = await fetch("http://localhost:4000/posters", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(poster)
//     })

//     const newPoster = await res.json();

//     return NextResponse.json(newPoster), {
//         status: 201
//     }
// }

