"use client"
import React, { useEffect, useState } from 'react';
import styles from '@/components/styles/ProductInfo.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import Select from '@/components/Products/Select';
import Select2 from '@/components/Products/Select2';
import Button from '@/components/General/Button';
import { Poster } from '@/types/Product.types';
import { getPoster } from '../../posters/fetchFunctions';
import Select3 from '@/components/Products/Select3';
import { SelectOption } from '@/components/Products/Select';

// const options = [
//     // { label: "Välj storlek", value: 0 },
//     { label: "21x30", value: 1 },
//     { label: "30x40", value: 2 },
// ]


type Params = {
    params: {
        id: number
    }
}

const ProductInfo = ({ params }: Params) => {
    const [poster, setPoster] = useState<Poster>();
    const [sizeOptions, setSizeOptions] = useState<SelectOption[]>([]);

    const [value, setValue] = useState<SelectOption>();
    const currency = "kr";
    const [price, setPrice] = useState<string>(`Från 99 ${currency}`);


    // const poster = await getPoster(params.id);
    const getPosterById = async () => {
        try {
            const posterData = await getPoster(params.id);
            setPoster(posterData);
            const sizeOptions = posterData.priceAndSize.map(size => {
                return {
                    label: `${size.size} - ${size.price} ${currency}`,
                    value: size.size
                }
            });
            console.log("size", sizeOptions);
            setSizeOptions(sizeOptions);
            // setValue(sizeOptions[0]);
        } catch (error) {
            console.log('error i getPosterById', error);
        }
    };

    // const getSizeOptions = () => {
    //     poster?.priceAndSize.map((sizeAndPrice) =)
    // }

    useEffect(() => {
        getPosterById();
        getPrice();
    }, [value]);

    const getPrice = () => {
        if (value) {
            console.log(value)
            const res = poster?.priceAndSize.find(({ size }) => size === value?.value);
            console.log("result", res);
            // const price = `${res?.price} kr`
            setPrice(`${res?.price} ${currency}`);
        }
    }


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
                        <Button text="Lägg i varukorg" width="100%" height={"4rem"} margin={"0"} />
                        {/* <button className={styles.purchaseButton}>Lägg i varukorg</button> */}
                        <div className={styles.icon}>
                            <FontAwesomeIcon icon={faHeart} />
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </div>
    )
}

export default ProductInfo