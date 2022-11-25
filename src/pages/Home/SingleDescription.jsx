import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const SingleDescription = ({name, detail, checkedItems, checkedItemHandeler}) => {
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
            </div>
            <div>
                {detail}
            </div>
        </div>
    );
};

export default SingleDescription;