"use client";
import React, { useEffect, useState } from 'react';
import styles from '@/components/styles/Select.module.scss';

export type SelectOption = {
    label: string,
    value: any,
};

type SelectProps = {
    value?: SelectOption,
    onChange: (value: SelectOption | undefined) => void,
    options: SelectOption[],
};

const Select = ({ value, onChange, options }: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);

    function selectOption(option: SelectOption) {
        if (option !== value) onChange(option)
    }

    function isOptionSelected(option: SelectOption) {
        return option === value;
    }

    useEffect(() => {
        if (isOpen) setHighlightedIndex(0)
    }, [isOpen])

    return (
        <div tabIndex={0} className={styles.container} onClick={() => setIsOpen(prev => !prev)} onBlur={() => setIsOpen(false)}>
            <span className={styles.value}>{value ? value?.label : "Välj storlek"}</span>
            {/* <button className={styles["clear-btn"]}>&times;</button> */}
            {/* <div className={styles.divider}></div> */}
            <div className={styles.caret}></div>
            <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
                {options.map((option, index) => (
                    <li
                        onMouseEnter={() => setHighlightedIndex(index)}
                        key={option.label}
                        className={`${styles.option} ${isOptionSelected(option) ? styles.selected : ""
                            } ${index === highlightedIndex ? styles.highlighted : ""}`}
                        onClick={e => {
                            e.stopPropagation()
                            selectOption(option)
                            setIsOpen(false)
                        }}>{option.label}</li>
                ))}
            </ul>
        </div>
    )
}

export default Select