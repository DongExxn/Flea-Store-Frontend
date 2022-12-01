import { useState } from 'react';
import style from '../../style/Home.module.css';
import Post from '../../components/Post.js';

const Home = () => {
  const [posts, setPosts] = useState([
    {
      name: '아이유 마켓',
      address: '서울 특별시',
      startDate: '2022/11/01',
      endDate: '2022/11/30',
      info: '아이유',
      relateUrl: 'string',
      image:
        'https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg',
    },
    {
      name: 'string',
      address: 'string',
      startDate: '2022/11/01',
      endDate: '2022/11/30',
      info: '채원',
      relateUrl: 'string',
      image: 'https://img.gqkorea.co.kr/gq/2022/07/style_62da366deba2b.jpg',
    },
    {
      name: 'string',
      address: 'string',
      startDate: '2022/11/01',
      endDate: '2022/11/30',
      info: '윈터',
      relateUrl: 'string',
      image: 'http://cdn.ggilbo.com/news/photo/202208/926599_758569_2224.jpg',
    },
  ]);

  return (
    <>
      <div className={style.container}>
        <div className={style.wrapper}>
          {posts?.map((post, index) => (
            <div key={index} className={style.card}>
              <Post post={post} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
