import axios from 'axios';

const baseApi = axios.create({
  baseURL: 'https://twogather-backend.onrender.com/api',
});

export function getEvents(event_id) {
  return baseApi.get(`/events/${event_id}`).then(({ data: { events } }) => {
    return events;
  });
}