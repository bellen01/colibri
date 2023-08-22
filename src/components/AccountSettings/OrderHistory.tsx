import React from 'react';
import styles from '@/components/styles/OrderHistory.module.scss';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

interface IOrderHistoryProps {

}

const OrderHistory = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.info}>
                <div className={styles.information}>
                    <h2 className={styles.h2}>Tidigare beställningar</h2>
                    <div className={styles.headings}>
                        <div>
                            <p>Ordernummer:</p>
                            <p>nummer</p>
                        </div>
                        <div>
                            <p>Orderdatum:</p>
                            <p>datum</p>
                        </div>
                        <div>
                            <p>Summa:</p>
                            <p>summa</p>
                        </div>
                        <p>Artiklar:</p>
                    </div>
                    <div className={styles.products}>
                        <p>Titel</p>
                        <p>Storlek</p>
                        <p>Antal</p>
                        <p>Pris</p>
                        <img src="/3827_2.jpg" alt="temporär bild" className={styles.image} />
                    </div>
                    {/* <button className={styles.button}><FontAwesomeIcon icon={faPen} /></button>
                        <button className={styles.button}><FontAwesomeIcon icon={faTrashCan} /></button> */}
                </div>
            </div>
        </div>
    )
}

export default OrderHistory