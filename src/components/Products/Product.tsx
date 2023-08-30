import React from 'react';
import styles from '@/components/styles/Product.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { Poster } from '@/types/Product.types';

interface IProductProps {
    product: Poster | undefined;
}

const Product = ({ product }: IProductProps) => {
    return (
        <div className={styles.productWrapper}>
            {/* <img src="/3827_2.jpg" alt="temporär bild" className={styles.image} /> */}
            <img src={product?.image.img} alt={product?.image.altText} className={styles.image} />
            <div className={styles.posterInfoContainer}>
                <div className={styles.posterInfo}>
                    <p>{product?.title}</p>
                    <p>Från 99kr</p>
                </div>
                <FontAwesomeIcon icon={faHeart} className={styles.icon} />
            </div>
        </div>
    )
}

export default Product