import React from 'react';
import styles from '@/components/styles/CustomerInformation.module.scss';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CustomerInformation = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.h2}>Kunduppgifter</h2>
            <div className={styles.informationContainer}>
                <div>
                    <div className={styles.pairs}>
                        <p>Kundnr: </p>
                        <p>123</p>
                    </div>
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
                    <button className={styles.button}><FontAwesomeIcon icon={faPen} /></button>
                </div>
            </div>
        </div>
    )
}

export default CustomerInformation