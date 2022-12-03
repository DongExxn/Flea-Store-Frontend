import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../style/init.css';

import NavigationBar from '../components/NavigationBar';
import Home from './Home/Home';
import Login from './Login/Login';
import Description from './Description/Description';
import { useState } from 'react';
import axios from 'axios';
import Register from './Register/Register';
import MyPage from './Mypage/MyPage';
import Calender from './Calender';
import Favorite from './Favorite';
import Manage from './Manage';

function App() {
  const [name, setName] = useState("");
  const [user, setUser] = useState([]);

    const getName = () => {
     if(localStorage.getItem('accessToken') !== null)
     {
      axios.get('http://localhost:8080/user', {
       headers: {
         Authorization: `Bearer ${localStorage.getItem('accessToken')}`
       }
     })
     .then(response => {
       setName(response.data.data.name);
       setUser(response.data.data)
     })
     .catch(error => {
       console.log(error);
     })
    }
   }

   getName();

  return (
    <>
      <BrowserRouter>
        <NavigationBar name={name} />
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/login" exact element={<Login setName={setName} setUser={setUser} />}></Route>
          <Route path="/description" exact element={<Description />}></Route>
          <Route path="/Register" exact element={<Register />}></Route>
          <Route path="/MyPage" exact element={<MyPage user={user} settingName={setName} setUser={setUser}/>}></Route>
          <Route path="/Calender" exact element={<Calender />}></Route>
          <Route path="/Favorite" exact element={<Favorite />}></Route>
          <Route path="/Manage" exact element={<Manage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
