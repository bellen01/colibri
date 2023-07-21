import React from 'react';
import styles from '@/components/styles/Login.module.scss';

const Login = () => {
    return (
        <div>
            <h2 className={styles.h2}>Logga in</h2>
            <div className={styles.inputFieldsContainer}>
                <input type="email" name="email" id="email" placeholder='E-mail' />
                <input type="password" name="password" id="password" placeholder='Lösenord' />
            </div>
            <button className={styles.loginButton}>Logga in</button>
        </div>
    )
}

export default Login