import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const MyPage = ({user}) => {
    const [nick, setNick] = useState("")
    const [num, setNum] = useState("")
    const [name, setName] = useState("")
    const [isPwd, setIsPwd] = useState(true)//비밀번호 변경 탭 뜨는거
    const [newPwd, setNewPwd] = useState("")//새로운 패스워드
    const [rePwd, setRePwd] = useState("")//패스워드 재확인
    const accessToken = localStorage.getItem("accessToken")

    const pwdButtonHandler = () => {
        setIsPwd(!isPwd)
    }

    const inPwdButtonHandler = () => {
        if(newPwd !== rePwd){
            alert("새로운 비밀번호와 재확인 비밀번호가 일치하지 않습니다.")
            return
        }
        
        axios.post('http://localhost:8080/user/password',{
            "newPassword": newPwd
        },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
              }
        })
        .then(response => {
            alert('패스워드가 변경되었습니다.')
            pwdButtonHandler()
        })
        .catch(error => {
            console.log(error)
        })
    }

    const newPwdHandler = (event) => {
        setNewPwd(event.target.value)
    }

    const rePwdHandler = (event) => {
        setRePwd(event.target.value)
    }

    const nickHandler = (event) => {
        console.log("in")
        setNick(event.target.value)
    }
    
    const numHandler = (event) => {
        event.target.value = event.target.value
            .replace(/[^0-9]/g, '')
            .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
            .replace(/(\-{1,2})$/g, "")
        setNum(event.target.value)
    }

    const nameHandler = (event) => {
        setName(event.target.value)
    }

    const changeButtonHandler = () => {
        if(name === '' && nick === '' && num === '')
            alert("변경된 정보가 없습니다")
    }

    return (
        <div>
            <div>
                <label>이메일</label>
                <div>{user.email}</div><hr />
            </div>
            <div>
                <label>비밀번호</label>
                <input type="button" value="비밀번호 변경" onClick={pwdButtonHandler}/>
                {isPwd ? <></>:
                <div>
                    <label>새로운 비밀번호</label> 
                    <input type="password" value={newPwd} onChange={newPwdHandler}/><br />
                    <label>비밀번호 확인</label> 
                    <input type="password" value={rePwd} onChange={rePwdHandler}/> <br />
                    <input type ="button" value="확인" onClick={inPwdButtonHandler}/>
                </div>}
            </div>
            <div>
                <label>이름</label><br />
                <input type="text" placeholder={user.name} onChange={nameHandler}/><hr />
            </div>
            <div>
                <label>닉네임</label><br />
                <input type="text" placeholder={user.nickname} onChange={nickHandler}/><hr />
            </div>
            <div>
                <label>전화번호</label><br />
                <input type="text" placeholder={user.phoneNumber} onChange={numHandler}/><hr />
            </div>
            <div>
                <label>권한</label>
                <div>{localStorage.getItem("authority") === 'ROLE_USER' ? '회원' : '판매자'}</div><hr />
            </div>
            <div>
                <input type="button" value="관심마켓"/>
                <input type="button" value="정보 수정" onClick={changeButtonHandler}/>
            </div>
        </div>
    );
};

export default MyPage;