import { Order } from "@/types/Order.types"
import { UserData } from "./settings/edit-information/page";

export const getOrderHistory = async (): Promise<Order[] | undefined> => {
    try {
        const res = await fetch('/api/getorderhistory', {
            next: {
                revalidate: 120
            }
        });
        const data = await res.json();
        console.log('data in getorderhistory', data);
        return data;
    } catch (error) {
        console.log('error in getorderhistory', error);
    }
}

export const updateUserInformation = async (id: string, newData: UserData) => {
    // try {
    const res = await fetch('/api/updateuser', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            newData: newData
        })
    })
    // const data = await res.json();
    // console.log('response data i updateuserinformation', data);
    // return data;
    console.log('res i updateuserinformation', res);
    if (res.status !== 200) {
        throw new Error('Something went wrong');
    } else {
        return res;
    }
    // } catch (error) {
    //     console.log('error i updateUserInformation', error);
    // }
}