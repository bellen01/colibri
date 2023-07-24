import React from 'react';
import styles from '@/components/styles/CartItem.module.scss';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';


const CartItem = () => {
    return (
        <div>
            <div className={styles.cartItemWrapper}>
                <img src="/3827_2.jpg" alt="temporär bild" className={styles.image} />
                <div className={styles.info}>
                    <div className={styles.information}>
                        <p>Titel</p>
                        <p>Storlek</p>
                        <p>Antal</p>
                        <p>Pris</p>
                        <button className={styles.button}><FontAwesomeIcon icon={faPen} /></button>
                        <button className={styles.button}><FontAwesomeIcon icon={faTrashCan} /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem