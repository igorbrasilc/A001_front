import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import ResetCss from '../assets/resetCss.js';
import GlobalStyle from '../assets/globalStyles';
import { UserProvider } from '../contexts/UserContext.js';

import SignInScreen from '../pages/SignInScreen.jsx';
import SignUpScreen from '../pages/SignUpScreen.jsx';
import UserScreen from '../pages/UserScreen.jsx';
import AdminScreen from '../pages/AdminScreen.jsx';

function App() {

  return (
    <UserProvider>
      <ResetCss />
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SignInScreen />} />
          <Route exact path="/cadastro" element={<SignUpScreen />} />
          <Route exact path="/user" element={<UserScreen />} /> 
          <Route exact path="/admin" element={<AdminScreen />} /> 
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
