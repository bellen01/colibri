import React from 'react';
import styles from '@/components/styles/ChangePassword.module.scss';
import Button from '@/components/General/Button';
import Link from 'next/link';


interface IChangePasswordProps {
    setState: (val: string) => void;
}

const ChangePassword = ({ setState }: IChangePasswordProps) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.loginContainer}>
                <h2 className={styles.h2}>Byt lösenord</h2>
                <form action="" className={styles.formContainer}>
                    <input type="text" name="changePassword" id="changePassword" placeholder='Ange nuvarande lösenord' />
                    <input type="text" name="changePassword" id="changePassword" placeholder='Nytt lösenord' />
                    <input type="text" name="changePassword" id="changePassword" placeholder='Upprepa nytt lösenord' />
                    {/* <button className={styles.loginButton}>Byt lösenord</button> */}
                </form>
                <div className={styles.buttonContainer}>
                    <Link href="/user/settings"><button className={styles.cancelButton}>Avbryt</button></Link>
                    <Button text={"Byt lösenord"} width={"30%"} />
                </div>
            </div>
        </div>
    )
}

export default ChangePassword