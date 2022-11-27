import React from 'react';
import { useState } from 'react';
import SingleDescription from './SingleDescription';
import { useNavigate } from 'react-router-dom';

const Description = () => {
    const navigate = useNavigate()
    const [checkedItems, setCheckedItems] = useState([]);

    const data = [
        { name: "벼룩창고 이용약관 동의", detail: "벼룩창고를 이용해주셔서 감사합니다. 본 약관은 벼룩창고의 다양한 서비스 이용과 관련한 것입니다." },
        { name: "개인정보 수집 및 이용 동의", detail: "개인정보보호법에 따라 벼룩창고에 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적을 알려드립니다." },
        { name: "프로모션 정보 수신 동의", detail: "벼룩창고에서 제공하는 이벤트/혜택 등 다양한 정보를 이메일로 받아보실 수 있습니다." }
    ]

    const defaultData = "벼룩창고 이용약관, 개인정보 수집 및 이용, 프로모션 정보 수신(선택)에 모두 동의합니다."

    const checkedItemHandeler = (name, isChecked) => {
        if (isChecked) {
            setCheckedItems([...checkedItems, name])
        }
        else if (!isChecked && checkedItems.find(data => data === name)) {
            console.log("in")
            const remain = checkedItems.filter(data => data !== name)
            setCheckedItems([...remain])
        }
    }

    const onCheckAll = (item) => {
        if (item) {
            const itemArray = []
            data.forEach(data =>
                itemArray.push(data.name))
            setCheckedItems(itemArray)
        } else {
            setCheckedItems([])
        }
    }

    const cancelHandler = () => {
        console.log("in")
        navigate("")//main page로 이동을 해야하지만 아직 미정이어서 공란 처리
    }

    const okHandler = () => {
        if (checkedItems.length === 3) {
            navigate("/register")
        }
        else {
            return
        }
    }


    return (
        <div>
            <div>
                <h1>벼룩창고</h1>
            </div>
            <div>
                <input type="checkbox" checked={checkedItems.length === 3 ? true : false} onClick={(event) => onCheckAll(event.target.checked)} />{defaultData}
            </div>
            <div>
                {data.map(data =>
                    <SingleDescription name={data.name} detail={data.detail} checkedItems={checkedItems}
                        checkedItemHandeler={checkedItemHandeler} />
                )}
            </div>
            <div>
                <input type="button" value="취소" onClick={cancelHandler} />
                <input type="button" value="확인" onClick={okHandler} />
            </div>
        </div>
    );
};

export default Description;