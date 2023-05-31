import React, { useState } from 'react';
import s from './SideMenu.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setNumber, setNotifications, setMessages } from './../../store/features/CreateChatSlice';
import { deleteNot, recieveNot } from '../../api';
import { v4 } from 'uuid';

const SideMenu = ({ setChat }) => {
  const { IdInstance, API } = useSelector((state) => state.user);
  const { notifications, number, messages } = useSelector((state) => state.create);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const update = () => {
    recieveNot(IdInstance, API)
      .then((response) => {
        if (
          !!response.data.body.senderData &&
          !!response.data.body.messageData &&
          !!response.data.body.idMessage
        ) {
          const userWrote = {
            sender: response.data.body.senderData,
            message: response.data.body.messageData,
            idMessage: response.data.body.idMessage,
          };
          if (notifications.some((n) => n.sender.chatId === response.data.body.senderData.chatId)) {
            dispatch(setNotifications([...notifications]));
          } else {
            dispatch(setNotifications([userWrote, ...notifications]));
          }
          console.log('userWrote', userWrote);
          const mes = {
            text: userWrote.message.textMessageData.textMessage,
            userId: userWrote.sender.chatId,
            id: v4(),
          };
          dispatch(setMessages([mes, ...messages]));
          deleteNot(IdInstance, API, response.data.receiptId)
            .then((response) => {
              console.log('delete', response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 30000);
      });
  };

  const createChat = (id) => {
    const user = notifications.find((n) => n.sender.chatId === id);
    setChat(user);
  };

  const create = () => {
    if (number) {
      setChat({
        sender: {
          chatId: `${number}@c.us`,
        },
      });
      dispatch(
        setNotifications([
          {
            sender: {
              chatId: `${number}@c.us`,
            },
          },
          ...notifications,
        ]),
      );
    }
    dispatch(setNumber(''));
  };

  return (
    <div className={s.menu}>
      <div className={s.create}>
        <input
          type="text"
          placeholder="Cоздать чат"
          value={number}
          onChange={(e) => dispatch(setNumber(e.target.value))}
        />
        <button onClick={create}>Сoздать чат</button>
        <button onClick={update}>Получить уведомление</button>
      </div>
      <h2>Чаты</h2>

      <div className={s.users}>
        {show && <p>Нет новых уведомлений</p>}
        {notifications.map((n) => (
          <div
            key={n.sender.chatId}
            onClick={() => createChat(n.sender.chatId)}
            className={s.userList}>
            <h2>{n.sender.chatName || n.sender.chatId.slice(0, 12)}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
