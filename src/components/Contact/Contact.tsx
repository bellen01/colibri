import React from 'react';
import styles from '@/components/styles/Contact.module.scss';
import Link from 'next/link';

const Contact = () => {
    return (
        <div className={styles.contactContainer}>
            <h3>Kontakt</h3>
            <Link href="/">info@colibri.se</Link>
        </div>
    )
}

export default Contact