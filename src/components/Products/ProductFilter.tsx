"use client";
import React, { useEffect, useState } from 'react';
import styles from '@/components/styles/ProductFilter.module.scss';
import Link from 'next/link';
import { Poster, productCategories } from '@/types/Product.types';
// import { getPosters } from '@/app/posters/fetchFunctions';
import { useSelectedLayoutSegment } from 'next/navigation';

const ProductFilter = () => {
    const activeSegment = useSelectedLayoutSegment();

    const [postersByCategory, setPostersByCategory] = useState<Poster[]>();

    // const getPosterByCategory = async (categoryId: number) => {
    //     try {
    //         const posters = await getPosters();
    //         const postersByCategory = posters?.filter((category) => category.category?.includes(categoryId))
    //     console.log('postersbycategory', postersByCategory);
    //     } catch (error) {
    //         console.log('error in fetching posters by category', error)
    //     }
    // }

    // useEffect(() => {
    //     getPosterByCategory()
    // })

    function capitalizeFirstLetter(word: string) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }


    return (
        <aside className={styles.aside}>
            <nav className={styles.nav}>
                <Link href="/posters"><button className={`${styles.linkButton} ${activeSegment == null ? styles.active : ""}`}>Alla</button></Link>
                <Link href="/posters/topplistan"><button className={`${styles.linkButton} ${activeSegment == "topplistan" ? styles.active : ""}`}>Topplistan</button></Link>
                <Link href="/posters/nyheter"><button className={`${styles.linkButton} ${activeSegment == "nyheter" ? styles.active : ""}`}>Nyheter</button></Link>
                {productCategories.map((category) => (
                    <Link href={`/posters/${category.categoryName}`} key={category.categoryId}><button className={`${styles.linkButton} ${activeSegment == category.categoryName ? styles.active : ""}`}>{capitalizeFirstLetter(category.categoryName)}</button></Link>

                ))}
                {/* <Link href="#">Svartvitt</Link>
                <Link href="#">Landskap</Link>
                <Link href="#">Blommor</Link>
                <Link href="#">Droppar</Link>
                <Link href="#">Insekter</Link>
                <Link href="#">Djur</Link> */}
            </nav>
        </aside>
    )
}

export default ProductFilter