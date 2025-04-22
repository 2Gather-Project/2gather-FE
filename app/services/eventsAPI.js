import axios from 'axios';

const baseApi = axios.create({
  baseURL: 'https://twogather-backend.onrender.com/api',
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
  return baseApi.post(`/events`, JSON.stringify(addEvent)).then(({ data: { event } }) => {
    console.log('events is', event);
    return event;
  });
}

export function postNewEventHardCoded() {
  return baseApi
    .post(`/events`, {
      user_id: 4,
      title: 'Street Food Lunch',
      description: 'Grab a bite and discover new flavors together at the city’s food market.',
      location: 'Manchester',
      category: 'OTHER',
      status: 'ACTIVE',
      event_date: '2025-04-16T15:54:56.946Z',
    })
    .then(({ data: { event } }) => {
      console.log('events is', event);
      return event;
    });
}
