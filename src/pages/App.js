import { RouterProvider } from 'react-router-dom';
import '../style/init.css';
import router from './routes';

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
