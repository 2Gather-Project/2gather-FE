import axios from 'axios';

const baseApi = axios.create({
  baseURL: 'http://127.0.0.1:3000/api',
});

export function getEvents(event_id) {
  return baseApi.get(`/events/${event_id}`).then(({ data: { events } }) => {
    return events;
  });
}
