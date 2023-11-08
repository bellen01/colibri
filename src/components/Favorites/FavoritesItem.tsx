import React, { useEffect } from 'react';
import styles from '@/components/styles/FavoritesItem.module.scss';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getFavorites } from '@/app/posters/fetchFunctions';
import { Poster } from '@/types/Product.types';

interface IFavoritesItemProps {
    favoritePoster: Poster
}

const FavoritesItem = ({ favoritePoster }: IFavoritesItemProps) => {


    console.log('favoriteposter', favoritePoster);

    return (
        // <div className={styles.wrapper}>
        //     <h2 className={styles.h2}>Favoriter</h2>
        <div className={styles.favoritesItemWrapper}>
            <img src={favoritePoster.image.img} alt={favoritePoster.image.altText} className={styles.image} />
            <div className={styles.info}>
                <div className={styles.information}>
                    <p>{favoritePoster.title}</p>
                    <button className={styles.button}><FontAwesomeIcon icon={faTrashCan} /></button>
                </div>
            </div>
        </div>
        // </div>
    )
}

export default FavoritesItem