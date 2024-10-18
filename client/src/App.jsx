import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ForgotPassword from './ForgotPassword'; 
import ResetPassword from './ResetPassword';
import MailVerification from './MailVerification'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> 
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="/mail-verification" element={<MailVerification />} /> 
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
