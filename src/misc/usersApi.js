import axios from 'axios';

export const usersApi = {
  getListUsers,
  getCurrentUser,
};

function getListUsers(limitUsers) {
  return instance.get(`/v1/sample-data/users?limit=${limitUsers}`, {
    headers: {
      'Content-type': 'application/json',
    },
  });
}

function getCurrentUser(currentId) {
  return instance.get(`/v1/sample-data/users/${currentId}`, {
    headers: {
      'Content-type': 'application/json',
    },
  });
}

const instance = axios.create({
  baseURL: 'https://api.slingacademy.com/',
});
