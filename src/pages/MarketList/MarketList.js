import { useState } from 'react';
import Post from '../../components/Post';
import style from '../../style/Favortie.module.css';
import dummyData from '../Favorite/dummyData';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { Outlet, Link } from "react-router-dom";
import { useEffect } from 'react';


const MarketList = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);

    function Detail() {
        // document.location.href('/detail')
        console.log("test")
    }

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
        <div onClick={Detail} className={style.container}>
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

export default MarketList;
