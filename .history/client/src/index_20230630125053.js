import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Routes, BrowserRouter as Router, useLocation } from 'react-router-dom'
import UserName from './UserName';
import SocketFront from './Socketfront';
import styles from './formcss.css'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path='/' element={<UserName/>} />
      <Route path='/join' element={<SocketFront/>} />
      <Route />
    </Routes>
  </Router>
);

reportWebVitals();
