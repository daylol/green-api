import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Menu from '../components/aside/Menu';
import s from './MainPage.module.scss';
import Message from '../components/message/Message';
import { sendMessage } from '../api';

const MainPage = () => {
  const { API, IdInstance } = useSelector((state) => state.user);
  const { number, text } = useSelector((state) => state.create);
  const [not, setNot] = useState([]);
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);

  const navTo = useNavigate();
  console.log('not'), not;

  useEffect(() => {
    if (!API && !IdInstance) {
      navTo('/login');
    }
  }, []);

  console.log('messages', messages);

  const checkMes = (id) => {
    const user = not.find((n) => n.idMessage === id);
    setChat(user);
  };

  return (
    <div className={s.mainPage}>
      <Menu
        setChat={setChat}
        not={not}
        checkMes={checkMes}
        setNot={setNot}
        messages={messages}
        setMessages={setMessages}
      />
      {chat && <Message chat={chat} messages={messages} />}
    </div>
  );
};

export default MainPage;
