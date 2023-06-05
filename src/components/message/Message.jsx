import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './Message.module.scss';
import { setMessages, setText } from '../../store/features/CreateChatSlice';
import { sendMessage } from '../../api';
import { v4 } from 'uuid';

const Message = ({ chat }) => {
  const { messages } = useSelector((state) => state.create);
  const { text } = useSelector((state) => state.create);
  const { API, IdInstance, UserNumber } = useSelector((state) => state.user);

  const [filteredMessage, setFilteredMessage] = useState();

  useEffect(() => {
    setFilteredMessage(
      messages.filter(
        (mes) => mes.userId === chat.sender.chatId && mes.userId === `${UserNumber}@c.us`,
      ),
    );
  }, [chat]);

  console.log('chat', chat);

  const dispatch = useDispatch();
  const id = chat.sender.chatId;

  const onKeyPress = (e) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      createChat();
    }
  };

  const createChat = () => {
    if (text) {
      sendMessage(IdInstance, API, id, text);
      const mes = { text, userId: `${UserNumber}@c.us`, id: v4() };
      console.log('id', id);
      dispatch(setMessages([mes, ...messages]));
      setFilteredMessage([mes, ...filteredMessage]);
      dispatch(setText(''));
    }
  };

  useEffect(() => {
    setFilteredMessage([...messages]);
  }, [messages, chat]);

  console.log('messages', messages);
  console.log('filteredMessage', filteredMessage);

  return (
    <div className={s.main}>
      {chat.sender.chatName ? (
        <h2>{chat.sender.chatName}</h2>
      ) : (
        <h2>{chat.sender.chatId.slice(0, 12)}</h2>
      )}

      <div className={s.chat}>
        {filteredMessage &&
          filteredMessage.map(
            (message) => (
              console.log(chat.sender.userId, '===', message.userId),
              (
                <div
                  key={message.id}
                  className={
                    message.userId === `${UserNumber}@c.us` ? `${s.send}` : `${s.recieve}`
                  }>
                  <p className={s.message}>{message.text}</p>
                </div>
              )
            ),
          )}
      </div>
      <div className={s.sendinput}>
        <textarea
          type="text"
          onkey
          onKeyDown={onKeyPress}
          value={text}
          onChange={(e) => dispatch(setText(e.target.value))}
          placeholder="отправить сообщение"
        />
        <button onClick={createChat}>отправить</button>
      </div>
    </div>
  );
};

export default Message;
