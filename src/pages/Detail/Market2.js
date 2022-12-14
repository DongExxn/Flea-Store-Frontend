//마켓상세페이지

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

import styles from "./Market.module.css";

import { DataGrid } from "@mui/x-data-grid";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import style from '../../style/Favortie.module.css';
import dummyData from '../Favorite/dummyData';
import DetailPost from '../../components/DetailPost';



function Market() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        const getPosts = () => {
            axios
                .get(`http://localhost:8080/market?marketId=2`)
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
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Market;
