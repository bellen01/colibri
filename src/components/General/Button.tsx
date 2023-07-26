import React from 'react';
import styles from '@/components/styles/Button.module.scss';

interface IButtonProps {
    text: string,
    width?: string,
    height?: string,
    margin?: string,
}

const Button = ({ text, width, height, margin }: IButtonProps) => {
    return (
        <button className={styles.button} style={{ width: `${width}`, height: `${height}`, margin: `${margin}` }}>{text}</button>
    )
}

export default Button