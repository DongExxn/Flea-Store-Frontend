import { useEffect, useState } from 'react';
import style from '../../style/Calender.module.css';
import dummyData from './dummyData';

const Calender = () => {
  const [selectedYearMonth, setSelectYearMonth] = useState(() => {
    const date = new Date();
    return [parseInt(date.getFullYear()), parseInt(date.getMonth()) + 1];
  });
  const [posts, setPosts] = useState();

  useEffect(() => {
    const getPosts = () => {
      const data = dummyData;
      setPosts(
        data.sort((a, b) => {
          return (
            parseInt(new Date(a.startDate).getDate()) -
            parseInt(new Date(b.startDate).getDate())
          );
        })
      );
    };
    getPosts();
  }, [selectedYearMonth]);

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.monthBar}>
          <input type="button" value="이전" />
          <h1>{`${selectedYearMonth[0]}년 ${selectedYearMonth[1]}월`}</h1>
          <input type="button" value="다음" />
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
