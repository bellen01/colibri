import React from 'react'
import Link from 'next/link'
import styles from '@/components/styles/Nav.module.scss'

const Nav = () => {
    return (
        <nav className={styles.headerNav}>
            <Link href="#">POSTERS</Link>
            <Link href="#">TOPPLISTAN</Link>
            <Link href="#">NYHETER</Link>
        </nav>
    )
}

export default Nav