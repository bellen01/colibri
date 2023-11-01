"use client";
import React, { useEffect, useState } from 'react';
import styles from '@/components/styles/LoginComponent.module.scss';
import Button from '../General/Button';
import Link from 'next/link';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '@/firebase/config';
import { setUser } from '@/redux/features/userSlice';
import { useDispatch } from 'react-redux';
// import { loginUser } from '@/app/posters/fetchFunctions';
import { loginUser } from '@/app/user/fetchFunctionsUser';
import { User } from '@/types/User.types';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

type Errors = {
    email?: string,
    password?: string,
}

const LoginComponent = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const [userId, setUserId] = useState<string | undefined>()
    const [userData, setUserData] = useState<User | undefined>()
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
        console.log('errors i validateform i login', errors);
        if (Object.keys(errors).length === 0) {
            return true;
        } else {
            return false;
        }
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage("");
        console.log('email', email);
        console.log('password', password);
        const isFormValid = validateForm();
        if (isFormValid) {

            // if (email && password) {
            console.log('email i if', email);
            console.log('password i if', password);
            try {
                console.log('i try catch i login component')
                const res = await loginUser(email, password);
                console.log('user i login component', res);
                // setUserId(user.uid);
                if (res.status === 200) {
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
                console.log('fel i login', error)
                setMessage('Något gick fel med login-uppgifterna, vänligen försök senare igen');
            }
            //     try {
            //         const userCredential = await signInWithEmailAndPassword(auth, email, password);
            //         console.log('user', userCredential.user);
            //         // dispatch(setUser(userCredential.user));
            //     } catch (error) {
            //         console.log('fel i signinwithemailandpassword', error);
            //     }
        }
        // else {
        //     setMessage('Vänligen fyll i email och lösenord')
        // }
        // if (userId) {
        //     try {
        //         const userData = await getUserData(userId);
        //         console.log('userData från db baserat på authid', userData)
        //     } catch (error) {
        //         console.log('error i login i getuserdata', error)
        //     }
        // }
        // }
        // else {
        //     setMessage('Formuläret har fel, vänligen åtgärda dom och försök igen');
        // }
    };

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
                {/* <button className={styles.loginButton}>Logga in</button> */}
                <p className={styles.noAccountMessage}>Har du inget konto ännu? Registrera dig <Link href="/register">här</Link></p>
            </div>
        </form>
    )
}

export default LoginComponent