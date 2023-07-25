"use client"
import React, { useState } from 'react';
import Product from '@/components/Products/Product';
import styles from '@/components/styles/Products.module.scss';
import Filter from '@/components/Products/Filter';
import HeroHeading from '@/components/General/HeroHeading';



const Products = () => {

    return (
        <div className={styles.container}>
            <HeroHeading heading={"Posters"} />
            <div className={styles.filterAndProductsContainer}>
                <Filter />
                <div className={styles.wrapper}>
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                </div>
            </div>
        </div>
    )
}

export default Products