import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState("")
    const [nick, setNick] = useState("")
    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")
    const [pwdConfirm, setPwdConfirm] = useState("")
    const [num, setNum] = useState("")
    
    const [nameMsg, setNameMsg] = useState("")
    const [nickMsg, setNickMsg] = useState("")
    const [emailMsg, setEmailMsg] = useState("")
    const [pwdConfirmMsg, setPwdConfirmMsg] = useState("")
    const [numMsg, setNumMsg] = useState("")

    const [isName, setIsName] = useState(false)
    const [isNick, setIsNick] = useState(false)
    const [isEmail, setIsEmail] = useState(false)
    const [ispwd, setIsPwd] = useState(false)
    const [isConfirm, setIsConfirm] = useState(false)
    const [isNum , setIsNum] = useState(false)

    useEffect(() => {
        setPwdConfirm("")
    }, [])

    const nameHandeler = (event) => {
        setName(event.target.value)
        if(name.length < 2){
            setNameMsg("이름을 입력해주세요")
            setIsName(true)
        }
        else{
            setNameMsg("이름 입력이 완료되었습니다.")
            setIsName(false)
        }
    }

    const nickHandeler = (event) => {
        setNick(event.target.value)
        let url = "http://localhost:8080/auth/users/" + nick
        
        if(nick.length < 2){
            setNickMsg("닉네임을 입력해주세요")
            setIsNick(true)
        }
        else{
            axios.get(url)
            .then((response) => {
                if(response.message === "사용 가능한 이메일입니다."){
                    setNickMsg("사용 가능한 이메일입니다.")
                    setIsNick(false)
                }
                else if(response.message === "이미 존재하는 이메일입니다."){
                    setNickMsg("이미 존재하는 이메일입니다.")
                    setIsNick(true)
                }
            })
            .catch((error) => {
                console.log("nickname api error")
                setIsNick(true)
            })
        }
    }

    const emailHandeler = (event) =>{
        setEmail(event.target.value)
        let url = "http://localhost:8080/auth/users/" + email
        let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')

        if(email.length < 2){
            setEmailMsg("이메일을 입력해주세요.")
            isEmail(true)
        }
        else{
            if(regex.test(email) === false){
                setEmailMsg("정확한 이메일 형식으로 입력해주세요.")
                isEmail(true)
            }
            else{
                axios.get(url)
                .then((response)=>{
                    if(response.message === '사용 가능한 이메일입니다.'){
                        setEmailMsg("사용 가능한 이메일입니다.")
                        isEmail(false)
                    }
                    else{
                        setEmailMsg("이미 존재하는 이메일입니다.")
                        isEmail(true)
                    }
                })
                .catch((error)=>{
                    console.log("email api error")
                })
            }
        }
    }

    const pwdHandeler = (event) =>{
        setPwd(event.target.value)
        if(pwd.length < 2){
            setIsPwd(true)
        }
        else{
            setIsPwd(false)
        }
    }

    const rePwdHandeler = (event) => {
        setPwdConfirm((prev) => {
            prev = event.target.value
            console.log(prev)
            
            if(prev.length <2){
                setPwdConfirmMsg("다시 한번 비밀번호를 입력하세요.")
                setIsConfirm(true)
            }

            else{
                if(prev === pwd){
                    setPwdConfirmMsg("설정하신 비밀번호와 일치합니다.")
                    setIsConfirm(false)
                }
                else{
                    setPwdConfirmMsg("설정하신 비밀번호와 일치하지 않습니다.")
                    setIsConfirm(true)
                }
            }
            return prev
        })
    }
    
    const numHandeler = (event) => {
        event.target.value = event.target.value
            .replace(/[^0-9]/g, '')
            .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
            .replace(/(\-{1,2})$/g, "")
        setNum(event.target.value)
        
        if(num.length === 12){
            setNumMsg("휴대폰 번호 기입 완료하셨습니다.")
            setIsNum(false)
        }
        else{
            setNumMsg("정확한 휴대폰 번호를 기입하세요.")
            setIsNum(true)
        }
    }

    const buttonHandler = () => {
        let url = "http://localhost:8080/auth/user/signup"
        axios.post(url, {
            "email": email,
            "name": name,
            "nickname": nick,
            "password": pwd,
            "phoneNumber": num
        })
        .then((response) => {
            Navigate("")
        })
        .catch((error) => {
            console.log("post api error")
        })
    }

    return (
        <div>
            <div>
                <h1>벼룩창고</h1>
            </div>
            <div>
                <span>회원 정보를 입력해주세요.</span><hr />
            </div>
            <div>
                <label for="name">이름</label>
                <input type="text" name="name" onChange={nameHandeler}></input><br />
                <span>{nameMsg}</span><br />
                <label for="nick">닉네임</label>
                <input type="text" name="nick" onChange={nickHandeler}></input><br />
                <span>{nickMsg}</span><br />
                <label for="email">이메일</label>
                <input type="text" name="email" onChange={emailHandeler}></input><br />
                <span>{emailMsg}</span><br />
                <label for="pwd">비밀번호</label>
                <input type="password" name="pwd" onChange={pwdHandeler}></input><br /><br />
                <label for="rePwd">비밀번호 확인</label>
                <input type="password" name="rePwd" onChange={rePwdHandeler}></input><br />
                <span>{pwdConfirmMsg}</span><br/>
                <label for="num">휴대폰 번호</label>
                <input type="text" for="pwd" onInput={numHandeler}></input><br/>
                <span>{numMsg}</span>
            </div>
            <div>
                <hr/>
                <button onClick={buttonHandler} disabled={!(isName&&isNick&&ispwd&&isConfirm&&isEmail&&isNum)}>가입하기</button>
            </div>
        </div>
    );
};

export default Register;