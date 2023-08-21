import React from 'react';
import styles from '@/components/styles/Filter.module.scss';
import Link from 'next/link';

const Filter = () => {
    return (
        <aside className={styles.aside}>
            <nav className={styles.nav}>
                <Link href="#">Svartvita</Link>
                <Link href="#">Landskap</Link>
                <Link href="#">Blommor</Link>
                <Link href="#">Droppar</Link>
                <Link href="#">Insekter</Link>
                <Link href="#">Djur</Link>
            </nav>
        </aside>
    )
}

export default Filter