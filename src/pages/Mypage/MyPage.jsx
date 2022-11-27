import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const MyPage = () => {
    const [info, setInfo] = useState([]);
    const [nick, setNick] = useState("")
    const [num, setNum] = useState("")
    const [isPwd, setIsPwd] = useState(true)
    const [curPwd, setCurPwd] = useState("")
    const [newPwd, setNewPwd] = useState("")
    const [rePwd, setRePwd] = useState("")
    const accessToken = localStorage.getItem("accessToken")

    useEffect(() => {
        let url = "http://localhost:8080/user"
        let token = localStorage.getItem("accessToken");
        let grantType = localStorage.getItem("grantType");

        axios.get(url, {
            headers: {
                'accessToken': grantType + ' ' + token
            }
        })
        .then(response => {
            setInfo(response.data)
        })
        .catch(error => {
            console.log("can't get user info")
        })
    }, [])

    const pwdButtonHandler = () => {
        setIsPwd(!isPwd)
    }

    const inPwdButtonHandler = () => {
        let url = "http://localhost:8080/user/password"

        axios.post(url, {
            "currPassword" : curPwd,
            "newPassword" : newPwd
        },
        {headers:
        {
            'accessToken': accessToken
        }
        }
        )
        .then(response => {
            console.log("성공")
            setIsPwd(true)
        })
        .catch(error => {
            console.log("실패?")
        })
    }

    const curPwdHandler = (event) => {
        setCurPwd(event.target.value)
    }

    const newPwdHandler = (event) => {
        setRePwd(event.target.value)
    }

    const rePwdHandler = (event) => {
        setRePwd(event.target.value)
    }

    const nickHandler = (event) => {
        setNick(event.target.value)
    }
    
    const numHandler = (event) => {
        event.target.value = event.target.value
            .replace(/[^0-9]/g, '')
            .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
            .replace(/(\-{1,2})$/g, "")
        setNum(event.target.value)
    }

    const changeButtonHandler = () => {
        let url = "http://localhost:8080/user"

        if(nick === "" || num === "" || (nick === '서버 닉' && num === '서버 폰'))
            alert("변경된 정보가 없습니다")
        else{
            if(nick === '서버 닉')
                setNick("서버 닉")
            if(num === "서버 폰")
                setNum("서버 폰")

            axios.put(url, {
                "nickName": nick,
                "phoneNum": num
            },
            {headers:{
                'accessToken' : accessToken
            }})
            .then(response => {
                console.log("정보 수정 성공")
            })
            .catch(error => {
                console.log("정보 수정 실패")
            })
        }
    }

    return (
        <div>
            <div>
                <h1>벼룩창고</h1>
            </div>
            <div>
                <label>이메일</label>
                <div>이메일</div><hr />
            </div>
            <div>
                <label>비밀번호</label>
                <input type="button" value="비밀번호 변경" onClick={pwdButtonHandler}/>
                {isPwd ? <></>:
                <div>
                    <label>현재 비밀번호</label>    
                    <input type="password" value={curPwd} onChange={curPwdHandler}/><br />
                    <label>새로운 비밀번호</label> 
                    <input type="password" value={newPwd} onChange={newPwdHandler}/><br />
                    <label>비밀번호 확인</label> 
                    <input type="password" value={rePwd} onChange={rePwdHandler}/> <br />
                    <input type ="button" value="확인" onClick={inPwdButtonHandler}/>
                </div>}
            </div>
            <div>
                <label>이름</label>
                <div>이름<hr /></div>
            </div>
            <div>
                <label>닉네임</label>
                <input type="text" value="서버에서 받아온 닉네임" onChange={nickHandler}/><hr />
            </div>
            <div>
                <label>전화번호</label>
                <input type="text" value="서버에서 받아온 전화번호" onChange={numHandler}/><hr />
            </div>
            <div>
                <label>권한</label>
                <div>권한</div><hr />
            </div>
            <div>
                <input type="button" value="관심마켓"/>
                <input type="button" value="정보 수정" onClick={changeButtonHandler}/>
            </div>
        </div>
    );
};

export default MyPage;