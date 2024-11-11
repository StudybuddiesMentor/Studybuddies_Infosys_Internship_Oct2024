import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import MailVerification from './components/MailVerification';
import Features from './components/Features';
import Home from './components/Home';
import './index.css';
import MainPage from './components/MainPage';
import Userpagenavbar from './components/Userpagenavbar'

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="/mail-verification" element={<MailVerification />} />
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/user-page" element={<Userpagenavbar />} />
      </Routes>
    
    </Router>
  );
}

export default App;
