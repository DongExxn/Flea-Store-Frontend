import { useEffect, useState } from 'react';
import style from '../../style/Home.module.css';
import Post from '../../components/Post.js';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const getPosts = () => {
      axios
        .get(`http://localhost:8080/market/list/?page=${page}`)
        .then((result) =>
          setPosts((prev) => {
            return [...prev, ...result.data.data];
          })
        )
        .catch((error) => {
          return console.error(error);
        });
    };
    const infiniteScroll = () => {
      const { scrollHeight } = document.documentElement;
      const { scrollTop } = document.documentElement;
      const { clientHeight } = document.documentElement;

      if (scrollTop >= scrollHeight - clientHeight) {
        setPage((prev) => prev + 1);
        window.removeEventListener('scroll', infiniteScroll);
      }
    };
    getPosts();
    window.addEventListener('scroll', infiniteScroll);
  }, [page]);
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
