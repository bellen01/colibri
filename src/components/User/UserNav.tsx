"use client";
import React, { useState } from 'react';
import styles from '@/components/styles/UserNav.module.scss';
import Link from 'next/link';
import HeroHeading from '../General/HeroHeading';

const UserNav = () => {
    const [componentToShow, setComponentToShow] = useState("cart")

    const user = "Jane Doe";

    return (
        // <div className={styles.container}>
        //     <HeroHeading heading={`Välkommen ${user}`} />
        //     {/* <div className={styles.filterAndInfoContainer}> */}
        <aside className={styles.aside}>
            <nav className={styles.nav}>
                {/* <div className={styles.navItem}> */}
                {/* <Link href="#" onClick={() => setComponentToShow('cart')}>Varukorg</Link> */}
                {/* <div className={styles.caret}></div> */}
                {/* </div> */}
                <Link href="/user/favorites">Favoriter</Link>
                <Link href="/user/order-history">Tidigare beställningar</Link>
                <Link href="/user/settings">Kontoinställningar</Link>
                <Link href="#">Logga ut</Link>
            </nav>
        </aside>
        /* </div> */
        // </div>
    )
}

export default UserNav