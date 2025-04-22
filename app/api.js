import axios from 'axios';

const baseApi = axios.create({
  baseURL: 'https://twogather-backend.onrender.com/api',
  // baseURL: 'http://localhost:3000/api'
});

export function postLogIn(email) {
  return baseApi.post(`/login`, { email: email }).then(({ data }) => {
    return data;
  });
}

export function patchUser(user) {
  return baseApi
    .patch(`/users/${user.user_id}`, user)
    .then(({ data: { user } }) => {
      return user;
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

export function getEventById(id) {
  return baseApi.get(`/events/${id}`).then(({ data: { event } }) => {
    console.log('event', event);
    return event;
  });
}

export function getActiveEvents() {
  return baseApi.get(`/events?column_name=status&value=active`).then(({ data: { events } }) => {
    return events;
  });
}

export function createUser({ first_name, last_name, email, address, date_of_birth }) {
  return baseApi
    .post(`/users`, { first_name, last_name, email, address, date_of_birth })
    .then(({ data: { user } }) => {
      console.log('new user created');
      return user;
    });
}

export function getEventUserActivity(eventId) {
  return baseApi.get(`/event-user-activity/${eventId}`).then(({ data: { event_user_activity } }) => {
    console.log('event user activity', event_user_activity);
    return event_user_activity;
  });
}