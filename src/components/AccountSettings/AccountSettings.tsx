import React from 'react';
import styles from '@/components/styles/AccountSettings.module.scss';
import CustomerInformation from './CustomerInformation';
import ChangePassword from './ChangePassword';
import ChangeCustomerInformation from './ChangeCustomerInformation';
import Button from '../General/Button';

const AccountSettings = () => {
    return (
        <div>
            <CustomerInformation />
            <ChangeCustomerInformation />
            <Button text={"Byt lösenord"} width={"25%"} />
            {/* <button className={styles.button}>Byt lösenord</button> */}
        </div>
    )
}

export default AccountSettings