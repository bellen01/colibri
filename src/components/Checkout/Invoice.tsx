import React from 'react'
import styles from '@/components/styles/Invoice.module.scss';
import CustomerInformation from './CustomerInformation';

const Invoice = () => {
    return (
        <div className={styles.invoiceContainer}>
            <p className={styles.information}>Fakturan skickas till din mailadress.</p>
        </div>
    )
}

export default Invoice