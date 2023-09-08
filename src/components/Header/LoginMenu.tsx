"use client"
import React, { useEffect, useState } from 'react';
import styles from '@/components/styles/LoginMenu.module.scss';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import SearchBar from './SearchBar';
import { faBagShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';


const LoginMenu = () => {
    const state = useSelector((state: RootState) => state.cart);
    const [productsInCart, setProductsInCart] = useState<number>();

    useEffect(() => {
        if (state) {
            setProductsInCart(state.cartTotalQuantity);
        }
    }, [state]);

    return (
        <div className={styles.loginMenu}>
            <SearchBar />
            <div className={styles.favorites}>
                <Link href="/user">
                    <FontAwesomeIcon icon={faHeart} className={`${styles.icons} ${styles.heart}`} />
                </Link>
            </div>
            <div className={styles.favorites}>
                <Link href="/user">
                    <FontAwesomeIcon icon={faUser} className={styles.icons} />
                </Link>
            </div>
            <div className={styles.favorites}>
                <Link href="/cart">
                    <div className={styles.cartIconContainer}>
                        <FontAwesomeIcon icon={faBagShopping} className={styles.icons} />
                        <span className={`${productsInCart !== 0 ? styles.numberInCart : styles.displayNone}`}>{productsInCart}</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default LoginMenu