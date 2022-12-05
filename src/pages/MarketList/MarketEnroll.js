import React, { useState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { Input } from "antd";
import { DatePicker, Layout } from "antd";
import { TimePicker } from "antd";
import { Button } from "antd";
import { Form, AppLayout } from "antd";
import { UserOutlined, ShopOutlined } from "@ant-design/icons";
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import axios from "axios";
import {
    AutoComplete,
    Cascader,
    Checkbox,
    Col,
    InputNumber,
    Row,
    Select
} from "antd";

const { Option } = Select;
const { TextArea } = Input;

function handleClick(e) {
    window.location.href = "/store"
}

const top100Films = [
    { title: '패션의류/뷰티', year: 1972 },
    { title: '디지털/가전', year: 1972 },
    { title: '문구/취미', year: 1974 },
    { title: '여행/도서', year: 2008 },
    { title: '스포츠/건강', year: 1957 },
    { title: "자동차/공구", year: 1993 },
    { title: '식품/생필품', year: 1994 },
    {
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
        title: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
        title: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
    { title: 'Casablanca', year: 1942 },
    { title: 'City Lights', year: 1931 },
    { title: 'Psycho', year: 1960 },
    { title: 'The Green Mile', year: 1999 },
    { title: 'The Intouchables', year: 2011 },
    { title: 'Modern Times', year: 1936 },
    { title: 'Raiders of the Lost Ark', year: 1981 },
    { title: 'Rear Window', year: 1954 },
    { title: 'The Pianist', year: 2002 },
    { title: 'The Departed', year: 2006 },
    { title: 'Terminator 2: Judgment Day', year: 1991 },
    { title: 'Back to the Future', year: 1985 },
    { title: 'Whiplash', year: 2014 },
    { title: 'Gladiator', year: 2000 },
    { title: 'Memento', year: 2000 },
    { title: 'The Prestige', year: 2006 },
    { title: 'The Lion King', year: 1994 },
    { title: 'Apocalypse Now', year: 1979 },
    { title: 'Alien', year: 1979 },
    { title: 'Sunset Boulevard', year: 1950 },
    {
        title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
        year: 1964,
    },
    { title: 'The Great Dictator', year: 1940 },
    { title: 'Cinema Paradiso', year: 1988 },
    { title: 'The Lives of Others', year: 2006 },
    { title: 'Grave of the Fireflies', year: 1988 },
    { title: 'Paths of Glory', year: 1957 },
    { title: 'Django Unchained', year: 2012 },
    { title: 'The Shining', year: 1980 },
    { title: 'WALL·E', year: 2008 },
    { title: 'American Beauty', year: 1999 },
    { title: 'The Dark Knight Rises', year: 2012 },
    { title: 'Princess Mononoke', year: 1997 },
    { title: 'Aliens', year: 1986 },
    { title: 'Oldboy', year: 2003 },
    { title: 'Once Upon a Time in America', year: 1984 },
    { title: 'Witness for the Prosecution', year: 1957 },
    { title: 'Das Boot', year: 1981 },
    { title: 'Citizen Kane', year: 1941 },
    { title: 'North by Northwest', year: 1959 },
    { title: 'Vertigo', year: 1958 },
    {
        title: 'Star Wars: Episode VI - Return of the Jedi',
        year: 1983,
    },
    { title: 'Reservoir Dogs', year: 1992 },
    { title: 'Braveheart', year: 1995 },
    { title: 'M', year: 1931 },
    { title: 'Requiem for a Dream', year: 2000 },
    { title: 'Amélie', year: 2001 },
    { title: 'A Clockwork Orange', year: 1971 },
    { title: 'Like Stars on Earth', year: 2007 },
    { title: 'Taxi Driver', year: 1976 },
    { title: 'Lawrence of Arabia', year: 1962 },
    { title: 'Double Indemnity', year: 1944 },
    {
        title: 'Eternal Sunshine of the Spotless Mind',
        year: 2004,
    },
    { title: 'Amadeus', year: 1984 },
    { title: 'To Kill a Mockingbird', year: 1962 },
    { title: 'Toy Story 3', year: 2010 },
    { title: 'Logan', year: 2017 },
    { title: 'Full Metal Jacket', year: 1987 },
    { title: 'Dangal', year: 2016 },
    { title: 'The Sting', year: 1973 },
    { title: '2001: A Space Odyssey', year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: 'Toy Story', year: 1995 },
    { title: 'Bicycle Thieves', year: 1948 },
    { title: 'The Kid', year: 1921 },
    { title: 'Inglourious Basterds', year: 2009 },
    { title: 'Snatch', year: 2000 },
    { title: '3 Idiots', year: 2009 },
    { title: 'Monty Python and the Holy Grail', year: 1975 },
];

function MarketEnroll() {
    const [inputBoothName, setInputBoothName] = useState("");
    const [inputDate, setInputDate] = useState("");
    const [inputDate2, setInputDate2] = useState("");
    const [inputAbout, setInputAbout] = useState("");
    const [inputSeller, setInputSeller] = useState("");
    const [inputProduct, setInputProduct] = useState("");
    const [inputOpen, setInputOpen] = useState("");
    const [inputClose, setInputClose] = useState("");

    const onChange = (e) => {
        console.log("Change:", e.target.value);
    };
    // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleInputBoothName = (e) => {
        setInputBoothName(e.target.value);
    };

    const handleInputDate = (e) => {
        setInputDate(e.target.value);
    };

    const handleInputDate2 = (e) => {
        setInputDate2(e.target.value);
    };

    const handleInputAbout = (e) => {
        setInputAbout(e.target.value);
    };

    const handleInputSeller = (e) => {
        setInputSeller(e.target.value);
    };

    const handleInputProduct = (e) => {
        setInputProduct(e.target.value);
    };

    const handleInputOpen = (e) => {
        setInputOpen(e.target.value);
    };

    const handleInputClose = (e) => {
        setInputClose(e.target.value);
    };

    // login 버튼 클릭 이벤트
    const onClickBoothEnroll = () => {
        console.log("click BoothEnroll");
    };

    // 페이지 렌더링 후 가장 처음 호출되는 함수
    useEffect(
        () => {
            axios
                .get("/user_inform/login")
                .then((res) => console.log(res))
                .catch();
        },
        // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
        []
    );

    return (
        <div style={{ margin: 'auto' }}>
            <h1 style={{ margin: 10 }}>플리마켓 신청</h1>
            <Form style={{ display: 'inline-block' }}>
                <div>
                    <div style={{ margin: 0 }}>
                        <label htmlFor="input_name"></label>
                        <Input placeholder="플리마켓 이름" prefix={<ShopOutlined />} />
                    </div>
                    <div >
                        <label style={{ margin: 10 }} htmlFor="input_date">
                            플리마켓 기간 :
                            <DatePicker style={{ margin: 10 }} /> ~ <DatePicker style={{ marginBottom: 10 }} />
                        </label>
                    </div>
                    <div >
                        <label htmlFor="input_about"></label>
                        <Input style={{ marginBottom: 10 }}
                            placeholder="판매자 정보(ex: 이름/전화번호)"
                            prefix={<UserOutlined />}
                            name="input_seller"
                            value={inputSeller}
                            onChange={handleInputSeller}
                        />
                    </div>
                    <div>
                        <label htmlFor="input_about"></label>
                        <TextArea
                            rows={3}
                            placeholder="판매상품목록"
                            maxLength={6}
                            name="input_seller"
                            value={inputProduct}
                            onChange={handleInputProduct}
                        />
                    </div>
                    <div>
                        <label htmlFor="input_date" style={{ margin: 10 }}>운영 시간 : </label>
                        <TimePicker.RangePicker style={{ margin: 10 }} />
                    </div>
                    <div style={{ marginBottom: 10 }}>
                        <label htmlFor="input_about"></label>
                        <TextArea
                            rows={4}
                            placeholder="플리마켓 설명"
                            maxLength={6}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <Autocomplete
                            multiple
                            id="tags-filled"
                            options={top100Films.map((option) => option.title)}
                            defaultValue={[top100Films[13].title]}
                            freeSolo
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    // variant="filled"
                                    label="부스"
                                    placeholder="카테고리"
                                />
                            )}
                        />
                    </div>
                    <div>
                        <Button onClick={handleClick} type="primary onClick={onClickBoothEnroll}" style={{ margin: 10 }}>
                            플리마켓 목록 보기
                        </Button>
                        <Button onClick={onClickBoothEnroll}>플리마켓 등록하기</Button>
                    </div>
                    {/* <Link to="/register">회원가입</Link> */}
                </div>
            </Form>
        </div >
    );
}

export default MarketEnroll;
