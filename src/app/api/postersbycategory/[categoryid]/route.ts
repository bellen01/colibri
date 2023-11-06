import { db } from "@/firebase/config";
import { Poster } from "@/types/Product.types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";


export async function GET(
    request: Request, context: { params: { categoryid: number } }
) {
    try {
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
    } catch (error) {
        console.log('error i postersbycategory route', error);
        return NextResponse.json({ message: 'Something went wrong in postersbycategory categoryid route' }, { status: 400 });
    }
}