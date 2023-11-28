"use client";
import React, { useEffect, useState } from 'react';
import styles from '@/components/styles/Cart.module.scss';
import CartItem from '@/components/Cart/CartItem';
import Button from '@/components/General/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import HeroHeading from '@/components/General/HeroHeading';
import { CartProduct } from '@/types/CartProduct.types';
// import { getPosterById } from '../posters/fetchFunctions';
// import { Poster } from '@/types/Product.types';
import { getCartItems, updateCartItems } from './fetchFunctionsCart';
// import { Order } from '@/types/Order.types';
import { PosterData } from '../api/(cart)/getcartitems/route';
// import CartItem2 from '@/components/Cart/CartItem2';
import { addToCart, updateCartFromDB } from '@/redux/features/cartSlice';

const Cart = () => {
    const state = useSelector((state: RootState) => state.cart);
    console.log('state i cart', state);
    const [cartProducts, setCartProducts] = useState<CartProduct[] | undefined>();
    // const [totalQuantityOfCartProducts, setTotalQuantityOfCartProducts] = useState<number>();
    // const [totalValueOfCartProducts, setTotalValueOfCartProducts] = useState<number>();
    const isUserLoggedIn = useSelector((state: RootState) => state.auth);
    // const [products, setProducts] = useState<Poster[]>([]);
    const dispatch = useDispatch();
    const [totalQuantity, setTotalQuantity] = useState<number>();
    const [totalValue, setTotalValue] = useState<number>();
    const [changedStateWithDBProducts, setChangedStateWithDBProducts] = useState(false);


    // const [cartItemsDB, setCartItemsDB] = useState<PosterData[]>();




    const getCartItemsFromDB = async () => {
        try {
            const res = await getCartItems();
            if (res.status === 200) {
                let cartDataFromDB: PosterData[];
                cartDataFromDB = await res.json();
                if (cartDataFromDB) {
                    console.log('cartDataFromDB', cartDataFromDB);
                    console.log('state.products', state.products);
                    cartDataFromDB.forEach(poster => {
                        let posterFound = state.products.find(product => product.id === poster.item_id && product.priceAndSize.size === poster.priceAndSize.size);
                        // console.log('posterfound', posterFound);
                        if (posterFound == undefined) {
                            // console.log('poster', poster);
                            // console.log('posterfound', posterFound);
                            // console.log('lägg till poster i redux');
                            dispatch(addToCart(poster));
                            setChangedStateWithDBProducts(true);
                        } else if (posterFound && poster.quantity !== posterFound.quantity) {
                            // console.log('poster', poster);
                            // console.log('posterfound', posterFound);
                            // console.log('uppdatera antalet av postern i redux');
                            if (poster.quantity < posterFound.quantity) {
                                // console.log('db lower in quantity');
                                dispatch(updateCartFromDB(poster));
                                setChangedStateWithDBProducts(true);
                            } else {
                                setChangedStateWithDBProducts(true);
                            }
                        }
                    })
                    state.products.forEach(poster => {
                        let foundPosterInDB = cartDataFromDB.find(product => product.item_id === poster.id && product.priceAndSize.size === poster.priceAndSize.size);
                        // console.log('foundposterindb', foundPosterInDB)
                        if (foundPosterInDB == undefined) {
                            // console.log('foundPosterInDB i if', foundPosterInDB);
                            setChangedStateWithDBProducts(true);
                        }
                    })
                }
                // setCartItemsDB(cartData);
            }
        } catch (error) {
            console.log('error i getCartItems i getCartItemsFromDB i cart page', error);
        }
        // console.log('state.products efter try catch', state.products);
        // console.log('cartitemsDb', cartItemsDB);
    }

    const updateDBWithReduxState = async () => {
        // console.log('i updateDBwithreduxstate');
        // console.log('state.products i updatedbwithreduxstate', state.products);
        try {
            const res = await updateCartItems(state.products);
            if (res.status === 200) {
                console.log('status 200', res);
                // getCartItemsFromDB2();
                // const responseIngetCartItems = await getCartItems();
                // if (responseIngetCartItems.status === 200) {

                //     setCartItemsDB();
                // }
            }
        } catch (error) {
            console.log('error i replacecartitems i getcartitems i cart page', error);
        }
        setChangedStateWithDBProducts(false);
    }

    // const date = new Date();
    // console.log('dagens datum', date);

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
            // state.products.map(product => getPosterById(product.id).then(result => setProducts(result)));

            // state.products.forEach(product => getPosterById(product.id).then(result => {if (result) {setProducts([ ...products, result ])}}));
            setCartProducts(state.products);
            // getCartProductsFromDB();
            // setTotalQuantityOfCartProducts(state.cartTotalQuantity);
            // setTotalValueOfCartProducts(state.cartTotalAmount);
        }
    }, [state]);

    useEffect(() => {
        console.log('isUserLoggedIn.isloggedin', isUserLoggedIn.isLoggedIn);
        if (isUserLoggedIn.isLoggedIn) {
            getCartItemsFromDB();
        }
        // if (cartItemsDB) {
        //     checkForPosterDiffInReduxAndDB();
        // }

    }, [isUserLoggedIn, /*cartItemsDB*/]);

    useEffect(() => {
        if (changedStateWithDBProducts) {
            updateDBWithReduxState();
        }
    }, [changedStateWithDBProducts]);

    // console.log('cartitemsdb i useeffect', cartItemsDB);
    // console.log('cartproducts', cartProducts);

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
                            {/* <p>Antal produkter: {totalQuantityOfCartProducts}</p> */}
                            {/* <p>Total summa: {totalValueOfCartProducts} kr</p> */}
                        </div>
                        <Button text={"Till kassan"} width={"25%"} />
                    </div>
                </div>
                :
                <p className={styles.cartIsEmpty}>Din varukorg är tom</p>
            }
            {/* {cartItemsDB &&
                <div>
                    {cartItemsDB.map((poster) => (
                        <CartItem2 posterData={poster} key={`${poster.item_id}${poster.priceAndSize.size}`} />
                    ))}
                </div>
            } */}
        </div>
    )
}

export default Cart