import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import MailVerification from './components/MailVerification';
import Home from './components/Home'; // Import Home component
import './index.css';
import MainPage from './components/MainPage';
import Flashcard from './components/Flashcard';
import DeckCreator from './components/DeckCreator';


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
        <Route path="/Flashcard" element={<Flashcard/>}/>
        <Route path="/Deck" element={<DeckCreator/>}/>
      </Routes>
    </Router>
  );
}

export default App;
