"use client";
import React, { useEffect, useState } from 'react';
import styles from '@/components/styles/LoginComponent.module.scss';
import Button from '../General/Button';
import Link from 'next/link';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '@/firebase/config';
import { setUser } from '@/redux/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn, logIn } from '@/redux/features/authSlice';
// import { loginUser } from '@/app/posters/fetchFunctions';
import { getUserData, loginUser } from '@/app/user/fetchFunctionsUser';
import { User } from '@/types/User.types';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { RootState } from '@/redux/store';

type Errors = {
    email?: string,
    password?: string,
}

const LoginComponent = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: RootState) => state.auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [userData, setUserData] = useState<User | undefined>()
    const [errors, setErrors] = useState<Errors>({});
    const [message, setMessage] = useState<string>()

    const validateForm = () => {
        let errors: Errors = {} as Errors;

        if (!email.trim()) {
            errors.email = "Email saknas";
        } else if ((!/\S+@\S+\.\S+/.test(email.trim()))) {
            errors.email = 'Email måste innehålla @ och .'
        } else {
            setEmail(email.trim());
        }

        if (!password.trim()) {
            errors.password = 'Lösenord saknas'
        }

        setErrors(errors);
        if (Object.keys(errors).length === 0) {
            return true;
        } else {
            return false;
        }
    }

    const getUserDetails = async () => {
        try {
            const res = await getUserData();
            if (res.status === 200) {
                let user: User[];
                user = await res.json();
                // setUserData(user[0]);
                dispatch(logIn(user[0].firstName));
            }
        } catch (error) {
            console.log('error i settings page', error);
        }
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage("");
        const isFormValid = validateForm();
        if (isFormValid) {
            try {
                const res = await loginUser(email, password);
                if (res.status === 200) {
                    console.log('inloggad');
                    getUserDetails();
                    dispatch(isUserLoggedIn(true));
                    setMessage('Du är inloggad');
                    setTimeout(() => {
                        router.push("/user");
                    }, 1500);
                } else if (res.status === 401) {
                    setMessage('Det gick inte att logga in med dom uppgifterna');
                } else {
                    setMessage('Något gick fel, vänligen försök senare igen');
                }
            } catch (error) {
                setMessage('Något gick fel med login-uppgifterna, vänligen försök senare igen');
            }
        }
    };

    console.log('isloggedin', isLoggedIn.isLoggedIn);

    return (
        <form className={styles.loginContainer} onSubmit={handleLogin}>
            <div className={styles.inputContainer}>
                <h2 className={styles.h2}>Logga in</h2>
                <div className={styles.inputBox}>
                    <input
                        className={styles.input}
                        type="email"
                        name="email"
                        id="email"
                        placeholder='E-mail'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                    {
                        errors.email &&
                        <FontAwesomeIcon icon={faCircleExclamation} className={styles.icon} />
                    }
                </div>
                <p className={styles.error}>{errors?.email}</p>

                <div className={styles.inputBox}>
                    <input
                        className={styles.input}
                        type="password"
                        name="password"
                        id="password"
                        placeholder='Lösenord'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                    {
                        errors.password &&
                        <FontAwesomeIcon icon={faCircleExclamation} className={styles.icon} />
                    }
                </div>
                <p className={styles.error}>{errors?.password}</p>
                <p className={styles.message}>{message}</p>
                <Button text="Logga in" />
                <p className={styles.noAccountMessage}>Har du inget konto ännu? Registrera dig <Link href="/register">här</Link></p>
            </div>
        </form>
    )
}

export default LoginComponent