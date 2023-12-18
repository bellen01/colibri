"use client";
import React, { useEffect, useState } from 'react';
import styles from '@/components/styles/Cart.module.scss';
import CartItem from '@/components/Cart/CartItem';
import Button from '@/components/General/Button';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import HeroHeading from '@/components/General/HeroHeading';
import { CartProduct } from '@/types/CartProduct.types';
import Link from 'next/link';

const Cart = () => {
    const state = useSelector((state: RootState) => state.cart);
    console.log('state i cart', state);
    const [cartProducts, setCartProducts] = useState<CartProduct[] | undefined>();
    const [totalQuantity, setTotalQuantity] = useState<number>();
    const [totalValue, setTotalValue] = useState<number>();


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

    useEffect(() => {
        getTotalQuantityAndTotalPrice();
        if (state) {
            setCartProducts(state.products);
        }
    }, [state]);


    return (
        <div>
            <HeroHeading heading={"Varukorg"} />
            {cartProducts && cartProducts.length !== 0 ?
                <div>
                    {cartProducts.map((product) => (
                        <CartItem productId={product.id} productDetails={product} key={`${product.id}${product.priceAndSize.size}`} />
                    ))}
                    <div className={styles.buttonContainer}>
                        <div>
                            <p>Antal produkter: {totalQuantity}</p>
                            <p>Total summa: {totalValue} kr</p>
                        </div>
                        <Link href='/checkout'><Button text={"Till kassan"} width={"25%"} /></Link>
                    </div>
                </div>
                :
                <p className={styles.cartIsEmpty}>Din varukorg är tom</p>
            }
        </div>
    )
}

export default Cart