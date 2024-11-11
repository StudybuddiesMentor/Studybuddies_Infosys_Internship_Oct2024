import './index.css';
import Navbar from './components/Userpagenavbar';
import AdminSection1 from './components/AdminSection1';
import AdminFooter from './components/AdminFooter';

function App() {
  return (
    <>
      <Navbar/>   
      <AdminSection1 />
      <AdminFooter /> {/* Corrected this line */}
    </>
  );
  
}

export default App;
