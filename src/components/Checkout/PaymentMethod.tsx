'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/components/styles/PaymentMethod.module.scss';
import Card from './Card';
import Invoice from './Invoice';
import Button from '../General/Button';
import { CartProduct } from '@/types/CartProduct.types';
import { saveOrder } from '@/app/(sharedLayout)/cart/fetchFunctionsCart';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

type IPaymentMethod = {
    validateCard?: boolean,
}

const PaymentMethod = (/*{ validateCard }: IPaymentMethod*/) => {
    const [chosenPaymentMethod, setChosenPaymentMethod] = useState('invoice');

    const state = useSelector((state: RootState) => state.cart);
    console.log('state i cart', state);
    const isUserLoggedIn = useSelector((state: RootState) => state.auth);
    const [cartProducts, setCartProducts] = useState<CartProduct[] | undefined>();
    const [totalQuantity, setTotalQuantity] = useState<number>();
    const [totalValue, setTotalValue] = useState<number>();
    const shippingCost = 49;
    const currency = "kr";
    const [validateCard, setValidateCard] = useState<boolean>(false);
    const [paymentMethod, setPaymentMethod] = useState<string>('card')


    const handlePaymentChoice = (value: string) => {
        setChosenPaymentMethod(value);
    }

    const getTotalQuantityAndTotalPrice = () => {
        let quantity = 0;
        let price = 0;
        if (state.products) {
            state.products.forEach((product) => {
                quantity += product.quantity;
                price += product.priceAndSize.price * product.quantity;
            })
        }
        setTotalQuantity(quantity);
        setTotalValue(price);
    }

    const triggerValidateCard = () => { //TODO
        setValidateCard(true);

    }

    const handlePurchase = async () => {
        // setValidateCard(true);
        console.log('klickat på betala');
        let totalPrice;
        if (totalValue) {
            totalPrice = totalValue + shippingCost;
        }
        if (chosenPaymentMethod === 'card') {
            setValidateCard(true);
        }
        if (cartProducts && totalQuantity && totalPrice) {
            try {
                const res = await saveOrder(cartProducts, totalQuantity, totalPrice, paymentMethod);
                if (res.status === 200) {
                    console.log('status 200');
                }
            } catch (error) {
                console.log('error i saveOrder i handlePurchase i checkout page', error);
            }

        }
        console.log('datum', new Date());
    }

    useEffect(() => {
        console.log('userloggedin', isUserLoggedIn.isLoggedIn);
        getTotalQuantityAndTotalPrice();
        if (state) {
            // state.products.map(product => getPosterById(product.id).then(result => setProducts(result)));

            // state.products.forEach(product => getPosterById(product.id).then(result => {if (result) {setProducts([ ...products, result ])}}));
            setCartProducts(state.products);
            // getCartProductsFromDB();
            // setTotalQuantityOfCartProducts(state.cartTotalQuantity);
            // setTotalValueOfCartProducts(state.cartTotalAmount);
        }
    }, [state]);

    return (
        <div>
            <h4 className={styles.heading}>Betalningssätt</h4>
            <div className={styles.paymentContainer}>
                <div className={styles.invoice}>
                    <div className={styles.radioButtonContainer}>
                        <input
                            className={styles.radiobuttons}
                            type='radio'
                            id='invoice'
                            value='invoice'
                            name='payment-method'
                            onChange={e => handlePaymentChoice(e.target.value)}
                            checked={chosenPaymentMethod === 'invoice'}
                        />
                        <label className={styles.label} htmlFor="invoice">Betala med faktura</label>
                    </div>
                    {chosenPaymentMethod === 'invoice' &&
                        <Invoice />
                    }
                </div>
                <div className={styles.card}>
                    <div className={styles.radioButtonContainer}>
                        <input
                            className={styles.radiobuttons}
                            type='radio'
                            id='card'
                            value='card'
                            name='payment-method'
                            onChange={e => handlePaymentChoice(e.target.value)}
                            checked={chosenPaymentMethod === 'card'}
                        />
                        <label className={styles.label} htmlFor="card">Betala med kort</label>
                    </div>
                    {chosenPaymentMethod === 'card' &&
                        <Card />
                    }
                </div>
            </div>
            <div className={styles.totalSumContainer}>
                <p>Total summa inklusive moms och frakt:</p>
                <p className={styles.totalSum}>{totalValue && totalValue + shippingCost} {currency}</p>
            </div>
            <div className={styles.buttonContainer}>
                <Button text='Betala köp' width='80%' onClick={handlePurchase} />
            </div>
        </div>
    )
}

export default PaymentMethod