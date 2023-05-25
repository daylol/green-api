import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAPI, setIdInstance } from '../store/features/LoginSlice';
import s from './LoginPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { recieveNot } from '../api';

const LoginPage = () => {
  const { API, IdInstance } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navTo = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (IdInstance && API) {
      recieveNot(IdInstance, API)
        .then((response) => {
          console.log('recieve', response?.data);
          navTo('/main');
        })
        .catch((error) => {
          alert('Вы не прошли верификацию');
        });
    } else {
      alert('Поля должны быть заполнены');
    }
  };

  // 1101821501 446e7c2bc4684c758c210cd2c3641a53c4d4c0e11e27481e94

  return (
    <div className={s.wrapper}>
      <form>
        <h1>Введите данные</h1>
        <label htmlFor="ID">
          id:
          <input
            required
            id="ID"
            value={IdInstance}
            onChange={(e) => dispatch(setIdInstance(e.target.value.trim()))}
          />
        </label>
        <label htmlFor="API">
          api:
          <input
            required
            id="API"
            value={API}
            onChange={(e) => dispatch(setAPI(e.target.value.trim()))}
          />
        </label>
        <button onClick={handleSubmit}>Войти</button>
      </form>
    </div>
  );
};

export default LoginPage;
