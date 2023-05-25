import { useEffect, useState } from 'react';
import s from './App.module.scss';
import LoginPage from './pages/LoginPage';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MainPage from './pages/MainPage';

function App() {
  const navigateTo = useNavigate();

  useEffect(() => {
    navigateTo('/login');
  }, []);

  return (
    <div className={s.wrapper}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
