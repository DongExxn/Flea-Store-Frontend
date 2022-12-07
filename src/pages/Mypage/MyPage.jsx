import React, { useState } from 'react';
import axios from 'axios';
import style from '../../style/MyPage.module.css'
import { useEffect } from 'react';
import LevelUpModal from './levelUpModal';

const MyPage = ({ user, settingName, setUser }) => {
    const [nick, setNick] = useState("")
    const [num, setNum] = useState("")
    const [isPwd, setIsPwd] = useState(true)//비밀번호 변경 탭 뜨는거
    const [newPwd, setNewPwd] = useState("")//새로운 패스워드
    const [rePwd, setRePwd] = useState("")//패스워드 재확인
    const [show, setShow] = useState(false)//모달창 보이도록
    let nickTemp = '';
    let numTemp = '';

    const pwdButtonHandler = () => {
        setIsPwd(!isPwd)
    }

    const inPwdButtonHandler = () => {
        if (newPwd !== rePwd) {
            alert("새로운 비밀번호와 재확인 비밀번호가 일치하지 않습니다.")
            return
        }

        axios.post('http://localhost:8080/user/password', {
            "newPassword": newPwd
        }, {
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


    const changeButtonHandler = () => {
        if (nick === '' && num === '')
            alert("변경된 정보가 없습니다")

        if (nick === '') {
            console.log(user.nickName)
            nickTemp = user.nickName
        }
        else {
            nickTemp = nick
            console.log(nickTemp)
        }
        if (num === '') {
            console.log(user.phoneNumber)
            numTemp = user.phoneNumber
        }
        else {
            numTemp = num
            console.log(numTemp)
        }

        axios.put('http://localhost:8080/user', {
            "name": user.name,
            "nickname": nickTemp,
            "phoneNumber": numTemp
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(response => {
                console.log(response)
                alert('정보 변경!')
                window.location.href = 'http://localhost:3000/MyPage'
            })
            .catch(error => {
                console.log(error)
            })
    }

    const onLevelUp = () => {
        setShow(true)
    }

    const onLogOut = () => {
        localStorage.clear()
        settingName("")
        setUser([])
        window.location.href = '/'
    }

    return (
        <div className={style.outter}>
            {localStorage.getItem("accessToken") === null ?
                <div>
                    <div className={style.noAccess}>
                        접근 권한이 없습니다.
                        <br /><br />
                        로그인 이후에 이용해주시기 바랍니다.
                    </div>
                </div>
                :
                <div>
                    <div className={style.picOutter}>
                        <div className={style.picInner}>
                            <img className={style.pic} src={localStorage.getItem("authority") === 'ROLE_USER' ?
                                'https://cdn-icons-png.flaticon.com/512/8227/8227755.png' : 'https://cdn-icons-png.flaticon.com/512/4856/4856934.png'} />
                        </div>
                        <div>
                            <div className={style.inner}>{user.name}</div>
                        </div>
                        <div className={style.auth}>
                            {localStorage.getItem("authority") === 'ROLE_USER' ? <span className={style.rity}>회원</span> : <span>판매자</span>}
                            {localStorage.getItem("authority") === 'ROLE_USER' ?
                                <input type="button" value="권한 변경" onClick={onLevelUp} className={style.side} /> : <></>}
                            {show ? <LevelUpModal setShow={setShow} /> : <></>}
                        </div>
                        <div>
                            <hr />
                        </div>
                    </div>
                    <div className={style.inner}>
                        <label>이메일</label>
                        <div className={style.inner}>{user.email}</div>
                    </div>
                    <div className={style.inner}>
                        <label>비밀번호</label>
                        <input type="button" value="비밀번호 변경" onClick={pwdButtonHandler} className={style.side} />
                        {isPwd ? <></> :
                            <div>
                                <label>새로운 비밀번호</label>
                                <input type="password" value={newPwd} onChange={newPwdHandler} /><br />
                                <label>비밀번호 확인</label>
                                <input type="password" value={rePwd} onChange={rePwdHandler} />
                                <div className={style.ok}>
                                    <input type="button" value="확인" onClick={inPwdButtonHandler} className={style.side} />
                                </div>
                            </div>}
                    </div>
                    <div className={style.inner}>
                        <label>닉네임</label><br />
                        <input type="text" placeholder={user.nickname} onChange={nickHandler} />
                    </div>
                    <div className={style.inner}>
                        <label>전화번호</label><br />
                        <input type="text" placeholder={user.phoneNumber} onChange={numHandler} /><hr />
                    </div>
                    <div className={style.bottom}>
                        <div className={style.buttonOut}>
                            <input type="button" value="관심마켓" className={style.side} />
                        </div>
                        <div className={style.buttonOut}>
                            <input type="button" value="정보 수정" onClick={changeButtonHandler} className={style.side} />
                        </div>
                        <div className={style.buttonOut}>
                            <input type="button" value="로그아웃" onClick={onLogOut} className={style.side} />
                        </div>
                        <div className={style.buttonOut}>
                            <input type="button" value="회원탈퇴" className={style.side} />
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default MyPage;