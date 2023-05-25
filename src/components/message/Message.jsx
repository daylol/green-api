import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessagesTo, setText } from '../../store/features/CreateChatSlice';
import { sendMessage } from '../../api';
import s from './Message.module.scss';
import Chat from '../chat/Chat';

const Message = ({ chat }) => {
  const dispatch = useDispatch();
  const { API, IdInstance } = useSelector((state) => state.user);
  const { text, number } = useSelector((state) => state.create);
  const id = chat.sender.chatId;
  console.log(id);
  console.log(chat);
  const createChat = (e) => {
    e.preventDefault();
    sendMessage(IdInstance, API, id, text);
    dispatch(setMessagesTo({ text, id: chat.idMessage }));
    dispatch(setText(''));
  };

  return (
    <div className={s.main}>
      {chat.sender.chatName ? (
        <h2>{chat.sender.chatName}</h2>
      ) : (
        <h2>{chat.sender.chatId.slice(0, 12)}</h2>
      )}
      <Chat />
      <div className={s.send}>
        <input
          type="text"
          value={text}
          onChange={(e) => dispatch(setText(e.target.value))}
          placeholder="отправить сообщение"
        />
        <button onClick={createChat}>send</button>
      </div>
    </div>
  );
};

export default Message;
