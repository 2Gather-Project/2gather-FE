import { useEffect, useState } from 'react';
import EventCard from './EventCard';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { updateEventStatus } from '../services/eventsAPI';


export default function EventsList({ events, filterValueLocation }) {

  const eventsFilter = events.filter((event) => {
    if (!filterValueLocation && event.status !== 'INACTIVE') {
      return event;
    } else if (event.location === filterValueLocation) {
      return event;
    }
  });

  return (
    <>
      <View style={styles.container}>
        <FlatList
          style={{ width: '100%' }}
         
          keyExtractor={(item) => item.event_id.toString()}
          data={eventsFilter}
          renderItem={({ item }) => (
            <EventCard
              title={item.title}
              location={item.location}
              date={item.event_date}
              time={item.time}
              id={item.user_id}
              key={item.event_id}
              event_id={item.event_id}
              image_url={item.image_url}
              description={item.description}
            />
          )}
  
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 22,
    width: '100%',
  },
  item: {
    flex: 1,
    padding: 10,
    fontSize: 18,
  },
});
