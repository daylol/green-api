import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import s from './ChatPage.module.scss';
import SideMenu from '../../components/sideMenu/SideMenu';
import Message from '../../components/message/Message';

const ChatPage = () => {
  const { API, IdInstance } = useSelector((state) => state.user);
  const [chat, setChat] = useState(null);
  const navTo = useNavigate();

  useEffect(() => {
    if (!API && !IdInstance) {
      navTo('/login');
    }
  }, []);

  return (
    <div className={s.mainPage}>
      <SideMenu chat={chat} setChat={setChat} />
      {chat && <Message chat={chat} />}
    </div>
  );
};

export default ChatPage;
