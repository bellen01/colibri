import React from 'react'
import styles from '@/components/styles/SearchBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
    return (
        <div>
            <div className={styles.wrapper}>
                <input type="text" className={styles.input} />
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
        </div>
    )
}

export default SearchBar