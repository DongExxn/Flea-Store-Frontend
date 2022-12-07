import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import style from '../../style/levelUp.module.css'

const LevelUpModal = ({setShow}) => {
    const [name, setName] = useState("")
    const [addr, setAddr] = useState("")
    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")
    const [info, setInfo] = useState("")
    const [url, setUrl] = useState("")
    const [reason, setReason] = useState("")

    const onClose = () => {
        setShow(false)
    }

    const onRegist = () => {
        if(name ==="" || addr === "" || start === "" || end === "" || info === "" || url === "" || reason === ""){
            alert("모든 항목에 정보를 기입해주시기 바랍니다.")
            return
        }
        axios.post("http://localhost:8080/user/permission-request",{
            marketName: name,
            address: addr,
            startDate: start,
            endDate: end,
            info: info,
            relatedUrl: url,
            reason: reason
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
              }
        })
        .then(response => {
            alert("권한 심사 요청이 접수되었습니다!")
            onClose()
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div className={style.container}>
            <div className={style.close}>
                <input type="button" value="x" onClick={onClose}/>
            </div>
            <div>
                <div className={style.side}>
                    <h1>권한 신청</h1>
                </div>
                <div className={style.side}>
                    <span>마켓 이름</span><br />
                    <input type="input" onChange={(event)=>{setName(event.target.value)}}/>
                </div>
                <div className={style.side}>
                    <span>주소</span><br />
                    <input type="input" onChange={(event)=>setAddr(event.target.value)}/>
                </div>
                <div className={style.side}>
                    <span>시작 날짜</span><br />
                    <input type="input" onChange={(event)=>setStart(event.target.value)}/>
                </div>
                <div className={style.side}>
                    <span>종료 날짜</span><br />
                    <input type="input" onChange={(event)=>setEnd(event.target.value)}/>
                </div>
                <div className={style.side}>
                    <span>마켓 소개</span><br />
                    <input type="input" onChange={(event)=>setInfo(event.target.value)}/>
                </div>
                <div className={style.side}>
                    <span>마켓 소개 URL</span><br />
                    <input type="input" onChange={(event)=>setUrl(event.target.value)}/>
                </div>
                <div className={style.side}>
                    <span>마켓 등록 사유</span><br />
                    <input type="input" onChange={(event)=>setReason(event.target.value)}/>
                </div>
                <div>
                    <input type="button" value="신청" onClick={onRegist}/>
                </div>
            </div>
        </div>
    );
};

export default LevelUpModal;