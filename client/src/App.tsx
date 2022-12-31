import React from 'react';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import MainPage from './components/MainPage';
import AdminPage from './components/AdminPage';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<MainPage />} />
        <Route path={'/login'} element={<LoginPage />} />
        <Route path={'/admin'} element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
