'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/components/styles/Product.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { Poster } from '@/types/Product.types';
import { addFavorite, getFavoritePostersIds, updateFavorites } from '@/app/posters/fetchFunctions';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface IProductProps {
    product: Poster | undefined;
    favoriteIds: string[] | undefined;
}

const Product = ({ product, favoriteIds }: IProductProps) => {
    const [iconStyle, setIconStyle] = useState(styles.icon);
    const isUserLoggedIn = useSelector((state: RootState) => state.auth);
    // const [favoriteIds, setFavoriteIds] = useState<string[]>();

    const updateFavoritePosters = async () => {
        console.log('tryckt på hjärtat');
        if (isUserLoggedIn.isLoggedIn) {
            if (product && iconStyle === styles.icon) {
                try {
                    const res = await addFavorite(product.id);
                    if (res.status === 200) {
                        console.log('favorit tillagd');
                        setIconStyle(styles.iconClicked);
                        // if (iconStyle === styles.icon) setIconStyle(styles.iconClicked);
                        // else setIconStyle(styles.icon);
                    } else {
                        console.log('Något gick fel i addFavorite i addToFavoritesposters i product page');
                    }
                } catch (error) {
                    console.log('error i addToFavorites i addFavorite i addToFavoritesposters i product page', error);
                }
            } else if (product && iconStyle === styles.iconClicked) {
                try {
                    const res = await updateFavorites(product.id);
                    if (res.status === 200) {
                        console.log('favorit borttagen');
                        setIconStyle(styles.icon);
                    } else {
                        console.log('status var inte 200 i updatefavorites i updatefavoriteposters i product');
                    }
                } catch (error) {
                    console.log('error i updatefavorites i updatefavoriteposters i product page', error);
                }
            } else {
                console.log('Något gick fel i addToFavorites i product page');
            }
        }
    }

    const checkIfPosterIsFavorite = async () => {
        if (favoriteIds) {
            let isThisAFavoritePoster = favoriteIds.find(poster => poster === product?.id);
            if (isThisAFavoritePoster) {
                setIconStyle(styles.iconClicked);
            }
            // else {
            //     setIconStyle(styles.icon);
            // }
        } else {
            console.log('Det finns inga favoriter');
        }
    }

    useEffect(() => {
        if (favoriteIds) {
            checkIfPosterIsFavorite();
        }
    }, [favoriteIds]);


    return (
        <div className={styles.productWrapper}>
            <Link href={`/poster/${product?.id}`}>
                <img src={product?.image.img} alt={product?.image.altText} className={styles.image} />
            </Link>
            <div className={styles.posterInfoContainer}>
                <div className={styles.posterInfo}>
                    <p>{product?.title}</p>
                    <p>Från 99kr</p>
                </div>
                <FontAwesomeIcon icon={faHeart} className={iconStyle} onClick={updateFavoritePosters} />
            </div>
        </div>
    )
}

export default Product