"use client"
import React, { useState } from 'react';
import Product from './Product';
import styles from '@/components/styles/Products.module.scss';
import { montserrat } from '@/app/fonts';
import ProductInfo from './ProductInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Select from './Select';

const options = [
    { label: "21x30", value: 1 },
    { label: "30x40", value: 2 },
]

const Products = () => {
    const [selectActive, setSelectActive] = useState(false);

    const [value, setValue] = useState<typeof options[0] | undefined>(options[0])

    const toggleClass = () => {
        setSelectActive(!selectActive);
    };

    return (
        <div className={styles.container}>
            <div className={styles.heroContainer}>
                <Select options={options} value={value} onChange={option => setValue(option)} />
                <h1>Posters</h1>
                <p>text</p>
                <div>filter</div>
                <div className={styles.wrapper}>
                    {/* <div className={styles.select}>
                        <label htmlFor="button">Storlek</label>
                        <button className={styles.button} id="button" onClick={toggleClass} >Välj en storlek <FontAwesomeIcon icon={faAngleDown} /></button>
                        <div className={!selectActive ? `${styles.hidden}` : `${styles.selectContainer}`}>
                            <label className={styles.selectItem} htmlFor="default">Välj storlek</label>
                        <input className={styles.option} type="radio" name="storlek" id="default" value="default" />
                            <label className={styles.selectItem} htmlFor="select-21x30">21x30cm</label>
                            <input className={styles.option} type="radio" name="storlek" id="select-21x30" value="21x30" />
                            <label className={styles.selectItem} htmlFor="select-30x40">30x40cm</label>
                            <input className={styles.option} type="radio" name="storlek" id="select-30x40" value="30x40" />
                        </div>
                    </div> */}
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                </div>
            </div>
            {/* <ProductInfo /> */}
        </div>
    )
}

export default Products