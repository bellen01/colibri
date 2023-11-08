import React from 'react'
import { Poster } from '@/types/Product.types'
import { NextResponse } from 'next/server'
import { UserCredential } from 'firebase/auth'
import { User } from '@/types/User.types'


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

//getallposters innan jag skrev om den
// export const getAllPosters = async (): Promise<Poster[] | undefined> => {
//     // try {
//     const res = await fetch("/api/posters", {
//         next: {
//             revalidate: 120
//         }
//     })
//     if (res.status !== 200) {
//         throw new Error('Something went wrong');
//     } else {
//         const data = await res.json();
//         return data;
//     }
//     // } catch (error) {
//     //     console.log('error in getAllPosters', error);
//     // }
// }

export const getAllPosters = async () => {
    // try {
    const res = await fetch("/api/posters", {
        next: {
            revalidate: 120
        }
    })

    return res;

    // if (res.status !== 200) {
    //     throw new Error('Something went wrong');
    // } else {
    //     const data = await res.json();
    //     return data;
    // }

    // } catch (error) {
    //     console.log('error in getAllPosters', error);
    // }
}

//getposterbycategory innan jag skrev om den
// export const getPostersByCategory = async (categoryid: number): Promise<Poster[] | undefined> => {
//     // try {
//     console.log('categoryid in getPostersByCategory fetch', categoryid, 3, "3")
//     const res = await fetch(`/api/postersbycategory/${categoryid}`, {
//         next: {
//             revalidate: 120
//         }
//     })
//     if (res.status !== 200) {
//         throw new Error('Something went wrong');
//     } else {
//         const data = await res.json();
//         return data;
//     }
//     // } catch (error) {
//     //     console.log('error in fetching posters by category', error)
//     // }
// }

export const getPostersByCategory = async (categoryid: number) => {
    // try {
    // console.log('categoryid in getPostersByCategory fetch', categoryid, 3, "3")
    const res = await fetch(`/api/postersbycategory/${categoryid}`, {
        next: {
            revalidate: 120
        }
    })
    return res;
    // if (res.status !== 200) {
    //     throw new Error('Something went wrong');
    // } else {
    //     const data = await res.json();
    //     return data;
    // }
    // } catch (error) {
    //     console.log('error in fetching posters by category', error)
    // }
}

//getPosterById innan jag skrev om den:
// export const getPosterById = async (id: string): Promise<Poster | undefined> => {
//     // try {
//     const res = await fetch(`/api/posters/${id}`, {
//         next: {
//             revalidate: 120
//         }
//     })

//     if (res.status !== 200) {
//         throw new Error('Something went wrong');
//     } else {
//         const data = await res.json();
//         return data;
//     }
//     // } catch (error) {
//     //     console.log('error i getPosterById', error);
//     // }
// };

export const getPosterById = async (id: string) => {
    // try {

    const res = await fetch(`/api/posters/${id}`, {
        next: {
            revalidate: 120
        }
    })
    return res;
    // if (res.status !== 200) {
    //     throw new Error('Something went wrong');
    // } else {
    //     const data = await res.json();
    //     return data;
    // }


    // } catch (error) {
    //     console.log('error i getPosterById', error);
    // }
};

export const getFavorites = async () => {
    const res = await fetch('/api/getFavorites', {
        next: {
            revalidate: 120
        }
    })
    return res;
}

export const verifySession = async (token: string) => { //TODO flytta till annan fil
    try {
        const res = await fetch('http://localhost:8090/api/verifycookie', {
            headers: {
                Cookie: `session=${token}`
            }
        });
        console.log('res i verifySession', res)
        return res;
    } catch (error) {
        console.log('error i verifySession', error)
    }
}

// export const verifySession = async (token: string) => { //TODO varför fungerar inte det här?
//     // try {
//     const res = await fetch('http://localhost:8090/api/verifycookie', {
//         headers: {
//             Cookie: `session=${token}`
//         }
//     });
//     console.log('res i verifySession', res)
//     if (res.status !== 200) {
//         throw new Error('Something went wrong');
//     } else {
//         return res;
//     }

// export const getPoster = async (id: number): Promise<Poster> => {
//     const res = await fetch(`http://localhost:4000/posters/${id}`, {
//         next: {
//             revalidate: 60
//         }
//     })

//     return res.json()
// }

// export const loginUser = async (email: string, password: string) => { //TODO flytta till annan fil
//     try {
//         const res = await fetch('/api/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 email: email,
//                 password: password,
//             }),
//         })
//         const data = await res.json();
//         console.log('data i loginUser', data);
//         return data;
//         // return NextResponse.json(data);
//     } catch (error) {
//         console.log('error i loginUser', error);
//     }
// }

// export const registerUser = async (email: string, password: string) => { //TODO flytta till annan fil
//     try {
//         const res = await fetch('/api/register', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 email: email,
//                 password: password,
//             }),
//         })
//         const data = await res.json();
//         console.log('data i registerUser', data);
//         return data;
//         // return NextResponse.json(data);
//     } catch (error) {
//         console.log('error i registerUser', error);
//     }
// }

// export async function logoutUser() { //TODO flytta till annan fil
//     const response = await fetch('/api/logout', {
//         method: 'POST',
//     });
//     if (response.status === 200) {
//         console.log('logout successful');
//         return response;
//     };
// };

// export const getUserData = async (): Promise<User[] | undefined> => { //TODO flytta till annan fil
//     try {
//         const res = await fetch('/api/getuserdata', {
//             next: {
//                 revalidate: 120
//             }
//         });
//         const data = await res.json();
//         console.log('data in getuserdata', data);
//         return data;
//     } catch (error) {
//         console.log('error in getuserdata', error);
//     }
// }



// try {
//     const userCredential = await signInWithEmailAndPassword(auth, context.params.email, context.params.password);
//     console.log('user', userCredential.user);
//     // dispatch(setUser(userCredential.user));
// } catch (error) {
//     console.log('fel i signinwithemailandpassword', error);
// }


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

