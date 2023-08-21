import React from 'react';
import styles from '@/components/styles/RegisterComponent.module.scss';
import Button from '../General/Button';

const RegisterComponent = () => {
    return (
        <div>
            <div className={styles.registerContainer}>
                <div className={styles.inputContainer}>
                    <h2 className={styles.h2}>Skapa konto</h2>
                    <input type="firstName" name="firstName" id="firstName" placeholder='Förnamn' />
                    <input type="lastName" name="lastName" id="lastName" placeholder='Efternamn' />
                    <input type="email" name="email" id="email" placeholder='E-mail' />
                    <input type="password" name="password" id="password" placeholder='Lösenord' />
                    <Button text="Skapa konto" />
                    {/* <button className={styles.registerButton}>Skapa konto</button> */}
                </div>
            </div>
        </div>
    )
}

export default RegisterComponent