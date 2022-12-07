import { useEffect, useState } from 'react';
import style from '../../style/Home.module.css';
import Post from '../../components/Post.js';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getPosts = () => {
      axios
        .get(`http://localhost:8080/market/list/?page=${0}`)
        .then((result) =>
          setPosts((prev) => {
            console.log(result.data);
            return [...prev, ...result.data.data];
          })
        )
        .catch((error) => console.error(error));
    };
    getPosts();
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
