import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import  Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import SignIn from './pages/SignIn.jsx';
import Profile from './pages/Profile.jsx';
import Footer from './components/Footer.jsx';
import PillPage from './pages/PillPage.jsx';



function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Home />} />
            <Route path="/PillPage" element={<PillPage />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
  );
}


export default App;
