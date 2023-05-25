import React from 'react';
import s from './Chat.module.scss';
import { useSelector } from 'react-redux';
const Chat = () => {
  const { messagesTo, messagesFrom } = useSelector((state) => state.create);

  return (
    <div className={s.chat}>
      {messagesTo &&
        messagesTo.map((m) => (
          <div key={m.id} className={`${s.send}`}>
            <div className={`${s.message}`}>
              <p>{m.text}</p>
            </div>
          </div>
        ))}
      {messagesFrom &&
        messagesFrom.map((m, i) => (
          <div key={i} className={`${s.receive}`}>
            <div className={`${s.message}`}>
              <p>{m.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chat;
