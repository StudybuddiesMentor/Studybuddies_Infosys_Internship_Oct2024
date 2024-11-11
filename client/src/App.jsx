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
  );
}

export default App;
