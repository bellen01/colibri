import React from 'react';
import styles from '@/components/styles/UserComponent.module.scss';
import UserFilter from './UserFilter';
import Cart from '../Cart/Cart';
import HeroHeading from '../General/HeroHeading';
import Favorites from '../Favorites/Favorites';
import AccountSettings from '../AccountSettings/AccountSettings';

const UserComponent = () => {

    const user = "Jane Doe";

    return (
        <div className={styles.container}>
            <HeroHeading heading={`Välkommen ${user}`} />
            <div className={styles.filterAndInfoContainer}>
                <UserFilter />
                <Cart />
            </div>
            <Favorites />
            <AccountSettings />
        </div>
    )
}

export default UserComponent