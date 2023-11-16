import React, { useEffect } from 'react';
import styles from '@/components/styles/FavoritesItem.module.scss';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getFavorites, updateFavorites } from '@/app/posters/fetchFunctions';
import { Poster } from '@/types/Product.types';
import Link from 'next/link';

interface IFavoritesItemProps {
    favoritePoster: Poster
}

const FavoritesItem = ({ favoritePoster }: IFavoritesItemProps) => {


    console.log('favoriteposter', favoritePoster);

    const removeFavorite = async () => {
        try {
            const res = await updateFavorites(favoritePoster.id);
            if (res.status === 200) {
                console.log('favorite deletad');
            } else {
                console.log('Något gick fel')
            }
        } catch (error) {
            console.log('error i removefavorite i favoritesitem', error);
        }
    }

    return (
        // <div className={styles.wrapper}>
        //     <h2 className={styles.h2}>Favoriter</h2>
        <div className={styles.favoritesItemWrapper}>
            <Link href={`/poster/${favoritePoster.id}`}>
                <img src={favoritePoster.image.img} alt={favoritePoster.image.altText} className={styles.image} />
            </Link>
            <div className={styles.info}>
                <div className={styles.information}>
                    <p>{favoritePoster.title}</p>
                    <button className={styles.button} onClick={removeFavorite}><FontAwesomeIcon icon={faTrashCan} /></button>
                </div>
            </div>
        </div>
        // </div>
    )
}

export default FavoritesItem