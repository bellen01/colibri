"use client";
import React from 'react';
import styles from '@/components/styles/UserNav.module.scss';
import Link from 'next/link';
import { logoutUser } from '@/app/(sharedLayout)/user/fetchFunctionsUser';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logOut } from '@/redux/features/authSlice';

const UserNav = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        try {
            const response = await logoutUser();
            if (response?.status === 200) {
                router.push("/login");
                dispatch(logOut());
            }
        } catch (error) {
            console.log('error i logoutHandler', error);
        }
    }

    return (
        <aside className={styles.aside}>
            <nav className={styles.nav}>
                <Link href="/user/favorites">Favoriter</Link>
                <Link href="/user/order-history">Tidigare beställningar</Link>
                <Link href="/user/account-settings">Kontoinställningar</Link>
                <button onClick={logoutHandler}>Logga ut</button>
            </nav>
        </aside>
    )
}

export default UserNav