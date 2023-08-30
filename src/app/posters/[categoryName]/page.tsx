"use client"
import React, { useEffect, useState } from 'react';
import Product from '@/components/Products/Product';
import styles from '@/components/styles/Products.module.scss';
import ProductFilter from '@/components/Products/ProductFilter';
import HeroHeading from '@/components/General/HeroHeading';

import { Poster } from '@/types/Product.types';
import Link from 'next/link';
import { getPosters } from '../fetchFunctions';
import { productCategories } from '@/types/Product.types';

type Params = {
    params: {
        categoryName: string
    }
}

// type category = {
//     id: number
// }

const PostersByCategory = ({ params }: Params) => {
    const [posters, setPosters] = useState<Poster[]>()
    const [categoryId, setCategoryId] = useState<number>()

    const mapCategories = () => {
        const mappedCategories = productCategories.find((category) => category.categoryName === params.categoryName)
        console.log('kategori', mappedCategories);
        setCategoryId(mappedCategories?.categoryId);
    }


    const getPosterByCategory = async () => {
        try {
            if (categoryId) {
                const posters = await getPosters();
                const postersByCategory = posters?.filter((category) => category.category?.includes(categoryId))
                console.log('postersbycategory', postersByCategory);
                setPosters(postersByCategory);
            }
        } catch (error) {
            console.log('error in fetching posters by category', error)
        }
    }

    useEffect(() => {
        mapCategories();
        console.log('categoryid', categoryId)
        getPosterByCategory()
    }, [categoryId]);


    return (
        // <div className={styles.container}>
        //     <HeroHeading heading={"Posters"} />
        //     <div className={styles.filterAndProductsContainer}>
        //         <ProductFilter />
        <div className={styles.wrapper}>
            {posters?.map((poster: Poster) => (
                <Link href={`/poster/${poster.id}`} key={poster.id}><Product product={poster} /></Link>
            ))}
        </div>
        //     </div>
        // </div>
    )
}

export default PostersByCategory