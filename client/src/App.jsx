import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import MailVerification from './components/MailVerification';
import Features from './components/Features';
import Home from './components/Home'; // Import Home component
import ExploreDecks from './components/explore/ExploreDecks'; // Import ExploreDecks
import ExploreDeckDetails from './components/explore/ExploreDeckDetails'; // Import ExploreDeckDetails
import './index.css';
import MainPage from './components/MainPage';
import Help from './components/Help.jsx';

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
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/help" element={<Help />} />
        <Route path="/explore" element={<ExploreDecks />} /> {/* Explore Decks Route */}
        <Route path="/decks/:deckId" element={<ExploreDeckDetails />} /> {/* Deck Details Route */}
      </Routes>
    </Router>
  );
}

export default App;
