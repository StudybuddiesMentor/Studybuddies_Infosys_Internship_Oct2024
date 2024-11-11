<<<<<<< HEAD
import React from 'react';
import Navbar from './components/Userpagenavbar';
import AdminSection1 from './components/AdminSection1';
import AdminFooter from './components/AdminFooter';
import ExplorePage from './components/ExplorePage_admin'; // Import ExplorePage

function App() {
  return (
    <>
      <Navbar />
      <ExplorePage /> {/* Render ExplorePage */}
      <AdminSection1 />
      <AdminFooter />
    </>
=======
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
>>>>>>> user_page
  );
}

export default App;
