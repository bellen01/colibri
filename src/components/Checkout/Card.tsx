'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/components/styles/Card.module.scss';
import Button from '../General/Button';


type CardErrors = {
    nameOnCard?: string,
    cardNumber?: string,
    cardExpiration?: string,
    cvc?: string,
}

const Card = () => {
    const [nameOnCard, setNameOnCard] = useState<string | undefined>('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiration, setCardExpiration] = useState<string | undefined>('');
    const [CVC, setCVC] = useState<string>('');
    const [cardExpirationMonth, setCardExpirationMonth] = useState<string>();
    const [cardExpirationYear, setCardExpirationYear] = useState<string>();
    const [errors, setErrors] = useState<CardErrors>({});

    // const numberWithSpaces = (e) => {
    //     return e.target.value
    // }

    // const formatCardNumber = () => {
    //     const rawText = [...cardNumber.split(' ').join('')] // Remove old space
    //     const creditCard = [] // Create card as array
    //     rawText.forEach((t, i) => {
    //         if (i % 4 === 0 && i !== 0) creditCard.push(' ') // Add space
    //         creditCard.push(t)
    //     })
    //     return creditCard.join('') // Transform card array to string
    // }

    const validateCard = () => {
        let errors: CardErrors = {};

        if (!nameOnCard?.trim()) {
            errors.nameOnCard = 'Kortinnehavare saknas';
        } else if (nameOnCard.trim().length < 3 || nameOnCard == undefined) {
            errors.nameOnCard = 'Kortinnehavare är för kort'
        } else {
            setNameOnCard(nameOnCard.trim());
        }

        if (!cardNumber) {
            errors.cardNumber = 'Kortnummer saknas';
        } else if (cardNumber.length < 19) {
            errors.cardNumber = 'Kortnumret är för kort';
        }

        if (!cardExpiration?.trim()) {
            errors.cardExpiration = 'Utgångsdatum saknas';
        } else if (cardExpiration.length < 5) {
            errors.cardExpiration = 'Ugångsdatum är för kort';
        }
        if (cardExpiration && cardExpiration.length === 5) {
            let monthAndYearStrings = cardExpiration.split('/');
            console.log('monthAndYearStrings', monthAndYearStrings);
            let currentYear = new Date().getFullYear();
            console.log('currentYear', currentYear);
            let currentYearShort = currentYear.toString().substring(2, 4);
            console.log('currentYearShort', currentYearShort);
            let maxExpireYear = +currentYearShort + 5;
            console.log('maxExpireYear', maxExpireYear);
            if (monthAndYearStrings[1] < currentYearShort) {
                errors.cardExpiration = 'Året har redan varit';
            } else if (+monthAndYearStrings[1] > maxExpireYear) {
                errors.cardExpiration = 'Året är för långt in i framtiden'
            }
            // if (!cardExpiration?.trim()) {
            //     errors.cardExpiration = 'Utgångsdatum saknas';
            // } else if (cardExpiration.length < 5) {
            //     errors.cardExpiration = 'Ugångsdatum är för kort';
            // }
        }

        if (!CVC) {
            errors.cvc = 'CVC/CVV saknas';
        } else if (CVC.length < 3) {
            errors.cvc = 'CVC/CVV är för kort';
        }

        setErrors(errors);
        if (Object.keys(errors).length === 0) {
            return true;
        } else {
            return false;
        }
    }

    const checkCardInformation = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('nameOnCard', nameOnCard);
        console.log('cardNumber', cardNumber);
        console.log('cardExpiration', cardExpiration);
        console.log('CVC', CVC);
        const isCardValid = validateCard();
        console.log('isCardValid', isCardValid);
    }

    function cc_expires_format(e: any) {
        // let formattedAndValidatedInput;
        // if (/^\d{3,}$/.test(e.target.value)) {
        //     let formattedWithSlash = e.target.value.match(new RegExp('.{1,2}', 'g')).join('/');
        //     let monthAndYear = formattedWithSlash.split('/');
        //     monthAndYear[0].test()
        // }
        // return e.target.value.replace(
        return e.target.value.replace(
            /[^0-9]/g, '' // To allow only numbers
        ).replace(
            /^([2-9])$/g, '0$1' // To handle 3 > 03
        ).replace(
            /^(1)([3-9]{1})$/g, '0$1/$2' // 13 > 01/3
        ).replace(
            /^0{1,}/g, '0' // To handle 00 > 0
        ).replace(
            /^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, '$1/$2' // To handle 113 > 11/3
        );



    }

    useEffect(() => {
        setErrors({});
    }, []);


    return (
        <div className={styles.inputContainer}>
            <p className={styles.information}>Fyll i kortuppgifter</p>
            <div className={styles.inputBox}>
                <input className={styles.input} type="text" placeholder='Kortinnehavarens namn' value={nameOnCard}
                    onChange={e => {
                        const input = e.target.value.replace(/\d+/g, "");
                        setNameOnCard(input)
                    }} />
            </div>
            <p className={styles.error}>{errors?.nameOnCard}</p>
            <div className={styles.inputBox}>
                <input className={styles.input} type="tel" pattern='[0-9]' maxLength={19} placeholder='Kortnummer' value={cardNumber}
                    // onChange={e => {setCardNumber(e.target.value)}} />
                    onChange={e => {
                        const formattedNumber = e.target.value
                            .replace(/[^0-9]/gi, '')
                            .replace(/(.{4})/g, '$1 ').trim();
                        setCardNumber(formattedNumber)
                    }} />

            </div>
            <p className={styles.error}>{errors?.cardNumber}</p>
            <div className={styles.flexInputFields}>
                <div>
                    <div className={styles.inputBox}>
                        <input className={styles.input} type="text" pattern='[0-9]' maxLength={5} placeholder='MM/ÅÅ' value={cardExpiration} onChange={e => { setCardExpiration(cc_expires_format(e)) }} />
                        {/* <input className={styles.input} type="text" placeholder='MM/ÅÅ' value={cardExpiration} onChange={e => { setCardExpiration(validateAndFormatExpirationDate(e)) }} /> */}
                        {/* <input className={styles.input} type="text" placeholder='MM' maxLength={2} pattern='[0-9]' value={cardExpirationMonth} onChange={e => { setCardExpirationMonth(e.target.value) }} />
                    <p> / </p>
                <input className={styles.input} type="text" placeholder='ÅÅ' maxLength={2} pattern='[0-9]' value={cardExpirationYear} onChange={e => { setCardExpirationYear(e.target.value) }} /> */}
                    </div>
                    <p className={styles.error}>{errors?.cardExpiration}</p>
                </div>
                <div>
                    <div className={styles.inputBox}>
                        <input className={styles.input} type="text" maxLength={3} pattern='[0-9]' placeholder='CVC/CVV' value={CVC}
                            onChange={e => {
                                const input = e.target.value.trim().replace(/[^0-9]/gi, '').replace(/\s+/g, "")
                                setCVC(input)
                            }} />
                    </div>
                    <p className={styles.error}>{errors?.cvc}</p>
                </div>
            </div>
            <Button text='Kontrollera kort' width='50%' onClick={checkCardInformation} />
        </div>
    )
}

export default Card