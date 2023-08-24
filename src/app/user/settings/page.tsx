"use client";
import React, { useState } from 'react';
import styles from '@/components/styles/CustomerInformation.module.scss';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Button from '@/components/General/Button';
// import ChangeCustomerInformation from '@/components/AccountSettings/ChangeCustomerInformation';
// import ChangePassword from '@/components/AccountSettings/ChangePassword';


const CustomerInformation = () => {
    const [editInformation, setEditInformation] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const [componentToShow, setComponentToShow] = useState("customerInformation");

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
                                    <p>Jane Doe</p>
                                </div>
                                <div className={styles.pairs}>
                                    <p>Gatuadress: </p>
                                    <p>Testgatan 1</p>
                                </div>
                                <div className={styles.pairs}>
                                    <p>Postnr och ort: </p>
                                    <p>12345 Test</p>
                                </div>
                                <div className={styles.pairs}>
                                    <p>Epost: </p>
                                    <p>test@test.com</p>
                                </div>
                                <div className={styles.pairs}>
                                    <p>Mobilnr: </p>
                                    <p>0701234567</p>
                                </div>
                            </div>
                            <div>
                                <Link href="/user/settings/edit-information"><button className={styles.button}><FontAwesomeIcon icon={faPen} /></button></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Link href="/user/settings/change-password"><Button text={"Byt lösenord"} width={"50%"} /></Link>
            </div>
        </div>
    )
}

export default CustomerInformation