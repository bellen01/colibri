"use client"
import React, { useState } from 'react';
import styles from '@/components/styles/ProductInfo.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import Select from '@/components/Products/Select';
import Select2 from '@/components/Products/Select2';

const options = [
    // { label: "Välj storlek", value: 0 },
    { label: "21x30", value: 1 },
    { label: "30x40", value: 2 },
]

const ProductInfo = () => {
    const [value, setValue] = useState<typeof options[0] | undefined>()

    return (
        <div className={styles.productInfoWrapper}>
            {/* <div className={styles.productInfo}> */}
            <img src="/3827_2.jpg" alt="temporär produktbild" className={styles.image} />
            <div className={styles.infoWrapper}>
                <div className={styles.info}>
                    <div className={styles.heading}>
                        <h2>Title</h2>
                    </div>
                    <p>Infotext</p>
                    <p>Pris</p>
                </div>
                <div>
                    <div className={styles.select}>
                        <Select options={options} value={value} onChange={option => setValue(option)} />
                    </div>
                    {/* <Select2 options={options} value={value} onChange={option => setValue(option)} /> */}
                    <div className={styles.purchaseContainer}>
                        <button className={styles.purchaseButton}>Lägg i varukorg</button>
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