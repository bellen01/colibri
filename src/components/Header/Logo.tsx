import React from 'react';
import styles from '@/components/styles/Logo.module.scss';
import Link from 'next/link';
import { cinzel } from '@/app/fonts';

const Logo = () => {
    return (
        <div className={`${cinzel.className} ${styles.wrapper}`}>
            <a href="/" className={styles.logo}>Colibri</a>
            {/* <Link href="#">Colibri</Link> */}
        </div>
    )
}

export default Logo