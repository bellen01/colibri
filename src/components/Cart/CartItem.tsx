"use client";
import React, { useEffect, useState } from 'react';
import styles from '@/components/styles/CartItem.module.scss';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { CartProduct } from '@/types/CartProduct.types';
import { decreaseCartItem, increaseCartItem, removeItem } from '@/redux/features/cartSlice';
import Link from 'next/link';
import { Poster } from '@/types/Product.types';
import { getPosterById } from '@/app/posters/fetchFunctions';
import { RootState } from '@/redux/store';
import { deleteCartItem, decreaseItemInCart, addCartItem } from '@/app/cart/fetchFunctionsCart';

interface ICartItemProps {
    productId: string,
    productDetails: CartProduct
}

const CartItem = ({ productId, productDetails }: ICartItemProps) => {
    const dispatch = useDispatch();
    const [productData, setProductData] = useState<Poster | undefined>()
    const [message, setMessage] = useState<string>();
    const isUserLoggedIn = useSelector((state: RootState) => state.auth);
    const currency = "kr";

    const handleRemove = async () => {
        dispatch(removeItem(productDetails));
        if (isUserLoggedIn.isLoggedIn) {
            try {
                const res = await deleteCartItem(productDetails.id, productDetails.priceAndSize, productDetails.quantity);
                if (res.status === 200) {
                    console.log('status 200');
                } else {
                    console.log('status inte 200');
                }
            } catch (error) {
                console.log('error i deletecartitem i handleremove i cartitem', error);
            }
        }
    };

    const handleDecrease = async () => {
        dispatch(decreaseCartItem(productDetails));
        if (isUserLoggedIn.isLoggedIn) {
            try {
                const res = await decreaseItemInCart(productDetails.id, productDetails.priceAndSize, 1);
                if (res.status === 200) {
                    console.log('status 200');
                } else {
                    console.log('status inte 200');
                }
            } catch (error) {
                console.log('error i deletecartitem i handleremove i cartitem', error);
            }
        }
    };

    const handleIncrease = async () => {
        dispatch(increaseCartItem(productDetails));
        if (isUserLoggedIn.isLoggedIn) {
            try {
                const res = await addCartItem(productDetails.id, productDetails.priceAndSize, 1);
                if (res.status === 200) {
                    console.log('added to db in addcartitem in handleIncrease in cartitem');
                } else {
                    console.log('Något gick fel i addcartitem i cartitem');
                }
            } catch (error) {
                console.log('error i addCartItem i handleincrease i cartitem', error);
            }
        }
    };

    const getPoster = async () => {
        try {
            const res = await getPosterById(productId);
            console.log('res i cartItem', res);
            if (res?.status === 200) {
                let posterData: Poster;
                posterData = await res.json();
                setProductData(posterData);
                console.log('hej', productId);
            } else {
                console.log('error i getPoster');
                console.log('productData i cartitem', productData);
                setMessage('Något gick fel, vänligen försök senare igen');
            }
        } catch (error) {
            console.log('error i getPoster', error);
            setMessage('Något gick fel, vänligen försök senare igen');
        }
    }

    useEffect(() => {
        if (productId) {
            getPoster();
        }
    }, [productId]);


    return (
        <div>
            {/* {
                !productData ?
                    <p>{message}</p>
                    : */}
            <div className={styles.cartItemWrapper}>
                <div className={styles.imageContainer}>
                    <Link href={`/poster/${productId}`}>
                        <img src={productData?.image.img} alt={productData?.image.altText} className={styles.image} />
                    </Link>
                </div>
                <div className={styles.info}>
                    <div className={styles.information}>
                        <div className={styles.productDetails}>
                            <Link href={`/poster/${productId}`}>
                                <p>{productData?.title}</p>
                                <p>{productDetails.priceAndSize.size}</p>
                            </Link>
                        </div>
                        <div className={styles.changeQuantityContainer}>
                            <div className={styles.quantityContainer}>
                                <FontAwesomeIcon icon={faMinus} onClick={handleDecrease} className={styles.icon} />
                                <p>{productDetails.quantity}</p>
                                <FontAwesomeIcon icon={faPlus} onClick={handleIncrease} className={styles.icon} />
                            </div>
                        </div>
                        <div>
                            <p>{productDetails.quantity * productDetails.priceAndSize.price} {currency}</p>
                        </div>
                        <div>
                            {/* <button className={styles.button}><FontAwesomeIcon icon={faPen} /></button> */}
                            <button className={styles.button}><FontAwesomeIcon icon={faTrashCan} onClick={handleRemove} /></button>
                        </div>
                    </div>
                </div>
            </div>
            {/* } */}
        </div>
    )
}

export default CartItem