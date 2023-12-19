"use client";
import { getFavorites } from '@/app/(sharedLayout)/posters/fetchFunctions';
import FavoritesItem from '@/components/Favorites/FavoritesItem'
import styles from '@/components/styles/Favorites.module.scss';
import { Poster } from '@/types/Product.types';
import React, { useEffect, useState } from 'react'

const poster: Poster[] = [
    {
        id: "8",
        image: {
            img: "/IMG_9339.JPG",
            altText: "Temporär bild"
        },
        title: "Lila",
        description: "Bild på lila blad med vattendroppar",
        priceAndSize: [
            {
                size: "21x30",
                price: 99
            },
            {
                size: "30x40",
                price: 199
            }
        ],
        category: [
            3,
            4
        ],
        news: true,
        topPicks: true
    },
    {
        id: "9",
        image: {
            img: "/IMG_9544.JPG",
            altText: "Temporär bild"
        },
        title: "Surrounded",
        description: "Bild på ormbunkar",
        priceAndSize: [
            {
                size: "21x30",
                price: 99
            },
            {
                size: "30x40",
                price: 199
            }
        ],
        category: [
            2
        ],
        news: true,
        topPicks: true
    }
]

const Favorites = () => {
    const [favoritePosters, setFavoritePosters] = useState<Poster[]>([]);
    const [message, setMessage] = useState<string>()

    const getFavoritePosters = async () => {
        try {
            const res = await getFavorites();
            if (res.status === 200) {
                let posters: Poster[];
                posters = await res.json();
                if (posters.length !== 0) {
                    console.log('type: ' + typeof posters, posters);
                    setFavoritePosters(posters);
                } else {
                    setMessage('Du har inte några sparade favoriter ännu')
                    // setFavoritePosters(poster);
                }
            } else {
                setMessage('Något gick fel när vi skulle hämta produkterna')
            }
        } catch (error) {
            console.log('error i getFavoritePosters', error);
        }
        console.log('fc', favoritePosters)
    }

    useEffect(() => {
        getFavoritePosters();
    }, []);


    return (
        <div className={styles.wrapper}>
            <div className={styles.info}>
                <div className={styles.information}>
                    <h2 className={styles.h2}>Favoriter</h2>
                    {
                        favoritePosters?.length === 0 ?
                            <p>{message}</p>
                            :
                            favoritePosters?.map((poster) => (
                                <FavoritesItem favoritePoster={poster} key={poster.id} />
                            ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Favorites