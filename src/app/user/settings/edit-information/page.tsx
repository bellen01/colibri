"use client";
import React, { useEffect, useState } from 'react';
import styles from '@/components/styles/ChangeCustomerInformation.module.scss';
import Button from '@/components/General/Button';
import Link from 'next/link';
import { User } from '@/types/User.types';
import { getUserData } from '../../fetchFunctionsUser';
import { updateUserInformation } from '../../fetchFunctionsUser';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

interface IChangeCustomerInformationProps {
    setState: (val: string) => void;
}

export type UserInformation = {
    firstName?: string,
    lastName?: string,
    address: {
        streetName?: string,
        streetNumber?: string,
        zipcode?: number | string,
        city?: string,
    }
}

type Errors = {
    firstName?: string,
    lastName?: string,
    streetName?: string,
    streetNumber?: string,
    zipcode?: number | string,
    city?: string,
}

const ChangeCustomerInformation = ({ setState }: IChangeCustomerInformationProps) => {
    const router = useRouter();
    const [userData, setUserData] = useState<User>();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [streetName, setStreetName] = useState("");
    const [streetNumber, setStreetNumber] = useState<string>("");
    const [zipcode, setZipcode] = useState<string | number>("");
    const [city, setCity] = useState("");
    const [message, setMessage] = useState<string | undefined>();
    const [errors, setErrors] = useState<Errors>({});
    let updatedInformation: UserInformation = {
        address: {},
    };


    const validateForm = () => {
        let errors: Errors = {} as Errors;
        if (userData) {
            // if (firstName.trim() !== userData.firstName) {
            if (firstName.trim() !== userData.firstName) {
                console.log('firstName i validateform', firstName);
                if (firstName.trim().length == 0 || firstName == undefined) {
                    errors.firstName = "Förnamn saknas"
                } else {
                    updatedInformation.firstName = firstName.trim();
                    // setUpdatedUserData({ ...updatedUserData, firstName: firstName })
                }
            }
            if (lastName.trim() !== userData.lastName) {
                if (lastName.trim().length == 0 || lastName == undefined) {
                    errors.lastName = "Efternamn saknas"
                } else {
                    updatedInformation.lastName = lastName.trim();
                }
            }
            if (streetName.trim() !== userData.address.streetName) {
                if (streetName.trim().length == 0 || streetName == undefined) {
                    errors.streetName = "Gatunamn saknas"
                } else {
                    updatedInformation.address.streetName = streetName.trim();
                    // updatedInformation.address = { ...updatedInformation.address, streetName: streetName }; //lösning om jag inte hade satt ett address objekt i updatedinformation
                }
            }
            if (streetNumber.trim() !== userData.address.streetNumber) {
                if (streetNumber.trim().length == 0 || streetNumber == undefined) {
                    errors.streetNumber = "Gatunr saknas"
                } else {
                    updatedInformation.address.streetNumber = streetNumber.trim();
                    // updatedInformation.address = { ...updatedInformation.address, streetNumber: streetNumber }; //lösning om jag inte hade satt ett address objekt i updatedinformation
                    // setUpdatedUserData({ ...updatedUserData, address: { ...updatedUserData?.address, streetNumber: streetNumber } })
                }
            }
            if (+zipcode !== userData.address.zipcode) {
                if (zipcode.toString().length == 0 || zipcode == undefined) {
                    errors.zipcode = "Postnr saknas"
                } else if (zipcode.toString().length < 5) {
                    errors.zipcode = "Postnummer måste vara 5 siffror"
                } else {
                    updatedInformation.address.zipcode = +zipcode;
                    // updatedInformation.address = { ...updatedInformation.address, zipcode: +zipcode }; //lösning om jag inte hade satt ett address objekt i updatedinformation
                }
            }
            if (city.trim() !== userData.address.city) {
                if (city.trim().length == 0 || city == undefined) {
                    errors.city = "Postort saknas"
                } else {
                    updatedInformation.address.city = city.trim();
                    // updatedInformation.address = { ...updatedInformation.address, city: city }; //lösning om jag inte hade satt ett address objekt i updatedinformation
                }
            }

        }
        setErrors(errors);
        console.log('errors i validateform i edit information', errors);
        // setIsFormValid(Object.keys(errors).length === 0);
        if (Object.keys(errors).length === 0) {
            return true;
        } else {
            return false;
        }
    }

    const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
        setMessage("")
        console.log('errors usestate', errors)
        e.preventDefault();
        const isFormValid = validateForm();
        console.log('updatedinformation', updatedInformation);
        const numberOfKeysInUpdatedInformation = Object.keys(updatedInformation).length + Object.keys(updatedInformation.address).length;
        console.log('number of keys updatedinformation', numberOfKeysInUpdatedInformation)
        if (isFormValid) {
            console.log('formuläret är okej', isFormValid);
            console.log('updatedinformation', updatedInformation);
            if (userData && numberOfKeysInUpdatedInformation > 1) { //TODO lägga till check för null?
                try {
                    console.log('number of keys updatedinformation in try catch', numberOfKeysInUpdatedInformation)
                    const res = await updateUserInformation(userData.id, updatedInformation).then(res => { return res });
                    console.log('res i handlesave i edit information', res);
                    console.log('res status', res?.status);
                    if (res?.status === 200) {
                        setMessage('Din nya information har sparats');
                        setTimeout(() => {
                            router.push("/user/settings");
                        }, 2000);
                    } else if (res?.status === 412) {
                        setMessage('Formuläret har fel, vänligen åtgärda dom och försök spara igen')
                        const data = await res.json();
                        console.log('fält', data.field);
                        if (data.field === "firstName") { //TODO om problemet sker pga något i backend och inte något i clienten, måste jag meddela användaren om det specifika problemet då?
                            setErrors({ ...errors, firstName: "Förnamn saknas" });
                        }
                        if (data.field === "lastName") {
                            setErrors({ ...errors, lastName: "Efternamn saknas" });
                        }
                        if (data.field === "streetName") {
                            setErrors({ ...errors, streetName: "Gatunamn saknas" });
                        }
                        if (data.field === "streetNumber") {
                            setErrors({ ...errors, streetNumber: "Gatunr saknas" });
                        }
                        if (data.field === "zipcode") {
                            setErrors({ ...errors, zipcode: "Postnummer saknas eller är inte tillräckligt långt" });
                        }
                        if (data.field === "city") {
                            setErrors({ ...errors, city: "Postort saknas" });
                        }
                    } else {
                        setMessage('Något gick fel, vänligen försök senare igen.')
                    }
                } catch (error: any) {
                    console.log('error i handlesave i edit information', error);
                    setMessage('Något gick fel, vänligen försök senare igen.')
                }
            } else {
                setMessage('Ingen information har ändrats i formuläret, vänligen fyll i din nya information') //TODO hur hantera detta?
            }
        } else {
            console.log('Formuläret har fel', isFormValid);
            setMessage('Formuläret har fel, vänligen åtgärda dom och försök spara igen')
        }
    }

    useEffect(() => {
        setErrors({});
        setMessage("")
        if (userData == undefined) {
            getUserData().then(data => { if (data) { setUserData(data[0]) } });
        }
        if (userData) {
            setFirstName(userData?.firstName);
            setLastName(userData?.lastName);
            setStreetName(userData?.address?.streetName);
            setStreetNumber(userData?.address?.streetNumber);
            setZipcode(userData?.address?.zipcode);
            setCity(userData?.address?.city);
        }
    }, [userData]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h2 className={styles.h2}>Ändra dina uppgifter</h2>
                <form className={styles.formContainer} /*onSubmit={handleSave}*/>

                    <div className={styles.inputBox}>
                        <input className={styles.input} type="text" name="firstName" id="firstName" placeholder='Förnamn'
                            value={firstName}
                            onChange={(e) => {
                                const input = e.target.value.replace(/\d+/g, "");
                                setFirstName(input)
                            }}
                            required />
                        {
                            errors.firstName &&
                            <FontAwesomeIcon icon={faCircleExclamation} className={styles.icon} />
                        }
                    </div>
                    <p className={styles.error}>{errors?.firstName}</p>

                    <div className={styles.inputBox}>
                        <input className={styles.input} type="text" name="lastName" id="lastName" placeholder='Efternamn'
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

                    <div className={styles.inputBox}>

                        <input className={styles.input} type="text" name="streetNumber" id="streetNumber" placeholder='Gatunr'
                            value={streetNumber}
                            onChange={(e) => { setStreetNumber(e.target.value) }} />
                        {
                            errors.streetNumber &&
                            <FontAwesomeIcon icon={faCircleExclamation} className={styles.icon} />
                        }
                    </div>
                    <p className={styles.error}>{errors?.streetNumber}</p>

                    <div className={styles.inputBox}>
                        <input className={errors.zipcode ? styles.inputError : styles.input} type="text" name="zipcode" id="zipcode" placeholder='Postnr'
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

                    <div className={styles.inputBox}>
                        <input className={errors.city ? styles.inputError : styles.input} type="text" name="city" id="city" placeholder='Postort'
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

                    {/* <input type="text" name="firstName" id="firstName" placeholder='Förnamn'
                        value={updatedUserData?.firstName !== undefined ? updatedUserData?.firstName : userData?.firstName || ""} //hur göra det här mer överskådligt och lättare att läsa? Egna usestates per fält? Sen bygga upp objektet som ska skickas till endpointen
                        onChange={(e) => setUpdatedUserData({ ...updatedUserData, firstName: e.target.value})}
                        required />
                        <p>{errors?.firstName}</p>
                    <input type="text" name="lastName" id="lastName" placeholder='Efternamn'
                        value={updatedUserData?.lastName !== undefined ? updatedUserData?.lastName : userData?.lastName || ""} //hur göra det här mer överskådligt och lättare att läsa? Egna usestates per fält? Sen bygga upp objektet som ska skickas till endpointen
                        onChange={(e) => setUpdatedUserData({ ...updatedUserData, lastName: e.target.value })}
                        required />
                        <p>{errors?.lastName}</p>
                    <input type="text" name="streetName" id="streetName" placeholder='Gatunamn'
                        value={updatedUserData?.address?.streetName ? updatedUserData?.address?.streetName : userData?.address.streetName || ""}
                        onChange={(e) => setUpdatedUserData({ ...updatedUserData, address: { ...updatedUserData?.address, streetName: e.target.value } })} /> kopierar datat som eventuellt redan finns i updatedUserData, sedan väljer jag address och kopierar det befintliga datat i det så det inte ska ersättas utan så att enbart streetname ska uppdateras i addressobjektet
                    <p>{errors?.streetName}</p>
                    <input type="text" name="streetNumber" id="streetNumber" placeholder='Gatunr'
                        value={updatedUserData?.address?.streetNumber ? updatedUserData?.address?.streetNumber : userData?.address.streetNumber || ""}
                        onChange={(e) => setUpdatedUserData({ ...updatedUserData, address: { ...updatedUserData?.address, streetNumber: e.target.value } })} />
                    <p>{errors?.streetNumber}</p>
                    <input type="number" name="zipcode" id="zipcode" placeholder='Postnr'
                        value={updatedUserData?.address?.zipcode ? updatedUserData?.address?.zipcode : userData?.address.zipcode || ""}
                        onChange={(e) => setUpdatedUserData({ ...updatedUserData, address: { ...updatedUserData?.address, zipcode: e.target.value } })} />
                    <p>{errors?.zipcode}</p>
                    <input type="text" name="city" id="city" placeholder='Postort'
                        value={updatedUserData?.address?.city ? updatedUserData?.address?.city : userData?.address.city || ""}
                        onChange={(e) => setUpdatedUserData({ ...updatedUserData, address: { ...updatedUserData?.address, city: e.target.value } })} />
                    <p>{errors?.city}</p> */}
                    {/* <input type="text" name="mail" id="mail" placeholder='Epost' /> */}
                </form>
                <p className={styles.message}>{message}</p>
                <div className={styles.buttonContainer}>
                    <Link href="/user/settings"><button className={styles.cancelButton}>Avbryt</button></Link>
                    <Button text="Spara" width='25%' onClick={handleSave} />
                    {/* <button type="submit">Spara</button> */}
                </div>
            </div>
        </div>
    )
}

export default ChangeCustomerInformation