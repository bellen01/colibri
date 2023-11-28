"use client";
import React, { useState } from 'react';
import styles from '@/components/styles/UserNav.module.scss';
import Link from 'next/link';
import HeroHeading from '../General/HeroHeading';
// import { logoutUser } from '@/app/posters/fetchFunctions';
import { logoutUser } from '@/app/user/fetchFunctionsUser';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { isUserLoggedIn, logIn, logOut } from '@/redux/features/authSlice';

const UserNav = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [componentToShow, setComponentToShow] = useState("cart")
    const user = "Jane Doe";

    const logoutHandler = async () => {
        try {
            const response = await logoutUser();
            if (response?.status === 200) {
                // dispatch(isUserLoggedIn(false));
                dispatch(logOut(false));
                router.push("/login");
            }
        } catch (error) {
            console.log('error i logoutHandler', error);
        }
    }

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
                <button onClick={logoutHandler}>Logga ut</button>
            </nav>
        </aside>
        /* </div> */
        // </div>
    )
}

export default UserNav