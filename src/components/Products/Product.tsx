import React from 'react';
import styles from '@/components/styles/Product.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { Poster } from '@/types/Product.types';
import { addFavorite } from '@/app/posters/fetchFunctions';

interface IProductProps {
    product: Poster | undefined;
}

const Product = ({ product }: IProductProps) => {

    const addToFavorites = async () => {
        console.log('tryckt på hjärtat');
        if (product) {
            try {
                const res = await addFavorite(product?.id);
                if (res.status === 200) {
                    console.log('favorit tillagd');
                } else {
                    console.log('Något gick fel i addFavorite i addToFavorites i product page');
                }
            } catch (error) {
                console.log('error i addToFavorites i addFavorite i addToFavorites i product page', error);
            }
        } else {
            console.log('Något gick fel i addToFavorites i product page');
        }
    }

    return (
        <div className={styles.productWrapper}>
            {/* <img src="/3827_2.jpg" alt="temporär bild" className={styles.image} /> */}
            <img src={product?.image.img} alt={product?.image.altText} className={styles.image} />
            <div className={styles.posterInfoContainer}>
                <div className={styles.posterInfo}>
                    <p>{product?.title}</p>
                    <p>Från 99kr</p>
                </div>
                <FontAwesomeIcon icon={faHeart} className={styles.icon} onClick={addToFavorites} />
            </div>
        </div>
    )
}

export default Product