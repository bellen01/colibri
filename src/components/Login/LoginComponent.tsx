"use client";
import React, { useEffect, useState } from 'react';
import styles from '@/components/styles/LoginComponent.module.scss';
import Button from '../General/Button';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn, logIn } from '@/redux/features/authSlice';
import { getUserData, loginUser } from '@/app/(sharedLayout)/user/fetchFunctionsUser';
import { User } from '@/types/User.types';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { RootState } from '@/redux/store';
import { getCartItems, updateCartItems } from '@/app/(sharedLayout)/cart/fetchFunctionsCart';
import { PosterData } from '@/app/api/(cart)/getcartitems/route';
import { addToCart, updateCartFromDB } from '@/redux/features/cartSlice';

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
    const [errors, setErrors] = useState<Errors>({});
    const [message, setMessage] = useState<string>()
    const state = useSelector((state: RootState) => state.cart);
    console.log('state i cart', state);
    const [changedStateWithDBProducts, setChangedStateWithDBProducts] = useState(false);

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
                dispatch(logIn(user[0].firstName));
            }
        } catch (error) {
            console.log('error i settings page', error);
        }
    }

    const getCartItemsFromDB = async () => {
        try {
            const res = await getCartItems();
            if (res.status === 200) {
                let cartDataFromDB: PosterData[];
                cartDataFromDB = await res.json();
                if (cartDataFromDB) {
                    cartDataFromDB.forEach(poster => {
                        let posterFound = state.products.find(product => product.id === poster.item_id && product.priceAndSize.size === poster.priceAndSize.size);
                        if (posterFound == undefined) {
                            dispatch(addToCart(poster));
                            setChangedStateWithDBProducts(true);
                        } else if (posterFound && poster.quantity !== posterFound.quantity) {
                            if (poster.quantity < posterFound.quantity) {
                                dispatch(updateCartFromDB(poster));
                                setChangedStateWithDBProducts(true);
                            } else {
                                setChangedStateWithDBProducts(true);
                            }
                        }
                    })
                    state.products.forEach(poster => {
                        let foundPosterInDB = cartDataFromDB.find(product => product.item_id === poster.id && product.priceAndSize.size === poster.priceAndSize.size);
                        if (foundPosterInDB == undefined) {
                            setChangedStateWithDBProducts(true);
                        }
                    })
                }
                // setCartItemsDB(cartData);
            }
        } catch (error) {
            console.log('error i getCartItems i getCartItemsFromDB i cart page', error);
        }
    }

    const updateDBWithReduxState = async () => {
        try {
            const res = await updateCartItems(state.products);
            if (res.status === 200) {
                console.log('status 200', res);
            }
        } catch (error) {
            console.log('error i replacecartitems i getcartitems i cart page', error);
        }
        setChangedStateWithDBProducts(false);
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
                    getCartItemsFromDB();
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

    useEffect(() => {
        if (changedStateWithDBProducts) {
            console.log('changedStateWithDBProducts', changedStateWithDBProducts);
            updateDBWithReduxState();
        }
    }, [changedStateWithDBProducts]);

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