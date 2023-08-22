import React from 'react';
import styles from '@/components/styles/FavoritesItem.module.scss';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FavoritesItem = () => {
    return (
        <div>
            <h2 className={styles.h2}>Favoriter</h2>
            <div className={styles.cartItemWrapper}>
                <img src="/3827_2.jpg" alt="temporär bild" className={styles.image} />
                <div className={styles.info}>
                    <div className={styles.information}>
                        <p>Titel</p>
                        <button className={styles.button}><FontAwesomeIcon icon={faTrashCan} /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FavoritesItem