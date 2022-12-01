import React, { useState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { Input } from "antd";
import { DatePicker, Layout } from "antd";
import { TimePicker } from "antd";
import { Button } from "antd";
import { Form, AppLayout } from "antd";
import { UserOutlined, ShopOutlined } from "@ant-design/icons";

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
            <Form style={{ display: 'inline-block' }}>
                <div>
                    <h1>플리마켓 신청</h1>
                    <div>
                        <label htmlFor="input_name"></label>
                        <Input placeholder="플리마켓 이름" prefix={<ShopOutlined />} />
                    </div>
                    <div>
                        <label htmlFor="input_date">
                            플리마켓 기간 : <DatePicker /> ~ <DatePicker />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="input_about"></label>
                        <Input
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
                        <label htmlFor="input_date">운영 시간 : </label>
                        <TimePicker.RangePicker />
                    </div>
                    <div>
                        <label htmlFor="input_about"></label>
                        <TextArea
                            rows={4}
                            placeholder="플리마켓 설명"
                            maxLength={6}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <Button type="primary onClick={onClickBoothEnroll}">
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
