"use client"
import React, { useEffect, useState } from 'react';
import styles from '@/components/styles/ProductInfo.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import Select from '@/components/Products/Select';
import Button from '@/components/General/Button';
import { Poster } from '@/types/Product.types';
import { addFavorite, getFavoritePostersIds, getPosterById, updateFavorites } from '../../posters/fetchFunctions';
import { SelectOption } from '@/components/Products/Select';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/features/cartSlice';
import { useRouter } from 'next/navigation';

// const options = [
//     // { label: "Välj storlek", value: 0 },
//     { label: "21x30", value: 1 },
//     { label: "30x40", value: 2 },
// ]


type Params = {
    params: {
        id: string
    }
}

type SizeAndPrice = {
    size: string,
    price: number
}

const ProductInfo = ({ params }: Params) => {
    const [poster, setPoster] = useState<Poster>();
    const [sizeOptions, setSizeOptions] = useState<SelectOption[]>([]);

    const [value, setValue] = useState<SelectOption>();
    const currency = "kr";
    const [price, setPrice] = useState<string>(`Från 99 ${currency}`);
    const dispatch = useDispatch();
    const [sizeAndPrice, setSizeAndPrice] = useState<SizeAndPrice>()
    const router = useRouter();

    const [iconStyle, setIconStyle] = useState(styles.icon);
    const [favoriteIds, setFavoriteIds] = useState<string[]>();


    // const poster = await getPoster(params.id);
    // const getPosterById = async () => {
    //     try {
    //         const posterData = await getPoster(params.id);
    //         setPoster(posterData);
    //         const sizeOptions = posterData.priceAndSize.map(size => {
    //             return {
    //                 label: `${size.size} - ${size.price} ${currency}`,
    //                 value: size.size
    //             }
    //         });
    //         console.log("size", sizeOptions);
    //         setSizeOptions(sizeOptions);
    //         // setValue(sizeOptions[0]);
    //     } catch (error) {
    //         console.log('error i getPosterById', error);
    //     }
    // };

    //getPoster innan jag skrev om den:
    // const getPoster = async (id: string) => {
    //     try {
    //         const posterData = await getPosterById(id);
    //         setPoster(posterData);
    //         if (posterData) {
    //             const sizeOptions = posterData.priceAndSize.map(size => {
    //                 return {
    //                     label: `${size.size} - ${size.price} ${currency}`,
    //                     value: size.size
    //                 }
    //             });
    //             console.log("size", sizeOptions);
    //             setSizeOptions(sizeOptions);
    //         }
    //         // setValue(sizeOptions[0]);
    //     } catch (error) {
    //         console.log('error i getPoster', error);
    //     }
    // };

    const getPoster = async (id: string) => {
        try {
            const res = await getPosterById(id);
            if (res.status === 200) {
                let posterData: Poster;
                posterData = await res.json();
                setPoster(posterData);
                if (posterData) {
                    const sizeOptions = posterData.priceAndSize.map(size => {
                        return {
                            label: `${size.size} - ${size.price} ${currency}`,
                            value: size.size
                        }
                    });
                    console.log("size", sizeOptions);
                    setSizeOptions(sizeOptions);
                }
                // setValue(sizeOptions[0]);
            }
        } catch (error) {
            console.log('error i getPoster', error);
        }
    };

    // const getSizeOptions = () => {
    //     poster?.priceAndSize.map((sizeAndPrice) =)
    // }

    useEffect(() => {
        getPoster(params.id);
        // getPosterById(params.id);
        getPrice();
        console.log('value', value);
        console.log('sizeAndPrice', sizeAndPrice)
    }, [value, sizeAndPrice]);

    const getPrice = () => {
        if (value) {
            console.log(value)
            const res = poster?.priceAndSize.find(({ size }) => size === value?.value);
            console.log("result", res);
            // const price = `${res?.price} kr`
            setPrice(`${res?.price} ${currency}`);
            setSizeAndPrice(res)
        }
    }

    const addToCartHandler = () => {
        console.log('tryckt på lägg i varukorg')
        // router.push('/cart');
        dispatch(addToCart({
            id: poster?.id,
            title: poster?.title,
            quantity: 1,
            priceAndSize: sizeAndPrice,
            totalPrice: sizeAndPrice?.price
        }))
    }

    // const addToFavorites = async () => {
    //     console.log('tryckt på hjärtat');
    //     if (poster) {
    //         try {
    //             const res = await addFavorite(poster?.id);
    //             if (res.status === 200) {
    //                 console.log('favorit tillagd');
    //                 if (iconStyle === styles.icon) setIconStyle(styles.iconClicked);
    //                 else setIconStyle(styles.icon);
    //             } else {
    //                 console.log('Något gick fel i addFavorite i addToFavorites i poster id page');
    //             }
    //         } catch (error) {
    //             console.log('error i addToFavorites i addFavorite i addToFavorites i poster id page', error);
    //         }
    //     } else {
    //         console.log('Något gick fel i addToFavorites i poster id page');
    //     }
    // }

    const updateFavoritePosters = async () => {
        console.log('tryckt på hjärtat');
        if (params.id && iconStyle === styles.icon) {
            try {
                const res = await addFavorite(params.id);
                if (res.status === 200) {
                    console.log('favorit tillagd');
                    setIconStyle(styles.iconClicked);
                } else {
                    console.log('Något gick fel i addFavorite i updateFavoritesposters i product id page');
                }
            } catch (error) {
                console.log('error i addToFavorites i addFavorite i updateFavoritesposters i product id page', error);
            }
        } else if (params.id && iconStyle === styles.iconClicked) {
            try {
                const res = await updateFavorites(params.id);
                if (res.status === 200) {
                    console.log('favorit borttagen');
                    setIconStyle(styles.icon);
                } else {
                    console.log('status var inte 200 i updatefavorites i updatefavoriteposters i product id page');
                }
            } catch (error) {
                console.log('error i updatefavorites i updatefavoriteposters i product id page', error);
            }
        } else {
            console.log('Något gick fel i updateFavoriteposters i product id page');
        }
    }


    const checkIfPosterIsFavorite = async () => {
        try {
            const res = await getFavoritePostersIds();
            if (res.status === 200) {
                let ids: string[] = await res.json();
                console.log('ids i product id page', ids);
                if (ids.length !== 0) {
                    // console.log('ids i product id page', ids);
                    let isThisAFavoritePoster = ids.find(poster => poster === params?.id);
                    if (isThisAFavoritePoster) {
                        setIconStyle(styles.iconClicked);
                    }
                } else {
                    console.log('Det finns inga favoriter');
                }
            } else {
                console.log('något gick fel');
            }
        } catch (error) {
            console.log('error i trycatch i getFavoriteIds', error);
        }
    }

    useEffect(() => {
        getPoster(params.id);
        getPrice();
    }, [value, sizeAndPrice]);

    useEffect(() => {
        checkIfPosterIsFavorite();
    }, []);


    // const [value, setValue] = useState<typeof options[0] | undefined>(options[0])

    return (
        <div className={styles.productInfoWrapper}>
            {/* <div className={styles.productInfo}> */}
            {/* <img src="/3827_2.jpg" alt="temporär produktbild" className={styles.image} /> */}
            <img src={poster?.image.img} alt={poster?.image.altText} className={styles.image} />
            <div className={styles.infoWrapper}>
                <div className={styles.info}>
                    <div className={styles.heading}>
                        <h2>{poster?.title}</h2>
                        {/* <h2>Title</h2> */}
                    </div>
                    <p>{poster?.description}</p>
                    {/* <p>Info</p> */}
                    <p>{price}</p>
                </div>
                <div>
                    <div className={styles.select}>
                        {/* <Select3 options={poster?.priceAndSize} value={value2}  /> */}

                        <Select options={sizeOptions} value={value} onChange={option => setValue(option)} />
                    </div>
                    {/* <Select2 options={options} value={value} onChange={option => setValue(option)} /> */}
                    <div className={styles.purchaseContainer}>
                        <Button onClick={addToCartHandler} text="Lägg i varukorg" width="100%" height={"4rem"} margin={"0"} />
                        {/* <button className={styles.purchaseButton}>Lägg i varukorg</button> */}
                        <button className={iconStyle} onClick={updateFavoritePosters}>
                            <FontAwesomeIcon icon={faHeart} />
                        </button>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </div>
    )
}

export default ProductInfo