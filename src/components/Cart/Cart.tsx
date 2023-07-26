import React from 'react';
import styles from '@/components/styles/Cart.module.scss';
import CartItem from './CartItem';
import Button from '../General/Button';

const Cart = () => {
    return (
        <div>
            <CartItem />
            <div className={styles.buttonContainer}>
                <Button text={"Till kassan"} width={"25%"} />
                {/* <button className={styles.checkoutButton}>Till kassan</button> */}
            </div>
        </div>
    )
}

export default Cart