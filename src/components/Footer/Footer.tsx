import React from 'react';
import styles from '@/components/styles/Footer.module.scss';
import { cinzel } from '@/app/fonts';
import Contact from '../Contact/Contact';
import About from '../About/About';
import CustomerService from '../CustomerService/CustomerService';

const Footer = () => {
    return (
        <div className={styles.container}>
            <CustomerService />
            {/* <div className={`${cinzel.className} ${styles.wrapper}`}>
                <a href="/" className={styles.logo}>Colibri</a>
            </div> */}
            <About />
            <Contact />
        </div>
    )
}

export default Footer