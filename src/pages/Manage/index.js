import axios from 'axios';
import { useEffect, useState } from 'react';
import style from '../../style/Manage.module.css';
import LevelUpModal from '../Mypage/levelUpModal';

const Manage = () => {
  const [requestUsers, setRequestUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [detail, setDetail] = useState({});

  useEffect(() => {
    axios
      .get('http://localhost:8080/auth/permission-list')
      .then((result) => {
        setRequestUsers(result.data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const onClickDetail = (event) => {
    const {
      target: { name },
    } = event;
    axios
      .post(`http://localhost:8080/auth/permission-detail?requestId=${name}`)
      .then((result) => {
        setShow(true);
        setDetail(result.data.data);
      })
      .catch((error) => alert('에러'));
  };

  const onClickAccept = (event) => {
    const {
      target: { name },
    } = event;
    axios
      .post(`http://localhost:8080/auth/permission-accept?requestId=${name}`)
      .then((result) => {
        window.location.reload(true);
        alert('등록 완료');
      })
      .catch((error) => alert('에러'));
  };

  const onClickDecline = (event) => {
    const {
      target: { name },
    } = event;
    axios
      .post(`http://localhost:8080/auth/permission-decline?requestId=${name}`)
      .then((result) => {
        alert('취소 완료');
        window.location.reload(true);
      })
      .catch((error) => alert('에러'));
  };

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        {show && <LevelUpModal detail={detail} setShow={setShow} />}
        {requestUsers?.map((user) => (
          <div className={style.requestBox}>
            <div className={style.requestInfo}>
              <span>{`성함 : ${user.name}`}</span>
              <span>{`이메일 : ${user.email}`}</span>
              <span>{`전화번호 : ${user.phoneNumber}`}</span>
            </div>
            <div className={style.requestBtnBox}>
              <input
                onClick={onClickDetail}
                name={user.requestId}
                type="button"
                value="디테일"
              />
              <input
                onClick={onClickAccept}
                name={user.requestId}
                type="button"
                value="승인"
              />
              <input
                onClick={onClickDecline}
                name={user.requestId}
                type="button"
                value="취소"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Manage;
