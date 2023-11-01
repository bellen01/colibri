"use client";
import React, { useEffect, useState } from 'react';
import styles from '@/components/styles/CustomerInformation.module.scss';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Button from '@/components/General/Button';
// import { getUserData } from '@/app/posters/fetchFunctions';
import { getUserData } from '../fetchFunctionsUser';
import { User } from '@/types/User.types';
// import ChangeCustomerInformation from '@/components/AccountSettings/ChangeCustomerInformation';
// import ChangePassword from '@/components/AccountSettings/ChangePassword';


const CustomerInformation = () => {
    const [editInformation, setEditInformation] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const [componentToShow, setComponentToShow] = useState("customerInformation");
    const [userData, setUserData] = useState<User>();

    useEffect(() => {
        if (userData == undefined) {
            getUserData().then(data => { if (data) { setUserData(data[0]) } });
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
                                <Link href="/user/settings/edit-information"><button className={styles.button}><FontAwesomeIcon icon={faPen} /></button></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Link href="/user/settings/change-password"><Button text={"Byt lösenord"} width={"50%"} /></Link>
                {/* <Link href="/user/settings/edit-information"><Button text={"Ändra kunduppgifter"} width={"50%"} /></Link> */}
            </div>
        </div>
    )
}

export default CustomerInformation