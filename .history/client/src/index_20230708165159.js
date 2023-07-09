import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Routes, BrowserRouter as Router, useLocation } from 'react-router-dom'
import UserName from './UserName';
import Multiplayer from './Multiplayer';
import mainga
import styles from './formcss.css'
import SocketFront from './Socketfront';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path='/' element={<UserName/>} />
      <Route path='/game/' element={<SocketFront/>} />
      <Route />
    </Routes>
  </Router>
);

reportWebVitals();
