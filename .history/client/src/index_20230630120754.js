import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Routes, BrowserRouter as Router, useLocation } from 'react-router-dom'
import UserName from './UserName';
import Game from './Game'
import SocketFront from './Socketfront';
import styles from './formcss.css'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route></Route>
      <Route></Route>
      <Route></Route>
    </Routes>
    {/*<Game /> */}
    {/* <SocketFront /> */}
    {/* <UserName /> */}
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
