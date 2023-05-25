import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://api.green-api.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendMessage = (IdInstance, API, id, message) => {
  return instance.post(`waInstance${IdInstance}/sendMessage/${API}`, { chatId: id, message });
};

export const recieveNot = (IdInstance, API) => {
  return instance.get(`waInstance${IdInstance}/ReceiveNotification/${API}`);
};

export const deleteNot = (IdInstance, API, id) => {
  return instance.delete(`waInstance${IdInstance}/deleteNotification/${API}/${id}`);
};
