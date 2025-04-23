import axios from 'axios';

const baseApi = axios.create({
  baseURL: 'http://127.0.0.1:3000/api',
});

export function getEvents({ columnNam, value, not_equal }) {
  return baseApi
    .get(`/events`, {
      params: {
        column_name: columnNam,
        value: value,
        not_equal: not_equal,
      },
    })
    .then(({ data: { events } }) => {
      console.log({ events });
      return events;
    });
}

export function getEventById(event_id) {
  return baseApi.get(`/events/${event_id}`).then(({ data: { event } }) => {
    console.log('events is', event);
    return event;
  });
}

export function postNewEvent(addEvent) {
  return baseApi.post(`/events`, addEvent).then(({ data: { event } }) => {
    console.log('events is', event);
    return event;
  });
}

export function patchEventImage(addEvent) {
  return baseApi.patch(`/events`, addEvent).then(({ data: { event } }) => {
    console.log('events is', event);
    return event;
  });
}

export function getTags() {
  return baseApi.get(`/interests`).then(({ data: { interests } }) => {
    console.log('interests is', interests);
    return interests;
  });
}
