import React from 'react'
import Link from 'next/link'
import styles from '@/components/styles/Nav.module.scss'

const Nav = () => {
    return (
        <nav className={styles.headerNav}>
            <Link href="#">Posters</Link>
            <Link href="#">Topplistan</Link>
            <Link href="#">Nyheter</Link>
        </nav>
    )
}

export default Nav