import React from 'react'
import styles from '@/components/styles/OrderHistory.module.scss';
import { Order } from '@/types/Order.types';

interface IOrderItemProps {
    orderDetails: Order
}

const OrderItem = ({ orderDetails }: IOrderItemProps) => {
    // console.log('date', orderDetails.createdAt);
    const orderDate = new Date(orderDetails.createdAt); //TODO datumet blir fel, varför?
    console.log('orderdate', orderDate);
    // console.log('createdat', orderDetails.createdAt.toDate().toDateString())
    return (
        <div>
            <div className={styles.headings}>
                <div>
                    <p>Ordernummer:</p>
                    <p>nummer</p>
                </div>
                <div>
                    <p>Orderdatum:</p>
                    {/* <p>{orderDetails.createdAt}</p> */}
                </div>
                <div>
                    <p>Summa:</p>
                    <p>{orderDetails.total_sum}</p>
                </div>
                <p>Artiklar:</p>
            </div>
            {
                orderDetails.items.map((item) => (
                    <div className={styles.products} key={`${item.item_id}${item.priceAndSize.size}`}>
                        <p>{item.title}</p>
                        <p>{item.priceAndSize.size}</p>
                        <p>{item.quantity}</p>
                        <p>{item.priceAndSize.price}</p>
                        <img src={item.img} alt="temporär bild" className={styles.image} />
                    </div>
                ))
            }
        </div>
    )
}

export default OrderItem