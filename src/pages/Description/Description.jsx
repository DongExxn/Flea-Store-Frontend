import React from 'react';
import { useState } from 'react';
import SingleDescription from './SingleDescription';
import { useNavigate } from 'react-router-dom';
import style from '../../style/Description.module.css'

const Description = () => {
    const navigate = useNavigate()
    const [checkedItems, setCheckedItems] = useState([]);

    const data = [
        {name: "벼룩창고 이용약관 동의", detail: "벼룩창고를 이용해주셔서 감사합니다. 본 약관은 벼룩창고의 다양한 서비스 이용과 관련하여 벼룩창고 서비스를 제공하는 벼룩창고와 이를 이용하는 벼룩창고 서비스 회원 또는 비회원과의 관계를 설명합니다.", essential:true},
        {name: "개인정보 수집 및 이용 동의", detail: "개인정보보호법에 따라 벼룩창고에 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드립니다.", essential: true},
        {name: "프로모션 정보 수신 동의", detail: "벼룩창고에서 제공하는 이벤트/혜택 등 다양한 정보를 이메일로 받아보실 수 있습니다. 일부 서비스의 경우, 개별 서비스에 대해 별도 수신 동의를 받을 수 있으며, 이때에도 수신 동의에 대해 별도로 안내하고 동의를 받습니다.", essential: false}
    ]

    const defaultData = "벼룩창고의 모든 약관을 확인하고 전체 동의합니다."

    const checkedItemHandeler = (name, isChecked) => {
        if(isChecked){
            setCheckedItems([...checkedItems, name])
        }
        else if(!isChecked && checkedItems.find(data => data === name)){
            console.log("in")
            const remain = checkedItems.filter(data => data !== name)
            setCheckedItems([...remain])
        }
    }

    const onCheckAll = (item) => {
        if(item){
            const itemArray = []
            data.forEach(data => 
                itemArray.push(data.name))
                setCheckedItems(itemArray)
        }else{
            setCheckedItems([])
        }
    }

    const cancelHandler = () => {
        console.log("in")
        navigate("")//main page로 이동을 해야하지만 아직 미정이어서 공란 처리
    }

    const okHandler = () => {
        if(checkedItems.includes("벼룩창고 이용약관 동의")){
            if(checkedItems.includes("개인정보 수집 및 이용 동의")){
                navigate("/register")
            }
            return;
        }
        return;
    }


    return (
        <div className={style.outter}>
            <div className={style.header}>
                <h1>약관 동의</h1>
            </div>
            <div className={style.all}>
                <input type="checkbox" checked={checkedItems.length === 3 ? true : false} onClick={(event) => onCheckAll(event.target.checked)}/>{defaultData}
            </div>
            <div>
                {data.map(data => 
                    <SingleDescription name={data.name} detail={data.detail} essential={data.essential} checkedItems={checkedItems} 
                    checkedItemHandeler = {checkedItemHandeler}/>
                )}
            </div>
            <div className={style.low}>
                <input type="button" value="취소" onClick={cancelHandler} className={style.cancel}/>
                <input type="button" value="확인" onClick={okHandler} className={style.ok}/>
            </div>
        </div>
    );
};

export default Description;