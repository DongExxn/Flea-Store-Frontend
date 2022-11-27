import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "../api/axios";

import styles from "./Market.module.css";

import Slider from "../components/SliderImg.js";

import { DataGrid } from "@mui/x-data-grid";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';


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


function Detail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        console.log(id);
        axios
            .get(`/Detail/${id}`)
            .then((res) => {
                setData(res.data);
                console.log(res);
                setIsLoad(true);
            })
            .catch(function (error) {
                console.log(error);
                alert("존재하지 않는 페이지 입니다.");
                navigate("/", { replace: true });
            });
    }, []);

    return (
        <div className="area-3">
            <h1>마켓상세페이지</h1>
            <section>
                <div className={styles.column_wrap}>
                    <div className={styles.column_is_fixed}>
                        {isLoad === false ? (
                            <p>로딩중...</p>
                        ) : (
                            <Slider imgList={data.images} />
                        )}
                        <h1>마켓 사진들</h1>
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
                                    지역: {data.address.sido}{" "}
                                    {data.address.sigungu}
                                </h1>
                                <h1 className={styles.title_3}>상세위치: {data.address.detailAddress}</h1>
                                <h1 className={styles.title}>
                                    시간: {data.openTime.slice(0, 5)} ~
                                    {data.closeTime.slice(0, 5)}
                                </h1>

                                <h1 className={styles.title}>
                                    운영기간:
                                    {new Date(data.startDate).getFullYear()}.
                                    {new Date(data.startDate).getMonth() + 1}.
                                    {new Date(data.startDate).getDate()} ~
                                    {new Date(data.endDate).getFullYear()}.
                                    {new Date(data.endDate).getMonth() + 1}.
                                    {new Date(data.endDate).getDate()}
                                </h1>
                                {/* <div className={styles.title}>관심마켓 {data.interestCount}</div> */}
                                <Button className={styles.title_4} variant="contained">관심마켓 {data.interestCount}</Button>
                            </section>
                        )}
                        <h1 className={styles.title_1}>부스 목록</h1>
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
                    </div>
                </div>
            </section>
            <section className={styles.map_area}>
                <h1>마켓 지도 팜플렛</h1>
                <img
                    src={`${data.mapImage}`}
                    className="marketMap"
                    alt="Market Map Image"
                />
            </section>
            <section>
                <div className={styles.others_area}>
                    <h1>ㅇㅇ 지역의 다른 마켓 둘러보기</h1>
                </div>
            </section>
        </div>
    );
}

export default Market;
