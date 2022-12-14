import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import style from '../../style/levelUp.module.css'

const LevelUpModal = ({setShow}) => {
    const [name, setName] = useState("")
    const [addr, setAddr] = useState("")
    const [startYear, setStartYear] = useState("")
    const [startMonth, setStartMonth] = useState("")
    const [startDay, setStartDay] = useState("")
    const [endYear, setEndYear] = useState("")
    const [endMonth, setEndMonth] = useState("")
    const [endDay, setEndDay] = useState("")
    const [info, setInfo] = useState("")
    const [url, setUrl] = useState("")
    const [reason, setReason] = useState("")

    const onClose = () => {
        setShow(false)
    }

    const onRegist = () => {
        let smonth, sday, emonth, eday
        let start, end

        if(name ==="" || addr === "" || startYear === "" || startMonth === "" || startDay === "" || endYear=== "" || endMonth=== "" || endDay=== "" || info === "" || url === "" || reason === ""){
            alert("모든 항목에 정보를 기입해주시기 바랍니다.")
            return
        }
        if(startYear.length !== 4 || endYear.length !== 4){
            alert("연도는 2022와 같은 형식으로 입력해주시기 바랍니다.")
            return
        }
        else if(startMonth.length > 2 || endMonth.length > 2){
            alert("1월에서 12월 사이를 입력해주시기 바랍니다.")
            return
        }
        else if(startDay.length > 2 || endDay.length > 2){
            alert("1일에서 31일 사이를 입력해주시기 바랍니다.")
            return
        }

        if(startMonth.length == 1)
            smonth = '0' + startMonth
        else    
            smonth = startMonth

        if(startDay.length == 1)
            sday = '0' + startDay
        else
            sday = startDay
        
        if(endMonth.length == 1)
            emonth = '0' + endMonth
        else   
            emonth = endMonth

        if(endDay.length == 1)
            eday = '0' + endDay
        else
            eday = endDay

        start = startYear + '/' + smonth + '/' + sday
        end = endYear + '/' + emonth + '/' + eday
        
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
                    <div className={style.test}>
                        <input className={style.year} placeholder="연" type="input" onChange={(event)=>setStartYear(event.target.value)}/>
                        <input className={style.year} placeholder="월" type="input" onChange={(event)=>setStartMonth(event.target.value)}/>
                        <input className={style.year} placeholder="일" type="input" onChange={(event)=>setStartDay(event.target.value)}/>
                    </div>
                </div>
                <div className={style.side}>
                    <span>종료 날짜</span><br />
                    <div className={style.test}>
                        <input className={style.year} placeholder="연" type="input" onChange={(event)=>setEndYear(event.target.value)}/>
                        <input className={style.year} placeholder="월" type="input" onChange={(event)=>setEndMonth(event.target.value)}/>
                        <input className={style.year} placeholder="일" type="input" onChange={(event)=>setEndDay(event.target.value)}/>
                    </div>
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