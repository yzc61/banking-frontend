import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Navbar from './component/Navbar.js';
import LoginForm from './component/LoginForm.js';
import CreateAccountPage from './page/CreateAccountPage.js';
import MoneyTransferPage from './page/MoneyTransferPage.js';


function App() {
  return (
    <Routes>
      <Route path='/login' element={<LoginForm />}></Route>
      <Route path='/navbar' element={<Navbar />}></Route>
      <Route path='/home' element={<Navbar />}></Route>
      <Route path='/create-account' element={<CreateAccountPage />}></Route>
      <Route path='/transfer-money' element={<MoneyTransferPage />}></Route>
    </Routes>
  );
}

export default App;
