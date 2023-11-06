"use client"
import React, { useEffect, useState } from 'react';
import Product from '@/components/Products/Product';
import styles from '@/components/styles/Products.module.scss';
import ProductFilter from '@/components/Products/ProductFilter';
import HeroHeading from '@/components/General/HeroHeading';
import { getAllPosters } from './fetchFunctions';
import { Poster } from '@/types/Product.types';
import Link from 'next/link';



const Products = () => {
    const [posters, setPosters] = useState<Poster[]>()

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


    useEffect(() => {
        getPosters()
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
                            <Link href={`/poster/${poster.id}`} key={poster.id}><Product product={poster} /></Link>
                        ))}
                    </div>
            }
        </div>
        //     </div>
        // </div>
    )
}

export default Products