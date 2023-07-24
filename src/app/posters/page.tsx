"use client"
import React, { useState } from 'react';
import Product from '@/components/Products/Product';
import styles from '@/components/styles/Products.module.scss';
import { montserrat } from '@/app/fonts';
// import ProductInfo from './ProductInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Filter from '@/components/Products/Filter';
import LoginComponent from '@/components/Login/LoginComponent';
// import Select from './Select';


const Products = () => {

    return (
        <div className={styles.container}>
            {/* <LoginComponent /> */}
            <div className={styles.heroContainer}>
                <h1>Posters</h1>
                <p>text</p>
                {/* <div>filter</div> */}
            </div>
            <div className={styles.filterAndProductsContainer}>
                <Filter />
                <div className={styles.wrapper}>
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                </div>
            </div>
            {/* <ProductInfo /> */}
        </div>
    )
}

export default Products