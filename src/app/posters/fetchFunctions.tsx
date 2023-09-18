import React from 'react'
import { Poster } from '@/types/Product.types'

// export const getPosters = async (): Promise<Poster[] | undefined> => {
//     try {
//         const res = await fetch("http://localhost:4000/posters", {
//             next: {
//                 revalidate: 120 //0 används för att inte cacha nånting, 60 är en minut osv
//             }
//         })
//         return res.json()
//     } catch (error) {
//         console.log('error in getPosters', error);
//     }
// }

export const getAllPosters = async (): Promise<Poster[] | undefined> => {
    try {
        const res = await fetch("/api/posters", {
            next: {
                revalidate: 120
            }
        })
        return res.json()
    } catch (error) {
        console.log('error in getAllPosters', error);
    }
}

export const getPostersByCategory = async (categoryid: number): Promise<Poster[] | undefined> => {
    try {
        console.log('categoryid in getPostersByCategory fetch', categoryid, 3, "3")
        const res = await fetch(`/api/postersbycategory/${categoryid}`, {
            next: {
                revalidate: 120
            }
        })
        return res.json();
    } catch (error) {
        console.log('error in fetching posters by category', error)
    }
}

export const getPosterById = async (id: string): Promise<Poster | undefined> => {
    try {
        const res = await fetch(`/api/posters/${id}`, {
            next: {
                revalidate: 120
            }
        })
        return res.json();
    } catch (error) {
        console.log('error i getPosterById', error);
    }
};


// export const getPosterByCategory = async (): Promise<Poster[] | undefined> => {
//     try {
//         const res = await fetch("/api/postersbycategory/", {
//             next: {
//                 revalidate: 120
//             }
//         })
//         return res.json();
//     } catch (error) {
//         console.log('error in fetching posters by category', error)
//     }
// }

// export const getPosters = async (): Promise<Poster[] | undefined> => {
//     try {
//         const res = await fetch("http://localhost:4000/posters", {
//             next: {
//                 revalidate: 120 //0 används för att inte cacha nånting, 60 är en minut osv
//             }
//         })
//         return res.json()
//     } catch (error) {
//         console.log('error in getPosters', error);
//     }
// }

// export const getPostersByCategory = async (categoryId: number) => {
//     try {
//         const res = await fetch(`http://localhost:4000/posters/`).then((data) => data.)
//     } catch (error) {
//         console.log('error in getPostersByCategory', error);
//     }
// }

export const getPoster = async (id: number): Promise<Poster> => {
    const res = await fetch(`http://localhost:4000/posters/${id}`, {
        next: {
            revalidate: 60
        }
    })

    return res.json()
}