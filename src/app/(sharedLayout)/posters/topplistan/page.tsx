"use client"
import React, { useState } from 'react';
import Product from '@/components/Products/Product';
import styles from '@/components/styles/Products.module.scss';
import ProductFilter from '@/components/Products/ProductFilter';
import HeroHeading from '@/components/General/HeroHeading';



const Topplistan = () => {

    return (
        // <div className={styles.container}>
        //     <HeroHeading heading={"Topplistan"} />
        //     <div className={styles.filterAndProductsContainer}>
        //         <ProductFilter />
        <div className={styles.wrapper}>
            {/* <Product />
                    <Product />
                    <Product />
                    <Product /> */}
        </div>
        //     </div>
        // </div>
    )
}

export default Topplistan