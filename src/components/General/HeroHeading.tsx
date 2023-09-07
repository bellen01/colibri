"use client";
import React, { useEffect } from 'react';
import styles from '@/components/styles/HeroHeading.module.scss';
import { usePathname } from 'next/navigation'

interface IHeroHeadingProps {
    heading: string | null;
    text?: string | undefined;
}

const HeroHeading = ({ heading, text }: IHeroHeadingProps) => {
    //     const pathname = usePathname();

    // const getPath = () => {
    //     const path = pathname.split('/');

    // }

    // useEffect(() => {
    //     console.log('pathname', pathname);
    // }, []);

    return (
        <div className={styles.heroContainer}>
            <h1>{heading}</h1>
            <p>{text}</p>
            {/* <div>filter</div> */}
        </div>
    )
}

export default HeroHeading