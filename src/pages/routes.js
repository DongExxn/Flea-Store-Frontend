import { createBrowserRouter } from 'react-router-dom';
import Description from './Description/Description.jsx';

import Home from './Home/Home.js';
import Login from './Login/Login.jsx';
import MarketEnroll2 from './MarketList/MarketEnroll2.jsx';
import MyPage from './Mypage/MyPage.jsx';
import Register from './Register/Register.jsx';
import MarketList from './MarketList/MarketList.js';
import Market from './Detail/Market.js';


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
    path: '/market',
    element: <MarketEnroll2 />
  },
  {
    path: '/store',
    element: <MarketList />
  },
  {
    path: '/detail',
    element: <Market />
  }
]);

export default router;
