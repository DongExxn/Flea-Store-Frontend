import axios from 'axios';
import { useEffect, useState } from 'react';
import Post from '../../components/Post';
import style from '../../style/Favortie.module.css';

const Favorite = ({ user }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = () => {
      axios
        .get('http://localhost:8080/user/like-list', {
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
        })
        .then((result) => {
          console.log(result.data.data);
          return setPosts(result.data.data);
        })
        .catch((error) => console.error(error));
    };
    getPosts();
  }, [user]);

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        {posts?.map((post, index) => (
          <div key={index} className={style.card}>
            <Post post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorite;
