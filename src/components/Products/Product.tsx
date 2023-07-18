import React from 'react';
import styles from '@/components/styles/Product.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

const Product = () => {
    return (
        <div className={styles.productWrapper}>
            <img src="/3827_2.jpg" alt="temporär bild" className={styles.image} />
            <div className={styles.posterInfoContainer}>
                <div className={styles.posterInfo}>
                    <p>Title</p>
                    <p>Price</p>
                </div>
                <FontAwesomeIcon icon={faHeart} className={styles.icon} />
            </div>
        </div>
    )
}

export default Product