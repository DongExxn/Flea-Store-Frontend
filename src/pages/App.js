import { RouterProvider } from 'react-router-dom';
import '../style/init.css';
import router from './routes';

import NavigationBar from '../components/NavigationBar';

function App() {
  return (
    <>
      <NavigationBar />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
