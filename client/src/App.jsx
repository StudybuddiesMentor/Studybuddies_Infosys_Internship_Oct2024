import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword'; 
import ResetPassword from './components/ResetPassword';
import MailVerification from './components/MailVerification'
import Features from './components/Features';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> 
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="/mail-verification" element={<MailVerification />} /> 
        <Route path="/features" element={<Features/>}/>

        <Route
          path="/"
          element={
            <h1>
              Welcome! Please <a href="/register">register</a> or{' '}
              <a href="/login">login</a>.
            </h1>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
