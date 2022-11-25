import React from 'react';
import ReactDOM from 'react-dom/client';
import Chat from './Components/Chat';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';

const FireBaseConfig ={
  apiKey: "AIzaSyCynWNZATiKU4dMJPIaRDaX1Wt6cI8G5D8",
  authDomain: "socketchatapp-8ef7c.firebaseapp.com",
  databaseURL: "https://socketchatapp-8ef7c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "socketchatapp-8ef7c",
  storageBucket: "socketchatapp-8ef7c.appspot.com",
  messagingSenderId: "152560334138",
  appId: "1:152560334138:web:fe148ca4349a4479ad0c03",
  measurementId: "G-D76J2RE3VM"
}

const app = initializeApp(FireBaseConfig)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Chat/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
