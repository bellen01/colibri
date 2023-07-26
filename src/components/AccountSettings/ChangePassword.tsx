import React from 'react';
import styles from '@/components/styles/ChangePassword.module.scss';
import Button from '../General/Button';

const ChangePassword = () => {
    return (
        <div>
            <div className={styles.loginContainer}>
                <div className={styles.inputContainer}>
                    <h2 className={styles.h2}>Byt lösenord</h2>
                    <input type="text" name="changePassword" id="changePassword" placeholder='Ange nuvarande lösenord' />
                    <input type="text" name="changePassword" id="changePassword" placeholder='Nytt lösenord' />
                    <input type="text" name="changePassword" id="changePassword" placeholder='Upprepa nytt lösenord' />
                    {/* <button className={styles.loginButton}>Byt lösenord</button> */}
                    <Button text={"Byt lösenord"} />
                </div>
            </div>
        </div>
    )
}

export default ChangePassword