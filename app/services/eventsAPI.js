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
    console.log('events is id', event);
    return event;
  });
}


export function postEventAttendance(attendanceRequest) {
  return baseApi
    .post('/event-user-activity', attendanceRequest)
    .then(({ data: { event_user_activity } }) => {
      return event_user_activity;
    });
}

  export function getEventAttendance(event_id) {
    return baseApi
      .get(`/event-user-activity/${event_id}`)
      .then(({ data: { event_user_activity  } }) => {
        // console.log({ event_user_activity  });
        return event_user_activity ;
      });
  }

  export function patchEventAttendance(attendanceData) {
    const { event_id, attendee_id } = attendanceData;
    return baseApi
        .patch(`/event-user-activity/${event_id}/${attendee_id}`, attendanceData)
        .then(({data: {event_user_activity}}) => { 
          return event_user_activity
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

export function postEventUserActivity(activity) {
  return baseApi
    .post(`/event-user-activity`, activity)
    .then(({ data: { event_user_activity } }) => {
      console.log('event_user_activity is', event_user_activity);
      return event_user_activity;
    });
}