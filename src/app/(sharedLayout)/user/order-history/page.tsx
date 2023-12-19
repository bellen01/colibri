"use client";
import React, { useEffect, useState } from 'react';
import styles from '@/components/styles/OrderHistory.module.scss';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Order } from '@/types/Order.types';
import { getOrderHistory } from '../fetchFunctionsUser';
import OrderItem from '@/components/Order/orderItem';

interface IOrderHistoryProps {

}

const OrderHistory = () => {
    const [orderDetails, setOrderDetails] = useState<Order[]>()
    const [message, setMessage] = useState<string>()
    // const today = new Date();
    // const year = today.getFullYear();
    // const month = today.getMonth() + 1;
    // const date = today.getDate();
    // const currentDate: string = date + "/" + month + "/" + year;

    // console.log('dagens datum');

    const getOrders = async () => {
        try {
            const res = await getOrderHistory();
            if (res.status === 200) {
                let orderData: Order[];
                orderData = await res.json();
                setOrderDetails(orderData);
            } else {
                setMessage('Du har inte gjort några ordrar ännu');
            }
        } catch (error) {
            console.log('error i getOrders i orderHistory page', error);
        }
        console.log('orderDetails', orderDetails)
    }

    useEffect(() => {
        if (orderDetails == undefined) {
            getOrders();
            // getOrderHistory().then(data => setOrderDetails(data));
            console.log('orderdetails i orderhistory', orderDetails);
        }
    }, [orderDetails]);



    return (
        <div>
            {/* {
                !orderDetails
                    ?
                    <p>Laddar...</p>
                    : */}
            <div className={styles.wrapper}>
                <div className={styles.info}>
                    <div className={styles.information}>
                        <h2 className={styles.h2}>Tidigare beställningar</h2>
                        {
                            orderDetails?.length === 0
                                ?
                                <p>{message}</p>
                                :
                                orderDetails?.map((order) => (
                                    <OrderItem orderDetails={order} key={order.id} />
                                ))
                        }
                        {/* <div className={styles.headings}>
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
                        </div> */}
                        {/* <button className={styles.button}><FontAwesomeIcon icon={faPen} /></button>
                        <button className={styles.button}><FontAwesomeIcon icon={faTrashCan} /></button> */}
                    </div>
                </div>
            </div>
            {/* } */}
        </div>
    )
}

export default OrderHistory