import React from 'react';
import styles from '@/components/styles/Header.module.scss';
import Link from 'next/link';
import Logo from './Logo';
import Nav from './Nav';
import LoginMenu from './LoginMenu';

const Header = () => {
    return (
        <>
            <header className={styles.wrapper}>
                <Logo />
                <Nav />
                <LoginMenu />
            </header>
        </>
    )
}

export default Header