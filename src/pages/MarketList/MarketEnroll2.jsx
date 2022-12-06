import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import style from '../../style/MarketEnroll.module.css';

const MarketEnroll2 = () => {
    const [name, setName] = useState(''); //마켓 이름
    const [nick, setNick] = useState('');  //마켓 설명
    const [email, setEmail] = useState(''); //마켓 주소
    const [code, setCode] = useState('');
    const [pwd, setPwd] = useState(''); //시작날짜
    const [repwd, setRepwd] = useState(''); //마감날짜
    const [pwdConfirm, setPwdConfirm] = useState('');
    const [num, setNum] = useState(''); //sns주소

    const [nameMsg, setNameMsg] = useState('');
    const [nickMsg, setNickMsg] = useState('');
    const [emailMsg, setEmailMsg] = useState('');
    const [codeConfirmMsg, setCodeConfirmMsg] = useState('');
    const [pwdConfirmMsg, setPwdConfirmMsg] = useState('');
    const [numMsg, setNumMsg] = useState('');

    const [isName, setIsName] = useState(true); //이름 입력 됐는지
    const [isNick, setIsNick] = useState(true); //닉네임 입력 됐는지
    const [isButton, setIsButton] = useState(true); //가입하기와 상관 없음
    const [isEmail, setIsEmail] = useState(true);
    const [isCode, setIsCode] = useState(true);
    const [ispwd, setIsPwd] = useState(true); //비번 입력 했는지
    const [isrepwd, setIsRepwd] = useState(true); //비번 입력 했는지
    const [isConfirm, setIsConfirm] = useState(true); //비번 확인 입력 했는지
    const [isNum, setIsNum] = useState(true); //번호 입력 했는지


    const nameHandeler = (event) => {
        setName(event.target.value);
        if (name.length < 2) {
            setNameMsg('마켓 이름을 입력해주세요');
            setIsName(true);
        } else {
            setNameMsg('마켓 이름 입력이 완료되었습니다');
            setIsName(false);
        }
    };

    const nickHandeler = (event) => {
        setNick(event.target.value);

        if (nick.length < 2) {
            setNickMsg('마켓 설명을 입력해주세요');
            setIsNick(true);
        } else {
            setNickMsg('마켓 설명이 완료되었습니다');
            setIsNick(false);
        }
    };

    const emailHandeler = (event) => {
        setEmail(event.target.value);
        // let regex = new RegExp(`[a-z0-9]+@[a-z]+[.][a-z]`);

        if (email.length < 2) {
            setEmailMsg('마켓 주소를 입력해주세요.');
            setIsEmail(true);
        } else {
            setEmailMsg('마켓 주소입력이 완료되었습니다.');
            setIsEmail(false);
        }
    };


    const codeHandler = (event) => {
        setCode(event.target.value);
    };

    const codeButtonHandler = () => {
        //이메일 인증 코드 확인
        //같을 땐 ok alert
        //다를 땐 인증번호 다르다고 alert
    };

    const pwdHandeler = (event) => {
        setPwd(event.target.value);
        if (pwd.length < 2) {
            setIsPwd(true);
        } else {
            setIsPwd(false);
        }
    };

    const rePwdHandeler = (event) => {
        setRepwd(event.target.value);
        if (pwd.length < 2) {
            setIsRepwd(true);
        } else {
            setIsRepwd(false);
        }
    };

    const numHandeler = (event) => {

        setNum(event.target.value);

        if (num.length < 2) {
            setNumMsg('sns주소를 기입하세요.');
            setIsNum(true);
        } else {
            setNumMsg('sns 주소 완료');
            setIsNum(false);
        }
    };


    function handleClick(e) {
        window.location.href = "/store"
    }

    const buttonHandler = () => {
        let url = 'http://localhost:8080/market';

        if (isName && isNick && isCode && ispwd && isConfirm && isNum) {
            alert('모든 정보를 기입해주시기 바랍니다');
            return;
        } else {
            axios
                .post(url, {
                    email: email,
                    name: name,
                    nickname: nick,
                    password: pwd,
                    phoneNumber: num,
                })
                .then((response) => {
                    Navigate('/store');
                })
                .catch((error) => {
                    console.log('post api error');
                });
        }
    };

    return (
        <div className={style.outter}>
            <div className={style.headerOut}>
                <h1 className={style.header}>플리마켓 신청</h1>
            </div>
            <div className={style.inner}>
                <span>플리마켓 이름</span>
                <br />
                <input
                    type="text"
                    name="name"
                    onChange={nameHandeler}
                    className={style.full}
                ></input>
                <br />
                <span>{nameMsg}</span>
                <br />
                <br />
                <span>마켓 설명</span>
                <br />
                <textarea
                    type="text"
                    name="nick"
                    onChange={nickHandeler}
                    className={style.full}
                ></textarea>
                <br />
                <span>{nickMsg}</span>
                <br />
                <br />
                <span>마켓 주소</span>
                <br />
                <div className={style.full}>
                    <input
                        className={style.combination}
                        type="text"
                        name="email"
                        onChange={emailHandeler}
                    ></input>
                    <br />
                </div>
                <span>{emailMsg}</span>
                <br />
                <span>{codeConfirmMsg}</span>
                <br />
                <span>시작날짜(ex: 22-01-01)</span>
                <br />
                <input
                    type="text"
                    name="pwd"
                    onChange={pwdHandeler}
                    className={style.full}
                ></input>
                <br />
                <br />
                <span>마감날짜</span>
                <br />
                <input
                    type="text"
                    name="rePwd"
                    onChange={rePwdHandeler}
                    className={style.full}
                ></input>
                <br />
                <span>{pwdConfirmMsg}</span>
                <br />
                <span>sns주소</span>
                <br />
                <input
                    type="text"
                    for="pwd"
                    onInput={numHandeler}
                    className={style.full}
                ></input>
                <br />
                <span>{numMsg}</span>
            </div>
            <div className={style.low}>
                <hr />
                <button onClick={handleClick} className={style.backButton}>
                    뒤로가기
                </button>
                <button onClick={buttonHandler} className={style.finalButton}>
                    마켓 신청하기
                </button>
            </div>
        </div>
    );
};

export default MarketEnroll2;
