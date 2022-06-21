import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import ResetCss from '../assets/resetCss.js';
import GlobalStyle from '../assets/globalStyles';
// import TokenContext from '../contexts/TokenContext';

import SignInScreen from '../components/SignInScreen.jsx';
import SignUpScreen from '../components/SignUpScreen.jsx';

function App() {
//   const [user, setUser] = useState(() => {
//     const saved = localStorage.getItem('user');
//     const initialValue = JSON.parse(saved);
//     return initialValue || {
//       token: '',
//       image: '',
//       todayPercentage: 0,
//       name: '',
//       habits: [],
//     };
//   });

//   useEffect(() => {
//     localStorage.setItem('user', JSON.stringify(user));
//   }, [user]);

  return (
    <>
      <ResetCss />
      <GlobalStyle />
      {/* <TokenContext.Provider value={{ user, setUser }}> */}
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SignInScreen />} />
          <Route exact path="/cadastro" element={<SignUpScreen />} />
        </Routes>
      </BrowserRouter>
      {/* </TokenContext.Provider> */}
    </>
  );
}

export default App;
