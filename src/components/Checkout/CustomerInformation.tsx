import React, { useEffect, useState } from 'react';
import styles from '@/components/styles/CustomerInformation.module.scss';
import { User } from '@/types/User.types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { getUserData } from '@/app/user/fetchFunctionsUser';
import { logIn } from '@/redux/features/authSlice';

type ICustomerInformationProps = {
    heading?: string;
}

const CustomerInformation = ({ heading }: ICustomerInformationProps) => {
    const [userData, setUserData] = useState<User>();
    const userName = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const getUserDetails = async () => {
        try {
            const res = await getUserData();
            if (res.status === 200) {
                let user: User[];
                user = await res.json();
                setUserData(user[0]);
                dispatch(logIn(user[0].firstName));
            }
        } catch (error) {
            console.log('error i settings page', error);
        }
    }

    useEffect(() => {
        console.log('username i state', userName.name);
        if (userData == undefined) {
            getUserDetails();
        }
    }, [userData]);

    return (
        <div className={styles.customerInformationContainer}>
            {heading &&
                <h4 className={styles.heading}>{heading}</h4>
            }
            <div className={styles.informationContainer2}>
                <div className={styles.pairs}>
                    <p className={styles.name}>{userData?.firstName} {userData?.lastName}</p>
                </div>
                <div className={styles.pairs}>
                    <p>{userData?.address.streetName} {userData?.address.streetNumber},</p>
                    <p>{userData?.address.zipcode} {userData?.address.city}</p>
                </div>
                {/* <div className={styles.pairs}>
                                    <p>Epost: </p>
                                    <p>test@test.com</p>
                                </div> */}
                {/* <div className={styles.pairs}>
                                    <p>Mobilnr: </p>
                                    <p>0701234567</p>
                                </div> */}
            </div>
        </div>
    )
}

export default CustomerInformation