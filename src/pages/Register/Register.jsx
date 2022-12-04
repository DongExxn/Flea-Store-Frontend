import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import style from '../../style/Register.module.css';

const Register = () => {
  const [name, setName] = useState('');
  const [nick, setNick] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdConfirm, setPwdConfirm] = useState('');
  const [num, setNum] = useState('');

  const [nameMsg, setNameMsg] = useState('');
  const [nickMsg, setNickMsg] = useState('');
  const [emailMsg, setEmailMsg] = useState('');
  const [codeConfirmMsg, setCodeConfirmMsg] = useState('');
  const [pwdConfirmMsg, setPwdConfirmMsg] = useState('');
  const [numMsg, setNumMsg] = useState('');

  const [isName, setIsName] = useState(true); //이름 입력 됐는지
  const [isNick, setIsNick] = useState(true); //닉네임 입력 됐는지
  const [isNickOk, setIsNickOk] = useState(true); //닉네임 중복 되진 않았는지
  const [isButton, setIsButton] = useState(true); //가입하기와 상관 없음
  const [isEmail, setIsEmail] = useState(true);
  const [isCode, setIsCode] = useState(true);
  const [ispwd, setIsPwd] = useState(true); //비번 입력 했는지
  const [isConfirm, setIsConfirm] = useState(true); //비번 확인 입력 했는지
  const [isNum, setIsNum] = useState(true); //번호 입력 했는지

  useEffect(() => {
    setPwdConfirm('');
  }, []);

  const nameHandeler = (event) => {
    setName(event.target.value);
    if (name.length < 2) {
      setNameMsg('이름을 입력해주세요');
      setIsName(true);
    } else {
      setNameMsg('이름 입력이 완료되었습니다');
      setIsName(false);
    }
  };

  const nickHandeler = (event) => {
    setNick(event.target.value);

    if (nick.length < 2) {
      setNickMsg('닉네임을 입력해주세요');
      setIsNick(true);
    } else {
      setNickMsg('닉네임 입력이 완료되었습니다');
      setIsNick(false);
    }
  };

  const onNickButton = () =>{
    axios.post('http://localhost:8080/auth/users/nickname',{
      "nickname": nick
    })
    .then(response => {
      if(response.data.massage === '사용 가능한 닉네임입니다.'){
        setNickMsg('사용 가능한 닉네임입니다.');
        setIsNickOk(true);
      }
      else{
        setNickMsg('다른 닉네임을 입력해주세요.')
        setIsNickOk(false);
      }
    })
    .catch(error => {

    })
  }

  const emailHandeler = (event) => {
    setEmail(event.target.value);
    let regex = new RegExp(`[a-z0-9]+@[a-z]+[.][a-z]`);

    if (email.length < 2) {
      setEmailMsg('이메일을 입력해주세요.');
      setIsEmail(true);
    } else {
      if (regex.test(email) === false) {
        setEmailMsg('정확한 형식으로 입력해주세요.');
        setIsEmail(true);
      } else {
        setEmailMsg('이메일 입력이 완료되었습니다.');
        setIsEmail(false);
      }
    }
  };

  const emailDuplicateHandler = () => {
    axios.post('http://localhost:8080/auth/users/email',{
      'email': email
    })
    .then(response => {
      if(response.data.massage === '사용 가능한 이메일입니다.'){
        setIsButton(!isButton);
      }
      else{
        setEmailMsg('중복되는 이메일 주소입니다.');
      }
    })
    .catch(error => {

    })
  };

  const emailCheckHandler = () => {
    axios.post('http://localhost:8080/auth/users/send-email',{
          'email': email
        })
        .then(response => {
          if(response.data.result === 'success'){
            setEmailMsg('인증번호 발송 완료');
          }
        })
        .catch(error => {

        })
  };

  const codeHandler = (event) => {
    setCode(event.target.value);
  };

  const codeButtonHandler = () => {
    axios.post('http://localhost:8080/auth/users/auth-email',{
      "code": code
    })
    .then(response => {
      if(response.data.massage === '메일 인증에 성공했습니다.'){
        setIsCode(false)
      }
      else{
        alert('인증번호를 다시 입력하세요')
        setIsCode(true)
      }
    })
    .catch(error => {

    })
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
    setPwdConfirm((prev) => {
      prev = event.target.value;
      console.log(prev);

      if (prev.length < 2) {
        setPwdConfirmMsg('다시 한번 비밀번호를 입력하세요.');
        setIsConfirm(true);
      } else {
        if (prev === pwd) {
          setPwdConfirmMsg('설정하신 비밀번호와 일치합니다.');
          setIsConfirm(false);
        } else {
          setPwdConfirmMsg('설정하신 비밀번호와 일치하지 않습니다.');
          setIsConfirm(true);
        }
      }
      return prev;
    });
  };

  const numHandeler = (event) => {
    event.target.value = event.target.value
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
      .replace(/(\-{1,2})$/g, '');
    setNum(event.target.value);

    if (num.length === 12) {
      setNumMsg('휴대폰 번호 기입 완료하셨습니다.');
      setIsNum(false);
    } else {
      setNumMsg('정확한 휴대폰 번호를 기입하세요.');
      setIsNum(true);
    }
  };

  const buttonHandler = () => {
    let url = 'http://localhost:8080/auth/user/signup';

    if (isName && isNick && isNickOk && isCode && ispwd && isConfirm && isNum) {
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
          alert('회원가입에 성공하셨습니다.')
          window.location.href = '/'
        })
        .catch((error) => {
          console.log('post api error');
        });
    }
  };

  return (
    <div className={style.outter}>
      <div className={style.headerOut}>
        <h1 className={style.header}>회원가입</h1>
      </div>
      <div className={style.inner}>
        <span>이름</span>
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
        <span>닉네임</span>
        <br />
        <div className={style.full}>
          <input
            type="text"
            name="nick"
            onChange={nickHandeler}
            className={style.full}
          ></input>
          <input type="button" value="사용하기" onClick={onNickButton} disabled={isNick}/>
        </div> 
        <br />
        <span>{nickMsg}</span>
        <br />
        <br />
        <span>이메일</span>
        <br />
        <div className={style.full}>
          <input
            className={style.combination}
            type="text"
            name="email"
            onChange={emailHandeler}
          ></input>
          {isButton ? (
            <input
              type="button"
              value="중복 확인"
              onClick={emailDuplicateHandler}
              className={style.remainder}
              disabled = {isEmail}
            />
          ) : (
            <input
              type="button"
              value="인증번호 받기"
              onClick={emailCheckHandler}
              className={style.remainder}
            />
          )}
          <br />
        </div>
        <span>{emailMsg}</span>
        <br />
        <div className={style.full}>
          <input
            type="text"
            placeholder="인증번호 입력하세요"
            onChange={codeHandler}
            className={style.combination}
          />
          <input type="button" value="확인" onClick={codeButtonHandler} disabled={!isCode} className={style.remainder}/>
          <br />
        </div>
        <span>{codeConfirmMsg}</span>
        <br />
        <span>비밀번호</span>
        <br />
        <input
          type="password"
          name="pwd"
          onChange={pwdHandeler}
          className={style.full}
        ></input>
        <br />
        <br />
        <span>비밀번호 확인</span>
        <br />
        <input
          type="password"
          name="rePwd"
          onChange={rePwdHandeler}
          className={style.full}
        ></input>
        <br />
        <span>{pwdConfirmMsg}</span>
        <br />
        <span>휴대전화</span>
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
        <button onClick={buttonHandler} className={style.finalButton}>
          가입하기
        </button>
      </div>
    </div>
  );
};

export default Register;
