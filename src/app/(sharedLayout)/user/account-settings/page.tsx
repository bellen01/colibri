"use client";
import React, { useEffect, useState } from 'react';
import styles from '@/components/styles/AccountSettings.module.scss';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Button from '@/components/General/Button';
import { getUserData } from '../fetchFunctionsUser';
import { User } from '@/types/User.types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { logIn } from '@/redux/features/authSlice';


const AccountSettings = () => {
    const [userData, setUserData] = useState<User>();
    const userName = useSelector((state: RootState) => state.auth.name);
    const dispatch = useDispatch();

    const getUserDetails = async () => {
        try {
            const res = await getUserData();
            if (res.status === 200) {
                let user: User[];
                user = await res.json();
                setUserData(user[0]);
                dispatch(logIn(user[0].firstName));
            }
        } catch (error) {
            console.log('error i settings page', error);
        }
    }

    useEffect(() => {
        console.log('username i state', userName);
        if (userData == undefined) {
            getUserDetails();
        }
    }, [userData]);

    console.log('userData in user settings', userData);


    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h2 className={styles.h2}>Kunduppgifter</h2>
                <div className={styles.informationContainer}>
                    <div>
                        <div className={styles.customerNumber}>
                            <p>Kundnr: </p>
                            <p>123</p>
                        </div>
                        <div className={styles.information}>
                            <div>
                                <div className={styles.pairs}>
                                    <p>Namn: </p>
                                    <p>{userData?.firstName} {userData?.lastName}</p>
                                </div>
                                <div className={styles.pairs}>
                                    <p>Gatuadress: </p>
                                    <p>{userData?.address.streetName} {userData?.address.streetNumber}</p>
                                </div>
                                <div className={styles.pairs}>
                                    <p>Postnr och ort: </p>
                                    <p>{userData?.address.zipcode} {userData?.address.city}</p>
                                </div>
                                {/* <div className={styles.pairs}>
                                    <p>Epost: </p>
                                    <p>test@test.com</p>
                                </div> */}
                                {/* <div className={styles.pairs}>
                                    <p>Mobilnr: </p>
                                    <p>0701234567</p>
                                </div> */}
                            </div>
                            <div>
                                <Link href="/user/account-settings/edit-information"><button className={styles.button}><FontAwesomeIcon icon={faPen} /></button></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Link href="/user/account-settings/change-password"><Button text={"Byt lösenord"} width={"50%"} /></Link>
                {/* <Link href="/user/settings/edit-information"><Button text={"Ändra kunduppgifter"} width={"50%"} /></Link> */}
            </div>
        </div>
    )
}

export default AccountSettings