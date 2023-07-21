import React from 'react';
import styles from '@/components/styles/LoginComponent.module.scss';

const LoginComponent = () => {
    return (
        <div>
            <div className={styles.loginContainer}>
                <div className={styles.inputContainer}>
                    <h2 className={styles.h2}>Logga in</h2>
                    <input type="email" name="email" id="email" placeholder='E-mail' />
                    <input type="password" name="password" id="password" placeholder='Lösenord' />
                    <button className={styles.loginButton}>Logga in</button>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent