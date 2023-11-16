"use client"
import React, { useEffect, useState } from 'react';
import Product from '@/components/Products/Product';
import styles from '@/components/styles/Products.module.scss';
import ProductFilter from '@/components/Products/ProductFilter';
import HeroHeading from '@/components/General/HeroHeading';
import { getAllPosters, getFavoritePostersIds } from './fetchFunctions';
import { Poster } from '@/types/Product.types';
import Link from 'next/link';



const Products = () => {
    const [posters, setPosters] = useState<Poster[]>()
    const [favoriteIds, setFavoriteIds] = useState<string[]>();

    const getPosters = async () => {
        try {
            const res = await getAllPosters();
            if (res.status === 200) {
                let postersData: Poster[];
                postersData = await res.json();
                setPosters(postersData);
            }
        } catch (error) {
            console.log('error i getPosters', error);
        }
    }

    const getFavoriteIds = async () => {
        try {
            const res = await getFavoritePostersIds();
            if (res.status === 200) {
                let ids: string[] = await res.json();
                console.log('ids i product page', ids);
                if (ids.length !== 0) {
                    console.log('ids i product page', ids);
                    setFavoriteIds(ids);
                } else {
                    console.log('Det finns inga favoriter');
                }
            } else {
                console.log('något gick fel');
            }
        } catch (error) {
            console.log('error i trycatch i getFavoriteIds', error);
        }
    }


    useEffect(() => {
        getPosters()
        getFavoriteIds();
        // getPosters().then((data) => setPosters(data));
        // getAllPosters().then((data) => setPosters(data));
        // getAllPosters().then((data) => setPosters(data));
    }, []);
    // const posters = await getPosters();


    return (
        // <div className={styles.container}>
        //     <HeroHeading heading={"Posters"} />
        //     <div className={styles.filterAndProductsContainer}>
        //         <ProductFilter />
        <div>
            {
                !posters
                    ?
                    <p>Något gick fel</p>
                    :
                    <div className={styles.wrapper}>
                        {posters?.map((poster: Poster) => (
                            <Product product={poster} favoriteIds={favoriteIds} key={poster.id} />
                        ))}
                    </div>
            }
        </div>
        //     </div>
        // </div>
    )
}

export default Products