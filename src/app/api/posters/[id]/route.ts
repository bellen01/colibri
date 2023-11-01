import { db } from "@/firebase/config";
import { Poster } from "@/types/Product.types";
import { getDoc, collection, doc } from "firebase/firestore";
import { NextResponse } from "next/server";


export async function GET(
    request: Request, context: { params: { id: string } }
) {
    // const id = +context.params.id;
    // const findById = query(collection(db, "posters"), where("id", "==", context.params.id));
    const posterData = await getDoc(doc(db, "posters", context.params.id));
    let poster: Poster = {
        ...posterData.data() as Poster, id: posterData.id
    }
    // let posters: Poster[] = []
    // allPosterData.forEach((poster) => {
    //     posters.push({ ...poster.data() as Poster, id: poster.id })
    // })

    console.log('context params', context.params);
    console.log(poster)

    return NextResponse.json(poster, {
        status: 200
    })
}