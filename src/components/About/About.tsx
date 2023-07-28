import React from 'react';
import styles from '@/components/styles/About.module.scss';
import Link from 'next/link';

const About = () => {
    return (
        <div className={styles.aboutContainer}>
            <h3>Om Colibri</h3>
            <Link href="/">Våra posters</Link>

        </div>
    )
}

export default About