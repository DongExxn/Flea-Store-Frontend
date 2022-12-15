import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import '../style/init.css';

import NavigationBar from '../components/NavigationBar';
import Home from './Home/Home';
import Login from './Login/Login';
import Description from './Description/Description';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Register from './Register/Register';
import MyPage from './Mypage/MyPage';
import Calender from './Calender';
import Favorite from './Favorite';
import Manage from './Manage';
import MarketList from './MarketList/MarketList'; //목록페이지
import Market from './Detail/Market'; //상세조회페이지

function App() {
  const [name, setName] = useState('');
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');

  useEffect(() => {
    setLoading(true);
    const getName = () => {
      if (localStorage.getItem('accessToken') !== null) {
        setToken(localStorage.getItem('accessToken'));
        axios
          .get('http://localhost:8080/user', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          })
          .then((response) => {
            console.log(response.data.data);
            setName(response.data.data.name);
            setUser({
              ...response.data.data,
              authority: localStorage.getItem('authority'),
            });
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      setLoading(false);
    };

    getName();
  }, []);

  return (
    <>
      <BrowserRouter>
        <NavigationBar name={name} />
        {loading ? (
          <h1>로딩중...</h1>
        ) : (
          <>
            <Routes>
              <Route
                path="/"
                exact
                element={
                  user.authority === 'ROLE_ADMIN' ? <Manage /> : <Home />
                }
              ></Route>
              <Route
                path="/login"
                exact
                element={<Login setName={setName} setUser={setUser} />}
              ></Route>
              <Route
                path="/description"
                exact
                element={<Description />}
              ></Route>
              <Route path="/Register" exact element={<Register />}></Route>
              <Route path="/store" exact element={<MarketList />}></Route>
              <Route path="/detail/:id" exact element={<Market />}></Route>
              <Route
                path="/MyPage"
                exact
                element={
                  <MyPage user={user} settingName={setName} setUser={setUser} />
                }
              ></Route>
              <Route path="/Calender" exact element={<Calender />}></Route>
              <Route
                path="/Favorite"
                exact
                element={
                  token ? (
                    <Favorite token={token} />
                  ) : (
                    <Navigate to={'/login'} />
                  )
                }
              ></Route>
            </Routes>
          </>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
