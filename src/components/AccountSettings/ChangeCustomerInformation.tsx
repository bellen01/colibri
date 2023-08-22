import React from 'react';
import styles from '@/components/styles/ChangeCustomerInformation.module.scss';
import Button from '../General/Button';

interface IChangeCustomerInformationProps {
    setState: (val: string) => void;
}

const ChangeCustomerInformation = ({ setState }: IChangeCustomerInformationProps) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h2 className={styles.h2}>Ändra dina uppgifter</h2>
                <form action="" className={styles.formContainer}>
                    <input type="text" name="firstName" id="firstName" placeholder='Förnamn' />
                    <input type="text" name="lastName" id="lastName" placeholder='Efternamn' />
                    <input type="text" name="streetName" id="streetName" placeholder='Gatunamn' />
                    <input type="text" name="zipcode" id="zipcode" placeholder='Postnr' />
                    <input type="text" name="city" id="city" placeholder='Postort' />
                    <input type="text" name="mail" id="mail" placeholder='Epost' />
                    <input type="text" name="mobile" id="mobile" placeholder='Mobilnr' />
                </form>
                <div className={styles.buttonContainer}>
                    <button onClick={() => setState("customerInformation")} className={styles.cancelButton}>Avbryt</button>
                    <Button text="Spara" width='25%' />
                    {/* <button>Spara</button> */}
                </div>
            </div>
        </div>
    )
}

export default ChangeCustomerInformation