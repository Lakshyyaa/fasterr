import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import UserName from './components/UserName';
import Footer from './components/Footer';
import SocketFront from './components/Socketfront';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <Router>
      <Routes>
        <Route path='/' element={<UserName />} />
        <Route path='/game/' element={<SocketFront />} />
        <Route />
      </Routes>
    </Router>
    <Footer />
  </div>

);

reportWebVitals();
