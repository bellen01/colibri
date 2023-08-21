import React from 'react';
import styles from '@/components/styles/CustomerService.module.scss';
import Link from 'next/link';

const CustomerService = () => {
    return (
        <div className={styles.customerServiceContainer}>
            <h3>Kundservice</h3>
            <Link href="/">Vanliga frågor</Link>
        </div>
    )
}

export default CustomerService