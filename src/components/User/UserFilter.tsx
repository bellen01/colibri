import React from 'react';
import styles from '@/components/styles/UserFilter.module.scss';
import Link from 'next/link';

const UserFilter = () => {
    return (
        <aside className={styles.aside}>
            <nav className={styles.nav}>
                {/* <div className={styles.navItem}> */}
                <Link href="#">Varukorg</Link>
                {/* <div className={styles.caret}></div> */}
                {/* </div> */}
                <Link href="#">Tidigare beställningar</Link>
                <Link href="#">Favoriter</Link>
                <Link href="#">Kontoinställningar</Link>
                <Link href="#">Logga ut</Link>
            </nav>
        </aside>
    )
}

export default UserFilter