import { useEffect } from 'react';
import s from './App.module.scss';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './pages/loginPage/LoginPage';
import ChatPage from './pages/chatPage/ChatPage';
import { useSelector } from 'react-redux';

function App() {
  const navigateTo = useNavigate();

  useEffect(() => {
    navigateTo('/login');
  }, []);

  return (
    <div className={s.wrapper}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
