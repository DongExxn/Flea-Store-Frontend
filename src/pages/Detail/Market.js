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



const bull = (
    <Box
        component="span"
        sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
        •
    </Box>
);

const columns = [
    { field: "id", headerName: "번호", width: 70 },
    { field: "Name", headerName: "부스 이름", width: 300 },
    { field: "Subject", headerName: "부스 품목", width: 300 },
];

const rows = [
    { id: 1, Subject: "Snow", Name: "Jon", age: 35 },
    { id: 2, Subject: "Lannister", Name: "Cersei", age: 42 },
    { id: 3, Subject: "Lannister", Name: "Jaime", age: 45 },
    { id: 4, Subject: "Stark", Name: "Arya", age: 16 },
    { id: 5, Subject: "Targaryen", Name: "Daenerys", age: null },
    { id: 6, Subject: "Melisandre", Name: null, age: 150 },
    { id: 7, Subject: "Clifford", Name: "Ferrara", age: 44 },
    { id: 8, Subject: "Frances", Name: "Rossini", age: 36 },
    { id: 9, Subject: "Roxie", Name: "Harvey", age: 65 },
];


function Market() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        //console.log(id);
        axios
            .get(`http://localhost:8080/market?marketId=2`)
            .then((res) => {
                console.log(res);
                setData(res.data.data);
                setIsLoad(true);
            })
            .catch(function (error) {
                console.log(error);
                alert("존재하지 않는 페이지 입니다.");
                // navigate("/", { replace: true });
            });
    }, []);

    // console.log(data?.data?.adress)

    return (

        <div className="area-3">
            <h1>마켓상세페이지</h1>
            <section className={styles.map_area}>
                <h1>마켓 사진</h1>
                <img src={data.existingImages} alt="logo" />
            </section>
            <section>
                <div className={styles.column_wrap}>
                    <div className={styles.column_is_fixed}>
                        <h1>마켓 설명</h1>
                        {/* <h2>밤도깨비야시장은 매년 4월부터 10월말까지 금요일과 주말 저녁 시간에만 열리는 야시장이다. 현재는 여의도, 반포한강공원, DDP, 청계천, 문화비축기지(5월)에 열리고 있다. DDP 밤도깨비야시장의 매력은 상당부분 DDP에 기인한다.</h2> */}
                    </div>
                    <div className={styles.column}>
                        {isLoad === false ? (
                            <p >로딩중...</p>
                        ) : (
                            <section className={styles.box}>
                                <h1 className={styles.title_1}>플리마켓</h1>
                                <Divider />
                                <h1 className={styles.title_2}>{data.name}</h1>
                                <h1 className={styles.title}>
                                    지역: {data.address}{" "}
                                </h1>
                                <h1 className={styles.title}>
                                    시간: {data.startDate}~
                                    {data.endDate}
                                </h1>
                                {/* <div className={styles.title}>관심마켓 {data?.interestCount}</div> */}
                                <Button className={styles.title_4} variant="contained">관심마켓 {data?.interestCount}</Button>
                            </section>
                        )}
                        {/* <h1 className={styles.title_1}>부스 목록</h1> */}
                        {isLoad === false ? (
                            <p>로딩중...</p>
                        ) : (
                            <section>
                                <div style={{ height: 400, width: "95%" }}>
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                    />

                                </div>
                            </section>
                        )}
                        <Button variant="contained">관심마켓</Button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Market;
