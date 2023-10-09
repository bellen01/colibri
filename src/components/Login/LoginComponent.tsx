"use client";
import React, { useEffect, useState } from 'react';
import styles from '@/components/styles/LoginComponent.module.scss';
import Button from '../General/Button';
import Link from 'next/link';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '@/firebase/config';
import { setUser } from '@/redux/features/userSlice';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/app/posters/fetchFunctions';
import { User } from '@/types/User.types';

const LoginComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const [userId, setUserId] = useState<string | undefined>()
    const [userData, setUserData] = useState<User | undefined>()

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('email', email);
        console.log('password', password);
        if (email && password) {
            try {
                const user = await loginUser(email, password);
                console.log('user i login component', user);
                setUserId(user.uid);
            } catch (error) {
                console.log('fel i login', error)
                return;
            }
            //     try {
            //         const userCredential = await signInWithEmailAndPassword(auth, email, password);
            //         console.log('user', userCredential.user);
            //         // dispatch(setUser(userCredential.user));
            //     } catch (error) {
            //         console.log('fel i signinwithemailandpassword', error);
            //     }
        }
        // if (userId) {
        //     try {
        //         const userData = await getUserData(userId);
        //         console.log('userData från db baserat på authid', userData)
        //     } catch (error) {
        //         console.log('error i login i getuserdata', error)
        //     }
        // }
    };

    return (
        <form className={styles.loginContainer} onSubmit={handleLogin}>
            <div className={styles.inputContainer}>
                <h2 className={styles.h2}>Logga in</h2>
                <input type="email"
                    name="email"
                    id="email"
                    placeholder='E-mail'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                <input type="password" name="password" id="password" placeholder='Lösenord' value={password} onChange={(e) => setPassword(e.target.value)} required />
                <Button text="Logga in" />
                {/* <button className={styles.loginButton}>Logga in</button> */}
                <p>Har du inget konto ännu? Registrera dig <Link href="/register">här</Link></p>
            </div>
        </form>
    )
}

export default LoginComponent