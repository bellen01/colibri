import React from 'react';
import styles from '@/components/styles/Header.module.scss';
import Link from 'next/link';
import Logo from './Logo';
import Nav from './Nav';
import LoginMenu from './LoginMenu';
import { ReduxProvider } from '@/redux/provider';

const Header = () => {
    return (
        <>
            <header className={styles.wrapper}>
                <Logo />
                <Nav />
                <ReduxProvider>
                    <LoginMenu />
                </ReduxProvider>
            </header>
        </>
    )
}

export default Header