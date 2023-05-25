import React, { useState } from 'react';
import s from './Menu.module.scss';
import { deleteNot, recieveNot } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { setMessagesFrom, setNumber } from '../../store/features/CreateChatSlice';

const Menu = ({ not, setNot, checkMes, messages, setMessages, setChat }) => {
  const { API, IdInstance } = useSelector((state) => state.user);
  const { number } = useSelector((state) => state.create);
  const [id, setId] = useState();
  const dispatch = useDispatch();

  const updateNotification = (e) => {
    e.preventDefault();
    recieveNot(IdInstance, API)
      .then((response) => {
        console.log('update', response?.data);
        setId(response.data.receiptId);
        if (
          !!response.data.body.senderData &&
          !!response.data.body.messageData &&
          !!response.data.body.idMessage
        ) {
          const userNot = {
            sender: response.data.body.senderData,
            message: response.data.body.messageData,
            idMessage: response.data.body.idMessage,
          };
          if (!not.some((n) => n.sender.chatId !== response.data.body.senderData.chatId)) {
            setNot([userNot]);
          } else {
            setNot([...not, userNot]);
          }
          if (userNot.sender.chatId === response.data.body.senderData.chatId) {
            const mes = {
              text: userNot.message.textMessageData.textMessage,
              id: userNot.idMessage,
            };
            console.log(mes);
            setMessages([...messages, mes]);
            dispatch(setMessagesFrom(mes));
          }
        } else {
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
        console.log('что-то пошло не так!!!!!!!', error);
      });
  };

  const delNot = (id, idMessage) => {
    checkMes(idMessage);
    deleteNot(IdInstance, API, id)
      .then((response) => {
        console.log('delete', response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const create = (e) => {
    e.preventDefault();
    if (number) {
      setChat({
        sender: {
          chatId: `${number}@c.us`,
        },
      });
    }
    dispatch(setNumber(''));
  };

  return (
    <aside className={s.aside}>
      <input
        value={number}
        onChange={(e) => dispatch(setNumber(e.target.value))}
        type="text"
        placeholder="Создать чать"
      />
      <button onClick={create}>Создать</button>
      <hr />
      <button onClick={updateNotification}>Обновить</button>
      <hr />
      <h2>Уведомления</h2>
      {not &&
        not.map((n) => (
          <p onClick={() => delNot(id, n.idMessage)} key={n.idMessage}>
            {n.sender.chatName}
          </p>
        ))}
    </aside>
  );
};

export default Menu;
