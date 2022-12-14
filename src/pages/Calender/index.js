import axios from 'axios';
import { useEffect, useState } from 'react';
import style from '../../style/Calender.module.css';

const Calender = () => {
  const [selectedYearMonth, setSelectYearMonth] = useState(() => {
    const date = new Date();
    return [parseInt(date.getFullYear()), parseInt(date.getMonth()) + 1];
  });
  const [posts, setPosts] = useState();

  useEffect(() => {
    console.log(selectedYearMonth);
    const getPosts = () => {
      axios
        .get(
          `http://localhost:8080/market/monthly?year=${selectedYearMonth[0]}&month=${selectedYearMonth[1]}`
        )
        .then((result) => {
          const data = result.data.data;
          setPosts(
            data.sort((a, b) => {
              return (
                parseInt(new Date(a.startDate).getDate()) -
                parseInt(new Date(b.startDate).getDate())
              );
            })
          );
        })
        .catch((error) => console.error(error));
    };
    getPosts();
  }, [selectedYearMonth]);

  const onClickBtn = (event) => {
    const {
      target: { value },
    } = event;

    if (value === '이전') {
      setSelectYearMonth((prev) => [
        prev[1] === 1 ? prev[0] - 1 : prev[0],
        prev[1] === 1 ? 12 : prev[1] - 1,
      ]);
    } else {
      setSelectYearMonth((prev) => [
        prev[1] === 12 ? prev[0] + 1 : prev[0],
        prev[1] === 12 ? 1 : prev[1] + 1,
      ]);
    }
    console.log(event.target);
  };

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.monthBar}>
          <input onClick={onClickBtn} type="button" value="이전" />
          <h1>{`${selectedYearMonth[0]}년 ${selectedYearMonth[1]}월`}</h1>
          <input onClick={onClickBtn} type="button" value="다음" />
        </div>
        <div className={style.content}>
          {posts?.map((post, index, array) =>
            !index || array[index - 1].startDate !== post.startDate ? (
              <>
                <div className={style.filter}>
                  <span>{post.startDate.replaceAll('/', '.')}</span>
                </div>
                <div className={style.marketInfo}>
                  <span>{post.name}</span>
                  <span>{post.address}</span>
                  <span>{post.endDate}</span>
                </div>
              </>
            ) : (
              <>
                <div className={style.marketInfo}>
                  <span>{post.name}</span>
                  <span>{post.address}</span>
                  <span>{`~ ${post.endDate.replaceAll('/', '.')}`}</span>
                </div>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Calender;
