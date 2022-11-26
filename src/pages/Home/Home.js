import { useEffect, useState } from 'react';
import style from '../../style/Home.module.css';
import Post from '../../components/Post.js';

const Home = () => {
  const [posts, setPosts] = useState([
    {
      name: 'string',
      address: 'string',
      startDate: '2022/11/01',
      endDate: '2022/11/30',
    },
    {
      name: 'string',
      address: 'string',
      startDate: '2022/11/01',
      endDate: '2022/11/30',
    },
    {
      name: 'string',
      address: 'string',
      startDate: '2022/11/01',
      endDate: '2022/11/30',
    },
  ]);

  const [countPosts, setCountPosts] = useState(0);

  useEffect(() => {
    const getPosts = () => {};
  }, []);

  return (
    <>
      <div className={style.container}>
        <div className={style.wrapper}>
          {posts?.map((post, index) => (
            <Post key={index} post={post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
