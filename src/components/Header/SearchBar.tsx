import React from 'react'
import styles from '@/components/styles/SearchBar.module.scss';

const SearchBar = () => {
    return (
        <div>
            <div className={styles.wrapper}>
                <input type="text" className={styles.input} />
            </div>
        </div>
    )
}

export default SearchBar