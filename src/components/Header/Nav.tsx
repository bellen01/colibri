"use client";
import React from 'react'
import Link from 'next/link'
import styles from '@/components/styles/Nav.module.scss'
import { useSelectedLayoutSegment, useSelectedLayoutSegments } from 'next/navigation';

const Nav = () => {
    // const activeSegment = useSelectedLayoutSegment();
    const activeSegments = useSelectedLayoutSegments();
    console.log('activesegments i nav', activeSegments);
    // console.log('activesegment i nav', activeSegment)
    const activeLink = activeSegments[0] == "posters" && activeSegments.length == 1;

    return (
        <nav className={styles.headerNav}>
            <Link href="/posters" className={`${activeSegments[0] == "posters" && activeSegments.length == 1 ? styles.active : ""}`}>POSTERS</Link>
            <Link href="/posters/topplistan" className={`${activeSegments[1] == "topplistan" ? styles.active : ""}`}>TOPPLISTAN</Link>
            <Link href="/posters/nyheter" className={`${activeSegments[1] == "nyheter" ? styles.active : ""}`}>NYHETER</Link>
        </nav>
    )
}

export default Nav