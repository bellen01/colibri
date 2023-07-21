import React from 'react';
import styles from '@/components/styles/UserComponent.module.scss';
import Filter from '../Products/Filter';
import UserFilter from './UserFilter';

const UserComponent = () => {

    const user = "Jane Doe";

    return (
        <div className={styles.container}>
            <div className={styles.heroContainer}>
                <h1>Välkommen {user}</h1>
                <p>text</p>
            </div>
            <div className={styles.filterAndInfoContainer}>
                <UserFilter />
                <div className={styles.wrapper}>
                </div>
            </div>
        </div>
    )
}

export default UserComponent