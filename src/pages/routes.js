import { createBrowserRouter } from 'react-router-dom';

import Home from './Home/Home.js';

const router = createBrowserRouter([
  {
    path: `/`,
    element: <Home />,
  },
]);

export default router;
