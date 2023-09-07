import React from 'react';
import styles from '@/components/styles/CartItem.module.scss';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { CartProduct } from '@/types/CartProduct.types';
import { decreaseCartItem, increaseCartItem, removeItem } from '@/redux/features/cartSlice';
import Link from 'next/link';

interface ICartItemProps {
    productDetails: CartProduct
}

const CartItem = ({ productDetails }: ICartItemProps) => {
    const dispatch = useDispatch();

    const handleRemove = () => {
        dispatch(removeItem(productDetails));
    }

    const handleDecrease = () => {
        dispatch(decreaseCartItem(productDetails));
    }

    const handleIncrease = () => {
        dispatch(increaseCartItem(productDetails));
    }

    return (
        <div>
            <div className={styles.cartItemWrapper}>
                <div className={styles.imageContainer}>
                    <Link href={`/poster/${productDetails.id}`}>
                        <img src="/3827_2.jpg" alt="temporär bild" className={styles.image} />
                    </Link>
                </div>
                <div className={styles.info}>
                    <div className={styles.information}>
                        <div className={styles.productDetails}>
                            <Link href={`/poster/${productDetails.id}`}>
                                <p>{productDetails.title}</p>
                                <p>{productDetails.priceAndSize.size}</p>
                            </Link>
                        </div>
                        <div className={styles.changeQuantityContainer}>
                            <FontAwesomeIcon icon={faMinus} onClick={handleDecrease} />
                            <p>{productDetails.quantity}</p>
                            <FontAwesomeIcon icon={faPlus} onClick={handleIncrease} />
                        </div>
                        <div>
                            <p>{productDetails.totalPrice}</p>
                        </div>
                        <div>
                            {/* <button className={styles.button}><FontAwesomeIcon icon={faPen} /></button> */}
                            <button className={styles.button}><FontAwesomeIcon icon={faTrashCan} onClick={handleRemove} /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem