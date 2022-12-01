import { createBrowserRouter } from 'react-router-dom';
import Description from './Description/Description.jsx';

import Home from './Home/Home.js';
import Login from './Login/Login.jsx';
import MarketEnroll from './MarketList/MarketEnroll.js';
import MyPage from './Mypage/MyPage.jsx';
import Register from './Register/Register.jsx';
import Market from './MarketList/Market.js';


const router = createBrowserRouter([
  {
    path: `/`,
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/description',
    element: <Description />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/myPage',
    element: <MyPage />
  },
  {
    path: '/markets',
    element: <MarketEnroll />
  },
  {
    path: '/marketlist',
    element: <Market />
  }
]);

export default router;
