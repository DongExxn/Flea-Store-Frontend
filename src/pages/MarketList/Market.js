// 추가로 해야하는거
// 1. 회원 관심마켓 추가했는지 버튼으로 표시
// 2. 같은 지역 다른 마켓 목록 표시
// 3. 관심부스 추가하는 기능 구현

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import styles from "./Market.module.css";

import Slider from "../components/SliderImg.js";
import { Button, Divider, Link } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const columns = [
    {
        field: "id",
        headerName: "번호",
        width: 40,
    },
    {
        field: "boothName",
        headerName: "부스 이름",
        // width: 300,
    },
    {
        field: "item",
        headerName: "판매 품목",
        // width: 300
    },
    {
        field: "boothIdx",
        headerName: "부스 링크",
        // width: 300,
        renderCell: (param) => {
            return <Link href={`#${param.value}`}>link</Link>;
        },
    },
];

// const rows = [
//     { id: 1, Subject: "Snow", Name: "Jon", age: 35 },
//     { id: 2, Subject: "Lannister", Name: "Cersei", age: 42 },
//     { id: 3, Subject: "Lannister", Name: "Jaime", age: 45 },
//     { id: 4, Subject: "Stark", Name: "Arya", age: 16 },
//     { id: 5, Subject: "Targaryen", Name: "Daenerys", age: null },
//     { id: 6, Subject: "Melisandre", Name: null, age: 150 },
//     { id: 7, Subject: "Clifford", Name: "Ferrara", age: 44 },
//     { id: 8, Subject: "Frances", Name: "Rossini", age: 36 },
//     { id: 9, Subject: "Roxie", Name: "Harvey", age: 65 },
// ];

function Market() {
    const { id } = useParams();
    const { auth } = useAuth();

    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    const [data, setData] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const [isBoothLoad, setIsBoothLoad] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    const [boothList, setBoothList] = useState([]);
    const [periodText, setPeriodText] = useState("");

    const handleInterestMarketClick = async () => {
        if (auth?.userEmail === undefined) {
            alert("로그인이 필요한 서비스입니다.");
            navigate("/login");
        } else {
            console.log("관심 마켓 등록");

            try {
                const response = await axiosPrivate.post(`/markets/${id}/like`);
                console.log(response);
                setLikeCount(likeCount + 1);
            } catch (err) {
                console.log(err?.response);
                if (!err?.response) {
                    alert("No Server Response");
                } else if (err?.response?.data.code === "2910") {
                    alert("이미 관심 마켓으로 등록되어 있습니다.");
                }
            }
        }
    };

    const setGridRow = (boothList) => {
        const gridRow = [];
        boothList.map((booth, index) => {
            gridRow.push({
                id: index + 1,
                boothName: booth.boothName,
                item: booth.item,
                idx: booth.id,
            });
        });
        console.log(gridRow);
        return gridRow;
    };

    const getMarketData = () => {
        axios
            .get(`/markets/${id}`)
            .then((res) => {
                setData(res.data);
                setLikeCount(res.data.interestCount);
                console.log(res);
                setIsLoad(true);

                // getMarketList();
            })
            .catch(function (error) {
                console.log(error);
                alert("존재하지 않는 페이지 입니다.");
                navigate("/", { replace: true });
            });
    };

    const getBoothData = () => {
        axios
            .get(`/markets/${id}/booths`)
            .then((res) => {
                setBoothList(res.data.content);
                console.log(res);
                setIsBoothLoad(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const getMarketList = () => {
        console.log(data?.address?.sido);
        axios
            .get(
                `/markets?sort=LATEST&date=CURRENT&locals=${data?.address?.sido}&page=0`
            )
            .then((res) => {
                console.log(res);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const setPeriodRef = (data) => {
        const startDate = new Date(data.startDate);
        const endDate = new Date(data.endDate);
        console.log(startDate, endDate);

        let period = `${startDate.getFullYear()}.${startDate.getMonth() + 1
            }.${startDate.getDate()}`;

        period += ` ~ ${endDate.getFullYear()}.${endDate.getMonth() + 1
            }.${endDate.getDate()}`;
        console.log(period);
        // periodRef.current = period;
        setPeriodText(period);
    };

    useEffect(() => {
        // console.log(id);
        getMarketData();
        getBoothData();
    }, []);

    useEffect(() => {
        setPeriodRef(data); // 마켓 기간 설정
    }, [data]);

    return (
        <div className="area-3">
            <section>
                <div className={styles.column_wrap}>
                    <div className={styles.column_is_fixed}>
                        {isLoad === false ? (
                            <p>로딩중...</p>
                        ) : (
                            <div className={styles.slider_img}>
                                <Slider imgList={data.images} />
                            </div>
                        )}
                        <div className={styles.description}>
                            <h1>마켓 요약</h1>
                            {data.description}
                        </div>
                    </div>
                    <div className={styles.column}>
                        {isLoad === false ? (
                            <p>로딩중...</p>
                        ) : (
                            <section className={styles.info_section}>
                                <h1 className={styles.title_2}>
                                    {data.address.sido} {data.address.sigungu}
                                </h1>
                                <h1 className={styles.title_1}>{data.name}</h1>
                                <div className={styles.info_box}>
                                    <p className={styles.info}>
                                        일시: {periodText} /{" "}
                                        {data.openTime.slice(0, 5)} ~
                                        {data.closeTime.slice(0, 5)}
                                    </p>
                                    <Divider />
                                    <p className={styles.info}>
                                        장소: {data.address.detailAddress}
                                    </p>
                                </div>
                                <Button
                                    className={styles.button}
                                    variant="outlined"
                                    startIcon={<BookmarkBorderIcon />}
                                    onClick={handleInterestMarketClick}
                                >
                                    관심마켓 {likeCount}
                                </Button>
                            </section>
                        )}
                        <br />
                        <h1 className={styles.title_1}>부스 목록</h1>
                        {isBoothLoad === false ? (
                            <p>로딩중...</p>
                        ) : (
                            <section>
                                <div style={{ height: 400, width: "100%" }}>
                                    <DataGrid
                                        rows={setGridRow(boothList)}
                                        columns={columns}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                        checkboxSelection
                                    />
                                </div>
                                <Button
                                    className={styles.button}
                                    variant="outlined"
                                    startIcon={<BookmarkBorderIcon />}
                                >
                                    관심부스 추가하기
                                </Button>
                            </section>
                        )}
                    </div>
                </div>
            </section>
            <hr />
            <section className={styles.map_area}>
                <h1>마켓 부스 배치도 </h1>
                <img
                    src={`${data.mapImage}`}
                    className="marketMap"
                    alt="Market Map Image"
                />
            </section>
            <hr />
            {/* <section>
                <div className={styles.others_area}>
                    <h1>
                        {data?.address?.sido === undefined
                            ? data?.address?.sigungu
                            : `${data.address.sido} ${data.address.sigungu}`}
                        의 다른 마켓 둘러보기
                    </h1>
                </div>
            </section> */}
        </div>
    );
}

export default Market;
