import React from 'react';
import styles from '@/components/styles/Cart.module.scss';
import CartItem from './CartItem';

const Cart = () => {
    return (
        <div>
            <CartItem />
            <div className={styles.buttonContainer}>
                <button className={styles.checkoutButton}>Till kassan</button>
            </div>
        </div>
    )
}

export default Cart