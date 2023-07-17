import React from 'react'
import styles from '@/components/styles/ProductInfo.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

const ProductInfo = () => {
    return (
        <div className={styles.productInfoWrapper}>
            <div className={styles.productInfo}>
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
                        <div className={styles.selectContainer}>
                            <select name="" id="" className={styles.selectBox}>
                                <option value="first">first</option>
                                <option value="second">second</option>
                                <option value="third">third</option>
                            </select>
                        </div>
                        <select name="" id="" className={styles.select}>
                            <option value="">Välj Storlek</option>
                            <option value="21x30">21x30cm</option>
                            <option value="30x40">30x40cm</option>
                        </select>
                        <div className={styles.purchaseContainer}>
                            <button className={styles.purchaseButton}>Köp</button>
                            <div className={styles.icon}>
                                <FontAwesomeIcon icon={faHeart} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductInfo