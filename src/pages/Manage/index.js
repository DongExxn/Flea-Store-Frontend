import { useState } from 'react';
import style from '../../style/Manage.module.css';

const Manage = () => {
  const [requestUsers, setRequestUsers] = useState([
    {
      email: 'string',
      name: '김명식',
      nickName: '수산물시장',
      PhoneNumber: '010-1234-5678',
      authority: 0,
    },
    {
      email: 'string',
      name: '윤은혜',
      nickName: '핸드폰팔이',
      PhoneNumber: '010-1234-5678',
      authority: 0,
    },
    {
      email: 'string',
      name: '손미정',
      nickName: '헌옷판매',
      PhoneNumber: '010-1234-5678',
      authority: 0,
    },
  ]);

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        {requestUsers?.map((user) => (
          <div className={style.requestBox}>
            <div className={style.requestInfo}>
              <span>{`성함 : ${user.name}`}</span>
              <span>{`이메일 : ${user.email}`}</span>
              <span>{`전화번호 : ${user.PhoneNumber}`}</span>
            </div>
            <div className={style.requestBtnBox}>
              <input type="button" value="디테일" />
              <input type="button" value="승인" />
              <input type="button" value="취소" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Manage;
