// eslint-disable-next-line no-unused-vars
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
import Privacy from './components/Privacy'; // Import Privacy Policy Page
import './index.css'; // Import css for Privacy Policy and ContactUS Page
import UserPage from './components/UserPage';
import Adminpage from './components/Adminpage';
import UserMonitoringPage from './components/UserMonitoringPage';
// import Deck from './components/Deck';

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
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/UserPage" element={<UserPage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Logout" element={<Home />} />
        <Route path="/Decks" element={<Deck />} />
        <Route path="/AdminPage" element={<Adminpage/>} />
        <Route path="/users" element={<UserMonitoringPage/>} />
        <Route path="/privacy-policy" element={<Privacy />} />
      </Routes>
    </Router>
  );
}

export default App;
