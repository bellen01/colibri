'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/components/styles/Checkout.module.scss';
import CartItem from '@/components/Cart/CartItem';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { CartProduct } from '@/types/CartProduct.types';
import HeroHeading from '@/components/General/HeroHeading';
import Button from '@/components/General/Button';
import Link from 'next/link';
import CustomerInformation from '@/components/Checkout/CustomerInformation';
import PaymentMethod from '@/components/Checkout/PaymentMethod';
import { saveOrder } from '../cart/fetchFunctionsCart';



const Checkout = () => {
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

    //products, paymentmethod

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

    const handlePurchase = async () => {
        // setValidateCard(true);
        console.log('klickat på betala');
        let totalPrice;
        if (totalValue) {
            totalPrice = totalValue + shippingCost;
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
            <HeroHeading heading={'Kassan'} />
            {cartProducts && cartProducts.length !== 0 ?
                <div>
                    <div className={styles.productContainer}>
                        {cartProducts.map(product => (
                            <CartItem productId={product.id} productDetails={product} key={`${product.id}${product.priceAndSize.size}`} />
                        ))}
                        <div className={styles.quantityAndPriceContainer}>
                            <div className={styles.totalPriceContainer}>
                                <p>Antal produkter: {totalQuantity}</p>
                                <p>Pris: {totalValue} {currency}</p>
                                <p>Frakt: {shippingCost} {currency}</p>
                                <p>Total summa: {totalValue && totalValue + shippingCost} {currency}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.completePurchaseContainer}>
                        <div className={styles.purchaseContainer}>
                            <div className={styles.completePurchaseHeading}>
                                <h3 className={styles.purchaseHeading}>Slutför ditt köp</h3>
                            </div>
                            {isUserLoggedIn.isLoggedIn ?
                                <div className={styles.customerInformation}>
                                    {/* <p>Dina uppgifter</p> */}
                                    <CustomerInformation heading={'Dina uppgifter'} />
                                    {/* <p>Leverans</p> */}
                                    <CustomerInformation heading={'Leveransuppgifter'} />
                                    <PaymentMethod /*validateCard={validateCard}*/ />
                                    {/* <div className={styles.totalSumContainer}>
                                        <p>Total summa inklusive moms och frakt:</p>
                                        <p className={styles.totalSum}>{totalValue && totalValue + shippingCost} {currency}</p>
                                    </div>
                                    <div className={styles.buttonContainer}>
                                        <Button text='Betala köp' width='80%' onClick={handlePurchase} />
                                    </div> */}
                                </div>
                                :
                                <div>
                                    <p>Logga in för att färdigställa ditt köp.</p>
                                    <Link href="/login"><Button text={'Logga in'} /></Link>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                :
                <p className={styles.cartIsEmpty}>Det finns ingenting i varukorgen ännu</p>
            }
        </div>
    )
}

export default Checkout