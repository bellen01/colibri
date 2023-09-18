"use client";
import React, { useEffect, useState } from 'react';
import styles from '@/components/styles/Cart.module.scss';
import CartItem from '@/components/Cart/CartItem';
import Button from '@/components/General/Button';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import HeroHeading from '@/components/General/HeroHeading';
import { CartProduct } from '@/types/CartProduct.types';
import { getPosterById } from '../posters/fetchFunctions';
import { Poster } from '@/types/Product.types';

const Cart = () => {
    const state = useSelector((state: RootState) => state.cart);
    console.log('state i cart', state);
    const [cartProducts, setCartProducts] = useState<CartProduct[] | undefined>();
    const [totalQuantityOfCartProducts, setTotalQuantityOfCartProducts] = useState<number>();
    const [totalValueOfCartProducts, setTotalValueOfCartProducts] = useState<number>();
    const [products, setProducts] = useState<Poster[]>([]);

    // const getCartProductsFromDB = () => {
    //     // if (state) {
    //     state.products.forEach(product => getPosterById(product.id).then(result => {
    //         if (result) {
    //             setProducts([...products, result])
    //         }
    //     }))
    //     // }
    //     // const posterData = state.products.map(product => await getPosterById(product.id));
    //     // const products: Poster[] = [];
    //     // if (posterData) {
    //     //     posterData.forEach(poster => { products.push({ ...poster.data() as Poster, id: posterData.id }) })
    //     // }
    // }


    useEffect(() => {
        if (state) {
            // state.products.map(product => getPosterById(product.id).then(result => setProducts(result)));

            // state.products.forEach(product => getPosterById(product.id).then(result => {if (result) {setProducts([ ...products, result ])}}));
            setCartProducts(state.products);
            // getCartProductsFromDB();
            setTotalQuantityOfCartProducts(state.cartTotalQuantity);
            setTotalValueOfCartProducts(state.cartTotalAmount);
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
                            <p>Antal produkter: {totalQuantityOfCartProducts}</p>
                            <p>Total summa: {totalValueOfCartProducts} kr</p>
                        </div>
                        <Button text={"Till kassan"} width={"25%"} />
                    </div>
                </div>
                :
                <p className={styles.cartIsEmpty}>Din varukorg är tom</p>
            }
        </div>
    )
}

export default Cart