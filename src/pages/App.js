import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../style/init.css';
import router from './routes';
import Register from "./Home/Register"
import Description from './Home/Description';
import Login from "./Home/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/description" element={<Description />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
