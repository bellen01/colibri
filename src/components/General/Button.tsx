import React from 'react';
import styles from '@/components/styles/Button.module.scss';

interface IButtonProps {
    text: string,
    width?: string,
    height?: string,
    margin?: string,
    disabled?: boolean,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
}

const Button = ({ text, width, height, margin, onClick, disabled }: IButtonProps) => {
    return (
        <button className={styles.button} onClick={onClick} style={{ width: `${width}`, height: `${height}`, margin: `${margin}` }} disabled={disabled} formNoValidate>{text}</button>
    )
}

export default Button