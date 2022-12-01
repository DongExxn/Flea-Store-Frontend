import { createBrowserRouter } from 'react-router-dom';
import Calender from './Calender/index.js';
import Description from './Description/Description.jsx';

import Home from './Home/Home.js';
import Favorite from './Favorite/index';
import Login from './Login/Login.jsx';
import Manage from './Manage/index.js';
import MyPage from './Mypage/MyPage.jsx';
import Register from './Register/Register.jsx';

const router = createBrowserRouter([
  {
    path: `/`,
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/description',
    element: <Description />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/myPage',
    element: <MyPage />,
  },
  {
    path: '/calender',
    element: <Calender />,
  },
  {
    path: '/favorite',
    element: <Favorite />,
  },
  {
    path: '/manage',
    element: <Manage />,
  },
]);

export default router;
