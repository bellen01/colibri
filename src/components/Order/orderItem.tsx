'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/components/styles/OrderHistory.module.scss';
import { Order } from '@/types/Order.types';
import { getPosterById } from '@/app/(sharedLayout)/posters/fetchFunctions';
import { Poster } from '@/types/Product.types';

interface IOrderItemProps {
    orderDetails: Order
}

const OrderItem = ({ orderDetails }: IOrderItemProps) => {
    // console.log('date', orderDetails.createdAt);
    const orderDate = new Date(orderDetails.createdAt); //TODO datumet blir fel, varför?
    console.log('orderdate', orderDate);
    const [month, setMonth] = useState<number>();
    const date = `${orderDate.getDate()}/${month}/${orderDate.getFullYear()}`;
    // const [productData, setProductData] = useState<Poster | undefined>()
    // console.log('createdat', orderDetails.createdAt.toDate().toDateString())

    const getMonth = () => {
        if (orderDate.getMonth() < 10) {
            setMonth(orderDate.getMonth() + 1);
        } else {
            setMonth(orderDate.getMonth());
        }
    };

    // const getPoster = async () => {
    //         orderDetails.items.forEach(poster => {
    //             try {
    //                 const res = await getPosterById();
    //                 console.log('res i cartItem', res);
    //                 if (res?.status === 200) {
    //                     let posterData: Poster;
    //                     posterData = await res.json();
    //                     setProductData(posterData);
    //                     console.log('hej', productId);
    //                 } else {
    //                     console.log('error i getPoster');
    //                     console.log('productData i cartitem', productData);
    //                     setMessage('Något gick fel, vänligen försök senare igen');
    //                 }
    //             } catch (error) {
    //                 console.log('error i getPoster', error);
    //                 setMessage('Något gick fel, vänligen försök senare igen');
    //             }

    //         })
    // }

    useEffect(() => {
        getMonth();
    }, [orderDetails]);

    return (
        <div className={styles.orderContainer}>
            <div className={styles.headings}>
                <div>
                    <p>Ordernummer:</p>
                    <p>{orderDetails.id}</p>
                </div>
                <div>
                    <p>Orderdatum:</p>
                    <p>{date}</p>
                </div>
                <div>
                    <p>Antal produkter:</p>
                    <p>{orderDetails.number_of_items}</p>
                </div>
                <div>
                    <p>Summa:</p>
                    <p>{orderDetails.total_sum}</p>
                </div>
                <div>
                    <p>Betalmetod:</p>
                    <p>{orderDetails.paymentMethod}</p>
                </div>
                <p>Artiklar:</p>
            </div>
            {
                orderDetails.items.map((item) => (
                    <div className={styles.productDetailsContainer} key={`${item.item_id}${item.priceAndSize.size}`}>
                        <div className={styles.products}>
                            <p>{item.title}</p>
                            <p>{item.priceAndSize.size}</p>
                            <p>{item.quantity}</p>
                            <p>{item.priceAndSize.price}</p>
                            <img src={item.img} alt="temporär bild" className={styles.image} />
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default OrderItem