"use client";
import React, { useEffect, useState } from 'react';
import styles from '@/components/styles/RegisterComponent.module.scss';
import Button from '../General/Button';
// import { auth } from '@/firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/features/userSlice';
// import { registerUser } from '@/app/posters/fetchFunctions';
import { registerUser } from '@/app/user/fetchFunctionsUser';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';


type Errors = {
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    repeatPassword?: string,
    streetName?: string,
    streetNumber?: string,
    zipcode?: number | string,
    city?: string,
}

export type RegUser = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    address: {
        streetName?: string,
        streetNumber?: string,
        zipcode?: number | string,
        city?: string,
    }
}

const RegisterComponent = () => {
    const router = useRouter();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [streetName, setStreetName] = useState("");
    const [streetNumber, setStreetNumber] = useState<string>("");
    const [zipcode, setZipcode] = useState<string | number>("");
    const [city, setCity] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const dispatch = useDispatch();
    const strongPassword = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^*-]).{8,}$");
    const [errors, setErrors] = useState<Errors>({});
    // const [isFormValid, setIsFormValid] = useState(false);
    const [message, setMessage] = useState<string | undefined>()
    const [submitting, setSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    let userInformation: RegUser = {
        firstName,
        lastName,
        email,
        password,
        address: {
            streetName,
            streetNumber,
            zipcode,
            city,
        }
    }

    const validateForm = () => {
        let errors: Errors = {} as Errors;
        console.log('förnamn längd i register', firstName.length)
        console.log('förnamn i register', firstName)
        console.log('efternamn längd i register', lastName.length)
        console.log('email längd i register', email.length)

        if (!firstName.trim()) {
            errors.firstName = 'Förnamn saknas'
        } else if (firstName.trim().length < 2 || firstName == undefined) {
            errors.firstName = 'Förnamn saknas eller är för kort'
        } else {
            userInformation.firstName = firstName.trim();
        }

        if (!lastName.trim()) {
            errors.lastName = 'Efternamn saknas'
        } else if (lastName.trim().length == 0 || lastName == undefined) {
            errors.lastName = 'Efternamn saknas eller är för kort'
        } else {
            userInformation.lastName = lastName.trim();
        }

        if (!email) { //TODO hur fungerar det här fast att jag bara har mellanslag?
            errors.email = 'Email saknas'
        } else if ((!/\S+@\S+\.\S+/.test(email))) {
            errors.email = 'Email måste innehålla @ och .'
        } else {
            userInformation.email = email.trim();
        }

        if (!password) {
            errors.password = 'Lösenord saknas'
        } else if (!strongPassword.test(password)) {
            errors.password = 'Lösenordet måste vara minst 8 tecken, 1 stor bokstav, 1 liten bokstav, 1 siffra och 1 specialtecken'
        } else {
            userInformation.password = password;
        }

        if (!repeatPassword || repeatPassword !== password) {
            errors.repeatPassword = 'Lösenorden stämmer inte överens'
        }

        if (!streetName.trim()) {
            errors.streetName = "Gatunamn saknas"
        } else if (streetName.trim().length == 0 || streetName == undefined) {
            errors.streetName = "Gatunamn saknas eller är för kort"
        } else {
            userInformation.address.streetName = streetName.trim();
            // updatedInformation.address = { ...updatedInformation.address, streetName: streetName }; //lösning om jag inte hade satt ett address objekt i updatedinformation
        }

        if (!streetNumber.trim()) {
            errors.streetNumber = "Gatunr saknas"
        } else if (streetNumber.trim().length == 0 || streetNumber == undefined) {
            errors.streetNumber = "Gatunr saknas eller är för kort"
        } else {
            userInformation.address.streetNumber = streetNumber.trim();
            // updatedInformation.address = { ...updatedInformation.address, streetNumber: streetNumber }; //lösning om jag inte hade satt ett address objekt i updatedinformation
            // setUpdatedUserData({ ...updatedUserData, address: { ...updatedUserData?.address, streetNumber: streetNumber } })
        }

        if (!zipcode) {
            errors.zipcode = "Postnr saknas"
        } else if (zipcode.toString().length == 0 || zipcode == undefined) {
            errors.zipcode = "Postnr saknas"
        } else if (zipcode.toString().length < 5) {
            errors.zipcode = "Postnummer måste vara 5 siffror"
        } else {
            userInformation.address.zipcode = +zipcode;
            // updatedInformation.address = { ...updatedInformation.address, zipcode: +zipcode }; //lösning om jag inte hade satt ett address objekt i updatedinformation
        }

        if (!city.trim()) {
            errors.city = "Postort saknas"
        } else if (city.trim().length == 0 || city == undefined) {
            errors.city = "Postort saknas eller är för kort"
        } else {
            userInformation.address.city = city.trim();
            // updatedInformation.address = { ...updatedInformation.address, city: city }; //lösning om jag inte hade satt ett address objekt i updatedinformation
        }

        setErrors(errors);
        console.log('errors i validateform', errors);
        if (Object.keys(errors).length === 0) {
            return true;
        } else {
            return false;
        }
    }

    const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setMessage("");
        console.log('firstname', firstName);
        console.log('lastname', lastName);
        console.log('email', email);
        console.log('password', password);
        console.log('repeatpassword', repeatPassword);
        const isFormValid = validateForm();
        if (isFormValid) {
            console.log('formuläret är okej', isFormValid);
            // setMessage('Ditt konto är registrerat');
            console.log('userInformation i register', userInformation)
            // if (email && password) {
            if (userInformation) { //TODO onödig?
                try {
                    // const res = await registerUser(email, password);
                    const res = await registerUser(userInformation);
                    console.log('user i register component', res);
                    console.log('res status', res?.status);
                    if (res.status === 200) {
                        setMessage('Du är registrerad');
                        setTimeout(() => {
                            router.push("/user");
                        }, 1500);
                    } else {
                        setMessage('Något gick fel på vårt håll, vänligen försök senare igen.')
                    }
                    // const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    // console.log(userCredential.user)
                    // dispatch(setUser(userCredential.user));
                } catch (error: any) {
                    console.log('fel i registeruser i register component', error.message);
                    setMessage('Något gick fel, vänligen försök senare igen')
                }
            } else {
                setMessage('Vänligen fyll i din information i formuläret'); //TODO behöver denna?
            }
        }
        // else {
        //     console.log('Formuläret har fel');
        //     setMessage('Formuläret har fel, vänligen åtgärda dom och försök igen')
        // }

    }

    useEffect(() => {
        setErrors({});
        setMessage("");
    }, [])

    return (
        <form className={styles.registerContainer} /*onSubmit={handleRegister}*/>
            <div className={styles.inputContainer}>
                <h2 className={styles.h2}>Skapa konto</h2>

                <div className={styles.inputBox}>
                    <input className={styles.input} type="email" name="email" id="email" placeholder='E-mail'
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            // if (!/\S+@\S+\.\S+/.test(e.target.value)) {
                            //     setEmail(e.target.value)
                            // } else {
                            //     setErrors({ ...errors, email: 'Email måste innehålla @ och .' })
                            // }
                        }}
                        required />
                    {
                        errors.email &&
                        <FontAwesomeIcon icon={faCircleExclamation} className={styles.icon} />
                    }
                </div>
                <p className={styles.error}>{errors?.email}</p>

                <div className={styles.flexInputFields}>
                    <div>
                        <div className={styles.inputBox}>
                            <input className={styles.input} type="password" name="password" id="password" placeholder='Lösenord'
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    // if (strongPassword.test(e.target.value)) {
                                    // setPassword(e.target.value)
                                    // } else {
                                    //     setErrors({ ...errors, password: 'Lösenordet måste innehålla minst 8 tecken, 1 stor bokstav, 1 liten bokstav, 1 siffra, 1 specialtecken' })
                                    // }
                                }
                                }
                                required />
                            {
                                errors.password &&
                                <FontAwesomeIcon icon={faCircleExclamation} className={styles.icon} />
                            }
                        </div>
                        <p className={styles.error}>{errors?.password}</p>
                    </div>

                    <div>
                        <div className={styles.inputBox}>
                            <input className={styles.input} type="password" name="password" id="repeatPassword" placeholder='Upprepa lösenord'
                                value={repeatPassword}
                                onChange={(e) => {
                                    setRepeatPassword(e.target.value)
                                    // if (e.target.value === password) {
                                    //     setRepeatPassword(e.target.value)
                                    // } else {
                                    //     setErrors({ ...errors, repeatPassword: 'Lösenorden stämmer inte överens' });
                                    // }
                                }
                                }
                                required />
                            {
                                errors.repeatPassword &&
                                <FontAwesomeIcon icon={faCircleExclamation} className={styles.icon} />
                            }
                        </div>
                        <p className={styles.error}>{errors?.repeatPassword}</p>
                    </div>
                </div>

                <div className={styles.flexInputFields}>
                    <div>
                        <div className={styles.inputBox}>
                            <input className={styles.input} type="firstName" name="firstName" id="firstName" placeholder='Förnamn'
                                value={firstName}
                                onChange={(e) => {
                                    const input = e.target.value.replace(/\d+/g, "");
                                    setFirstName(input)
                                }}
                                required
                            />
                            {
                                errors.firstName &&
                                <FontAwesomeIcon icon={faCircleExclamation} className={styles.icon} />
                            }
                        </div>
                        <p className={styles.error}>{errors?.firstName}</p>
                    </div>

                    <div>
                        <div className={styles.inputBox}>
                            <input className={styles.input} type="lastName" name="lastName" id="lastName" placeholder='Efternamn'
                                value={lastName}
                                onChange={(e) => {
                                    const input = e.target.value.replace(/\d+/g, "");
                                    setLastName(input)
                                }}
                                required />
                            {
                                errors.lastName &&
                                <FontAwesomeIcon icon={faCircleExclamation} className={styles.icon} />
                            }
                        </div>
                        <p className={styles.error}>{errors?.lastName}</p>
                    </div>
                </div>

                <div className={styles.flexInputFields}>
                    <div>
                        <div className={styles.inputBox}>
                            <input className={styles.input} type="text" name="streetName" id="streetName" placeholder='Gatunamn'
                                value={streetName}
                                onChange={(e) => {
                                    const input = e.target.value.replace(/\d+/g, "");
                                    setStreetName(input), console.log('value streetname', e.target.value)
                                }}
                                required
                            /> {/* kopierar datat som eventuellt redan finns i updatedUserData, sedan väljer jag address och kopierar det befintliga datat i det så det inte ska ersättas utan så att enbart streetname ska uppdateras i addressobjektet */}
                            {
                                errors.streetName &&
                                <FontAwesomeIcon icon={faCircleExclamation} className={styles.icon} />
                            }
                        </div>
                        <p className={styles.error}>{errors?.streetName}</p>
                    </div>

                    <div>
                        <div className={styles.inputBox}>
                            <input className={styles.input} type="text" name="streetNumber" id="streetNumber" placeholder='Gatunr'
                                value={streetNumber}
                                onChange={(e) => {
                                    setStreetNumber(e.target.value)
                                }} />
                            {
                                errors.streetNumber &&
                                <FontAwesomeIcon icon={faCircleExclamation} className={styles.icon} />
                            }
                        </div>
                        <p className={styles.error}>{errors?.streetNumber}</p>
                    </div>
                </div>

                <div className={styles.flexInputFields}>
                    <div>
                        <div className={styles.inputBox}>
                            <input className={styles.input} type="text" name="zipcode" id="zipcode" placeholder='Postnr'
                                maxLength={5}
                                value={zipcode || ""}
                                onChange={(e) => {
                                    const input = e.target.value.trim().replace(/\s+/g, "");
                                    if (!isNaN(+input)) {
                                        setZipcode(+input)
                                    }
                                }}
                                required />
                            {
                                errors.zipcode &&
                                <FontAwesomeIcon icon={faCircleExclamation} className={styles.icon} />
                            }
                        </div>
                        <p className={styles.error}>{errors?.zipcode}</p>
                    </div>

                    <div>
                        <div className={styles.inputBox}>
                            <input className={styles.input} type="text" name="city" id="city" placeholder='Postort'
                                value={city}
                                onChange={(e) => {
                                    const input = e.target.value.replace(/\d+/g, "");
                                    setCity(input)
                                }}
                                required
                            />
                            {
                                errors.city &&
                                <FontAwesomeIcon icon={faCircleExclamation} className={styles.icon} />
                            }
                        </div>
                        <p className={styles.error}>{errors?.city}</p>
                    </div>
                </div>
                <p className={styles.message}>{message}</p>
                {/* <button className={styles.registerButton}>Skapa konto</button> */}
                <Button text="Skapa konto" onClick={handleRegister} />
                <p className={styles.alreadyRegisteredMessage}>Har du redan ett konto? Logga in <Link href="/login">här</Link></p>
            </div>
        </form>
    )
}

export default RegisterComponent