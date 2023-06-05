import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAPI, setIdInstance, setUserNumber } from '../../store/features/LoginSlice';
import s from './LoginPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { recieveNot } from '../../api';

const LoginPage = () => {
  const { API, IdInstance, UserNumber } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navTo = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (IdInstance && API) {
      recieveNot(IdInstance, API)
        .then((response) => {
          console.log('recieve', response?.data);
          navTo('/chat');
        })
        .catch((error) => {
          alert('Вы не прошли верификацию');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      alert('Поля должны быть заполнены');
    }
  };

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
        <label htmlFor="Number">
          Your number:
          <input
            required
            id="Number"
            value={UserNumber}
            onChange={(e) => dispatch(setUserNumber(e.target.value.trim()))}
          />
        </label>
        <button onClick={handleSubmit}>{loading ? 'идет загрузка' : 'войти'}</button>
      </form>
    </div>
  );
};

export default LoginPage;
