import axios from 'axios';

const baseApi = axios.create({
  baseURL: 'https://twogather-backend.onrender.com/api',
});

export function getEvents({columnNam, value}) {
  return baseApi.get(`/events`, {
    params: {
    column_name : columnNam,
    value: value
  }}).
  then(({ data: { events } }) => {
    console.log({events})
    return events;
  });
}

export function getEventById(event_id) {
    return baseApi.get(`/events/${event_id}`).
    then(({ data: { events } }) => {
      console.log({events})
      return events;
    });
  }

  