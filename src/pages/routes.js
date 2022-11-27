import { createBrowserRouter } from 'react-router-dom';
import Description from './Home/Description.jsx';

import Home from './Home/Home.js';
import Login from './Home/Login.jsx';
import MyPage from './Home/MyPage.jsx';
import Register from './Home/Register.jsx';

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
  }
]);

export default router;
