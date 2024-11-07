import React from 'react'; // Import React
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import MailVerification from './components/MailVerification';
import Features from './components/Features';
import Home from './components/Home'; // Import Home component
import './index.css'; // Main styles
import './styles/tailwind.css'; // Tailwind styles
import MainPage from './components/MainPage';
import Help from './components/Help.jsx';
import ExplorePage from './components/ExplorePage'; // Import ExplorePage
import DeckList from './pages/DeckList';
import './App.css';
import TermsOfService from './components/TermNCondition.jsx';

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
        <Route path="/create-deck" element={<DeckList />} />
        <Route path="/term-and-condition" element={<TermsOfService />} />

      </Routes>
    </Router>
  );
}

export default App;
