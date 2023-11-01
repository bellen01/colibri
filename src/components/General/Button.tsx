import React from 'react';
import styles from '@/components/styles/Button.module.scss';

interface IButtonProps {
    text: string,
    width?: string,
    height?: string,
    margin?: string,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
}

const Button = ({ text, width, height, margin, onClick }: IButtonProps) => {
    return (
        <button className={styles.button} onClick={onClick} style={{ width: `${width}`, height: `${height}`, margin: `${margin}` }} formNoValidate>{text}</button>
    )
}

export default Button