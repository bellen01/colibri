import React from 'react'
import { Poster } from '@/types/Product.types'
import { NextResponse } from 'next/server'
import { UserCredential } from 'firebase/auth'
import { User } from '@/types/User.types'


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

export const getFavorites = async () => { //TODO flytta till annan fil?
    const res = await fetch('/api/getFavorites', {
        next: {
            revalidate: 120
        }
    })
    return res;
}

export const getFavoritePostersIds = async () => {
    const res = await fetch('/api/getFavoritePostersIds', {
        next: {
            revalidate: 120
        }
    })
    return res;
}

export const updateFavorites = async (id: string) => {
    const res = await fetch('/api/updateFavorites', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id
        })
    })
    return res;
}

export const addFavorite = async (id: string) => {
    const res = await fetch('/api/addFavorite', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id
        })
    });
    return res;
}

export const verifySession = async (token: string) => { //TODO flytta till annan fil
    try {
        const res = await fetch('http://localhost:8090/api/verifycookie', {
            headers: {
                Cookie: `session=${token}`
            }
        });
        return res;
    } catch (error) {
        console.log('error i verifySession', error)
    }
}

