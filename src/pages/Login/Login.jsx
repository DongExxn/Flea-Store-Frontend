import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from '../../style/Login.module.css';

const Login = ({ setName }) => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');

  const emailHandeler = (event) => {
    setId(event.target.value);
  };

  const pwdHandler = (event) => {
    setPwd(event.target.value);
  };

  const getName = () => {
    axios
      .get('http://localhost:8080/user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        setName(response.data.data.name);
      })
      .catch((error) => {
        console.log('in');
      });
  };

  const buttonHandler = () => {
    let regex = new RegExp(`[a-z0-9]+@[a-z]+[.][a-z]`);
    let url = 'http://localhost:8080/auth/user/login';

    if (regex.test(id) === false) {
      alert('유효한 이메일 형식이 아닙니다.');
      return;
    }

    if (id === '') {
      alert('아이디를 입력하세요.');
      return;
    }

    if (pwd === '') {
      alert('비밀번호를 입력하세요');
      return;
    }

    axios
      .post(url, {
        email: id,
        password: pwd,
      })
      .then((response) => {
        // localStorage.clear()//로컬 스토리지 비운다
        // localStorage.setItem("accessToken", response.data.accessToken)
        // localStorage.setItem("grantType", response.data.grantType)
        // navigate("/")//로그인 성공 시 홈 화면 이동
        if (response.data.massage === '로그인 성공!') {
          console.log(response);
          console.log(response.data.data.authority);
          localStorage.clear();
          localStorage.setItem('grantType', response.data.data.grantType);
          localStorage.setItem('accessToken', response.data.data.accessToken);
          localStorage.setItem('authority', response.data.data.authority);
          getName();
          navigate('/');
        } else {
          alert('등록되지 않는 계정입니다');
          return;
        }
      })
      .catch((error) => {
        alert('등록된 계정이 아닙니다.');
        return;
      });
  };

  const registerButtonHandler = () => {
    navigate('/description');
  };

  return (
    <div className={style.finalOutter}>
      <div className={style.outter}>
        <div className={style.outInner}>
          <label for="email" className={style.label}>
            이메일
          </label>
          <input
            type="text"
            name="email"
            onChange={emailHandeler}
            className={style.box}
          ></input>
          <br />
        </div>
        <div className={style.outInner}>
          <label for="pwd" className={style.label}>
            비밀번호
          </label>
          <input
            type="password"
            name="pwd"
            onChange={pwdHandler}
            className={style.box}
          ></input>
        </div>
      </div>
      <div className={style.inner}>
        <button onClick={buttonHandler} className={style.loginButton}>
          로그인
        </button>
        <hr />
      </div>
      <div className={style.inner}>
        <button
          onClick={registerButtonHandler}
          className={style.registerButton}
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default Login;
