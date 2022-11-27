import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import style from '../../style/Description.module.css'

const SingleDescription = ({name, detail, essential, checkedItems, checkedItemHandeler}) => {
    const [isChecked, setIsChecked] = useState(null)

    const onCheck = (data) => {
        checkedItemHandeler(name, data.target.checked)
        setIsChecked(!isChecked)
    }

    useEffect(() => {
        if(checkedItems.includes(name))
            setIsChecked(true)
        else
            setIsChecked(false)
    }, [checkedItems])

    return (
        <div>
            <div>
                <input type="checkbox" checked={isChecked} onChange={data => onCheck(data)}/>{name}
                <span className={essential ? style.essential : style.optional}>{essential ? '(필수)' : '(선택)'}</span>
            </div>
            <div className={style.box}>
                {detail}
            </div>
        </div>
    );
};

export default SingleDescription;