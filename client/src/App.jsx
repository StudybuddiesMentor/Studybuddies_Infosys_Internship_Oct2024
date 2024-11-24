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
import ExplorePageadmin from './components/ExplorePage_admin'; // Import ExplorePage
import Adminpage from './components/Adminpage';
import UserMonitoringPage from './components/UserMonitoringPage';
import TermsNCondition from './components/TermNCondition.jsx';
// import Deck from './components/Deck';
import ContactUs from './components/ContactUs'; // Import ContactUs Page
import ViewDeckPage from './components/ViewDeckPage';
import Testimonials from './components/Testimonials.jsx';
import CreateFlashcardPage from './components/Flashcards.jsx';
import Userflashcards from './components/Userflashcards.jsx';
import EditDeckPage from './components/EditDeckPage.jsx';
import UpdateFlashcardPage from './components/UpdateFlashcard.jsx';
import ProtectedRoute from './components/ProtectedRoute';

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
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Logout" element={<Home />} />
        <Route path="/terms-of-service" element={<TermsNCondition />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/help" element={<Help />} />
      
        <Route element={<ProtectedRoute />}>
        <Route path="/main-page" element={<MainPage />} /> {/* Updated to lowercase for consistency */}
        <Route path="/explore" element={<ExplorePage />} /> {/* Changed path to /explore */}
        <Route path="/explore/:id" element={<ExplorePage />} />
        <Route path="/Deck" element={<Deck />} />
        <Route path="/UserPage" element={<UserPage />} />
        <Route path="/Decks" element={<Deck />} />
        <Route path="/AdminPage" element={<Adminpage/>} />
        <Route path="/UserMonitoringPage" element={<UserMonitoringPage />} />
        <Route path="/view-deck/:id" element={<ViewDeckPage/>} />
        <Route path="/explore-admin" element={<ExplorePageadmin />} /> 
        <Route path="/CreateFlashcard/:id" element={<CreateFlashcardPage />} /> 
        <Route path="/userflashcards" element={<Userflashcards />} /> 
        <Route path="/userflashcards/:id" element={<Userflashcards />} /> 
        <Route path="/edit-deck/:deckId" element={<EditDeckPage/>}/>
        <Route path="/updateflashcard/:deckId/:flashcardId" element={<UpdateFlashcardPage/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;