import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Chat from './Components/Chat';
import CreateAccAll from './Components/CreateAccPage/CreateAccAll';
import LoginAll from './Components/LoginPage/LoginAll';
import MainAll from './Components/MainPage/MainAll';

import './style.css'



function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<MainAll/>} />
      <Route path="/login" element={<LoginAll/>} />
      <Route path="/createAccount" element={<CreateAccAll/>} />
      <Route path="/chat" element={<Chat/>}/>
    </Routes>
    </>
  );
}

export default App;