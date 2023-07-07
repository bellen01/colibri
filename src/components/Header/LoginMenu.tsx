import React from 'react';
import styles from '@/components/styles/LoginMenu.module.scss';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import SearchBar from './SearchBar';

const LoginMenu = () => {
    return (
        <div className={styles.loginMenu}>
            {/* <FontAwesomeIcon icon={faHeart} /> */}
            <SearchBar />
            <Link href="#">Favoriter</Link>
            <Link href="#">Varukorg</Link>
            <Link href="#">Logga in</Link>
        </div>
    )
}

export default LoginMenu