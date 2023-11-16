import { db } from "@/firebase/config";
import { auth } from "@/firebase/config";
import { Favorite } from "@/types/Favorites.types";
import { Poster } from "@/types/Product.types";
import { FieldPath, collection, doc, documentId, getDoc, getDocs, query, updateDoc, where, arrayRemove } from "firebase/firestore";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function PATCH(
    request: Request
) {
    const req = await request.json();
    console.log('req body i updateFavorites', req);
    try {
        // const user = auth.currentUser; //TODO ger tillbaka null, varför? Fungerar i register route
        // console.log('user i favorites route', user);
        // const findFavorites = query(collection(db, 'favorites'), where('userId', '==', user?.uid));
        const headersList = headers();
        const userId = headersList.get('userid');
        console.log('userId in getuserdata route', userId);
        const findFavoritesCollection = query(collection(db, 'favorites'), where('userId', '==', userId));
        const favoritesData = await getDocs(findFavoritesCollection);

        // console.log('favoritesData i favorites route', favoritesData);
        // let favorites: Favorite[] = [];
        let favoritesIds: string[] = [];
        let documentId: string = '';

        favoritesData.forEach((poster) => {
            console.log('items', poster.data().items);
            // console.log(documentId);
            documentId = poster.id;
            favoritesIds = favoritesIds.concat(poster.data().items);
            // poster.data().items.forEach((item: any) => {
            //     console.log('item_id', item)
            //     favoritesIds.push(item);
            // })
            // favorites.push({ ...poster.data() as Favorite });
        })

        console.log('favorites i favorites route', favoritesIds);

        favoritesIds = favoritesIds.filter(item => item !== req.id);

        console.log('favoritesIds efter filter', favoritesIds);
        console.log('documentId', documentId);

        // return NextResponse.json({
        //     status: 200
        // })

        //Sätt att ta bort favoriteid från items om arrayRemove inte fanns
        // try {
        //     await updateDoc(doc(db, 'favorites', documentId), {
        //         items: favoritesIds
        //     });
        //     return NextResponse.json({ message: 'favorite removed' }, { status: 200 });
        // } catch (error) {
        //     console.log('error i updatedoc i updatefavorites route', error);
        //     return NextResponse.json({ message: 'Something went wrong in updatedoc i updatefavorites route' }, { status: 400 });
        // }

        try {
            await updateDoc(doc(db, 'favorites', documentId), {
                items: arrayRemove(req.id)
            });
            return NextResponse.json({ message: 'favorite removed' }, { status: 200 });
        } catch (error) {
            console.log('error i updatedoc i updatefavorites route', error);
            return NextResponse.json({ message: 'Something went wrong in updatedoc i updatefavorites route' }, { status: 400 });
        }

        // try {
        //     let posters: Poster[] = [];
        //     if (favoritesIds.length !== 0) {
        //         console.log('documentid', documentId())
        //         const findPostersByMultipleIds = query(collection(db, "posters"), where(documentId(), 'in', favoritesIds));
        //         const postersData = await getDocs(findPostersByMultipleIds);
        //         console.log('postersData i favorites route', postersData.docs);
        //         postersData.forEach((poster) => {
        //             // console.log('hej')
        //             // console.log('posters i foreach i favorites route', poster.data());
        //             posters.push({ ...poster.data() as Poster, id: poster.id })
        //         });
        //     }
        //     console.log('posters i favorites route', posters)
        //     return NextResponse.json(posters, {
        //         status: 200
        //     })
        // } catch (error) {
        //     console.log('error i favorites route', error);
        //     return NextResponse.json({ message: 'Something went wrong in favorites route' }, { status: 400 });
        // }

        // // const id = +context.params.id;
        // // const findById = query(collection(db, "posters"), where("id", "==", context.params.id));
        // const posterData = await getDoc(doc(db, "posters", context.params.id));
        // let poster: Poster = {
        //     ...posterData.data() as Poster, id: posterData.id
        // }
        // // let posters: Poster[] = []
        // // allPosterData.forEach((poster) => {
        // //     posters.push({ ...poster.data() as Poster, id: poster.id })
        // // })

        // console.log('context params', context.params);
        // console.log(poster)

    } catch (error) {
        console.log('error i favorites route', error);
        return NextResponse.json({ message: 'Something went wrong in favorites route' }, { status: 400 });
    }
}