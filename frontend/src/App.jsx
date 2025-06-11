import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';
import Chatbot from './components/Chatbot';

import './App.css';


import CursorEffect from './components/CursorEffect';

// ✅ Import added for custom mobile-style tracking UI
import TrackOrder from './pages/TrackOrder/TrackOrder';
import OrderStatus from './components/OrderStatus';


const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <motion.h1 
          initial={{ scale: 0 }}
          animate={{ scale: 1.2 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
          className="loading-text"
        >
          Quick Bite
        </motion.h1>
      </div>
    );
  }

  return (
    <>
      <CursorEffect />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/track/:id' element={<TrackOrder />} />
        </Routes>
      </div>
      <Footer />
      <Chatbot />
    </>
  );
};

export default App;
