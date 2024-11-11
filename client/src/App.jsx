import React from 'react'; // Import React
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import MailVerification from './components/MailVerification';
import Home from './components/Home'; // Import Home component
import './index.css'; // Main styles
import './styles/tailwind.css'; // Tailwind styles
import MainPage from './components/MainPage';
import Help from './components/Help';
import ExplorePage from './components/ExplorePage'; // Import ExplorePage
import Deck from './components/Deck';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home Route */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="/mail-verification" element={<MailVerification />} />
        <Route path="/main-page" element={<MainPage />} /> {/* Updated to lowercase for consistency */}
        <Route path="/help" element={<Help />} />
        <Route path="/explore" element={<ExplorePage />} /> {/* Changed path to /explore */}
        <Route path="/Deck" element={<Deck />} />

      </Routes>
    </Router>
  );
}

export default App;
