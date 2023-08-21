import React from 'react';
import styles from '@/components/styles/HeroHeading.module.scss';

interface IHeroHeadingProps {
    heading: string;
}

const HeroHeading = ({ heading }: IHeroHeadingProps) => {
    return (
        <div className={styles.heroContainer}>
            <h1>{heading}</h1>
            <p>text</p>
            {/* <div>filter</div> */}
        </div>
    )
}

export default HeroHeading