import React from 'react';
import styles from '@/components/styles/LoginMenu.module.scss';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import SearchBar from './SearchBar';
import { faBagShopping, faUser } from '@fortawesome/free-solid-svg-icons';

const LoginMenu = () => {
    return (
        <div className={styles.loginMenu}>
            <SearchBar />
            <div className={styles.favorites}>
                <Link href="#">
                    <FontAwesomeIcon icon={faHeart} className={`${styles.icons} ${styles.heart}`} />
                </Link>
                {/* <FontAwesomeIcon icon={faHeart} />
                <Link href="#">Favoriter</Link> */}
            </div>
            <div className={styles.favorites}>
                <Link href="/user">
                    <FontAwesomeIcon icon={faUser} className={styles.icons} />
                </Link>
                {/* <FontAwesomeIcon icon={faUser} />
                <Link href="#">Logga in</Link> */}
            </div>
            <div className={styles.favorites}>
                <Link href="/login">
                    <FontAwesomeIcon icon={faBagShopping} className={styles.icons} />
                </Link>
                {/* <FontAwesomeIcon icon={faBagShopping} />
                <Link href="#">Varukorg</Link> */}
            </div>
        </div>
    )
}

export default LoginMenu