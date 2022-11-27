import { createBrowserRouter } from 'react-router-dom';
import Description from './Description/Description.jsx';

import Home from './Home/Home.js';
import Login from './Login/Login.jsx';
import MyPage from './Mypage/MyPage.jsx';
import Register from './Register/Register.jsx';

const router = createBrowserRouter([
  {
    path: `/`,
    element: <Home />
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
  }
]);

export default router;
