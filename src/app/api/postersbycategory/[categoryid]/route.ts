import { db } from "@/firebase/config";
import { Poster } from "@/types/Product.types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";


export async function GET(
    request: Request, context: { params: { categoryid: number } }
) {
    const id = +context.params.categoryid;
    const findByCategory = query(collection(db, "posters"), where("category", "array-contains", id));
    const allPosterData = await getDocs(findByCategory);
    let posters: Poster[] = []
    allPosterData.forEach((poster) => {
        posters.push({ ...poster.data() as Poster, id: poster.id })
    })

    console.log('context params', context.params, 3, "3");
    console.log(posters)

    return NextResponse.json(posters, {
        status: 200
    })
}

// export async function GET() {
//     const findByCategory = query(collection(db, "posters"), where("news", "==", true))
//     const allPosterData = await getDocs(findByCategory);
//     let posters: Poster[] = []
//     allPosterData.forEach((poster) => {
//         posters.push({ ...poster.data() as Poster, id: poster.id })
//     })

//     console.log('posters i postersbycategory', posters);

//     return NextResponse.json(posters, {
//         status: 200
//     })
// }