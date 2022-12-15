//마켓상세페이지

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import styles from './Market.module.css';

import { DataGrid } from '@mui/x-data-grid';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import style from '../../style/Favortie.module.css';
import dummyData from '../Favorite/dummyData';
import DetailPost from '../../components/DetailPost';

function Market() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    //console.log(id);
    axios
      .get(`http://localhost:8080/market?marketId=${id}`)
      .then((res) => {
        setData(res.data.data);
        setIsLoad(true);
      })
      .catch(function (error) {
        console.log(error);
        alert('존재하지 않는 페이지 입니다.');
        // navigate("/", { replace: true });
      });
  }, []);

  // console.log(data?.data?.adress)
  const Good = () => {
    axios
      .post(
        `http://localhost:8080/user/like?marketId=${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      )
      .then((result) => {
        if (result.data.massage === '좋아요 목록에 성공적으로 저장했습니다.') {
          alert('추가 완료');
        } else {
          alert('삭제 완료');
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="area-3">
      <section className={styles.map_area}>
        <h1>마켓 사진</h1>
        <img
          src={`data:image/jpeg;base64,${
            data.existingImages ? data.existingImages[0] : null
          }`}
          alt="logo"
        />
      </section>
      <section>
        <div className={styles.column_wrap}>
          <div className={styles.column_is_fixed}>
            <h1 className={styles.title_5}>마켓 소개</h1>
            <h1 className={styles.title_6}> {data.info}</h1>
          </div>
          <div className={styles.column}>
            {isLoad === false ? (
              <p>로딩중...</p>
            ) : (
              <section className={styles.box}>
                <h1 className={styles.title_1}>플리마켓</h1>
                <h1 className={styles.title_2}>이름 : {data.name}</h1>
                <h1 className={styles.title_2}>위치 : {data.address} </h1>
                <h1 className={styles.title_2}>
                  기간 : {data.startDate}~{data.endDate}
                </h1>
                <h1 className={styles.title_2}>SNS : {data.relatedUrl}</h1>
                {/* <div className={styles.title}>관심마켓 {data?.interestCount}</div> */}
                <Button
                  className={styles.title_4}
                  variant="contained"
                  onClick={Good}
                >
                  관심마켓 {data?.interestCount}
                </Button>
              </section>
            )}
            {/* <h1 className={styles.title_1}>부스 목록</h1> */}
            {isLoad === false ? (
              <p>로딩중...</p>
            ) : (
              <section>
                {/* <div style={{ height: 400, width: "95%" }}>
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                    />

                                </div> */}
              </section>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Market;
