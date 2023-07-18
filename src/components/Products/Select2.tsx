import React, { useEffect, useState } from 'react'
import styles from '@/components/styles/Select2.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

type SelectOption = {
    label: string,
    value: any,
}

type SelectProps = {
    value?: SelectOption,
    onChange: (value: SelectOption | undefined) => void,
    options: SelectOption[],
}

const Select2 = ({ value, onChange, options }: SelectProps) => {
    const [selectActive, setSelectActive] = useState(false);

    const toggleClass = () => {
        setSelectActive(!selectActive);
    };

    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0)

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
        <div className={styles.wrapper} >
            <div className={styles.select} onClick={() => setIsOpen(prev => !prev)} /*onBlur={() => setIsOpen(false)}*/>
                {/* <label htmlFor="button">Storlek</label> */}
                <button className={styles.button} id="button" onClick={toggleClass} >{value ? value.label : "Välj storlek"} <FontAwesomeIcon icon={faAngleDown} /></button>
                <div className={`${styles.selectContainer} ${isOpen ? styles.show : ""}`}>
                    {options.map((option, index) => (
                        <div>
                            <label onMouseEnter={() => setHighlightedIndex(index)} key={option.label} className={`${styles.selectItem} ${isOptionSelected(option) ? styles.selected : ""} ${index === highlightedIndex ? styles.highlighted : ""}`}
                                htmlFor={option.value}
                                onClick={e => {
                                    selectOption(option)
                                    setIsOpen(false)
                                    // e.stopPropagation()
                                }}>{option.label}</label>
                            <input className={styles.option} type="radio" name="storlek" id={option.value} value={option.label} />
                        </div>
                    ))}
                    {/* <label className={styles.selectItem} htmlFor="default">Välj storlek</label>
                    <input className={styles.option} type="radio" name="storlek" id="default" value="default" />
                    <label className={styles.selectItem} htmlFor="select-21x30">21x30cm</label>
                    <input className={styles.option} type="radio" name="storlek" id="select-21x30" value="21x30" />
                    <label className={styles.selectItem} htmlFor="select-30x40">30x40cm</label>
                    <input className={styles.option} type="radio" name="storlek" id="select-30x40" value="30x40" /> */}
                </div>
            </div>
        </div>
    )
}

export default Select2