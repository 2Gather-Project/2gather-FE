import axios from 'axios';

const baseApi = axios.create({
  baseURL: 'https://twogather-backend.onrender.com/api',
});

export function postLogIn(email) {
  return baseApi
    .post(`/login`, { email: email })
    .then(({ data }) => {
      return data;
    });

}

export function getUserById(id) {
  return baseApi.get(`/users/${id}`).then(({ data: { user } }) => {
    return user;
  });
}

export function getUsers() {
  return baseApi
    .get(`/users`)
    .then(({ data: { users } }) => {
      return users;
    })
    .catch((err) => console.log(err));
}

export function getEvents() {
  return baseApi.get(`/events`).then(({ data: { events } }) => {
    return events;
  });
}

export function getActiveEvents() {
  return baseApi.get(`/events?column_name=status&value=active`).then(({ data: { events } }) => {
    return events;
  });
}

export function createUser({ first_name, last_name, email, address }) {
  return baseApi
    .post(`/users`, { first_name, last_name, email, address })
    .then(({ data: { user } }) => {
      console.log(user);
      return user;
    });
}
